/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

//  node --inspect-brk C:\Users\vssemc\AppData\Roaming\npm\node_modules\@zowe\core\lib\main.js

import { ICommandHandler, IHandlerParameters } from "@zowe/imperative";
import { IEjes } from "../../../api/Doc/IEjes";
import { Ejes } from "../../../api/Ejes";
import { EjesSession } from "../../EjesSession";
import * as util from "util";

export default class ListHandler implements ICommandHandler {

    private session: EjesSession;
    private params: IHandlerParameters;
    private maxDepth = 10;
    private running = false;
    private init = true;
    private skipCount = 0;

    public async process(params: IHandlerParameters): Promise<void> {

        this.params = params;
        this.session = EjesSession.EjesSessionFactory(this.params);
        const errorOnTerm150 = 150;
        const errorOnExec151 = 151;
        const errorOnInit152 = 152;
        const errorRestApiFailure153 = 153; // Return code > 4.
        const errorSyslogLimitedSupport = 154;
        const ejesVersion = "EJES Log Stream V0.3.1, a Zowe component of (E)JES";
        const maxAcceptableReturnCode = 4;
        const stringNotFoundReturnCode = 8;
        /* let */  const foundLineTest = (resp: IEjes, index: number) => true;
        let cmdPrimary = "log";
        let response: IEjes;
        let signal = false;
        let terminated = false;
        let timer: any;

        this.session.log("[" + ejesVersion + "]  Use the --help option to display command usage documentation.\n");

        if ( params.arguments.syslog ) { cmdPrimary += " SYSLOG"; }
        else if ( params.arguments.operlog ) { cmdPrimary += " OPERLOG"; }

        if (params.arguments.find !== undefined) {
            this.session.log("The --find, --first, --last, and --all options are depricated.\nOnly  syntax parsing is supported in this release.\nIt will be removed completely in the next GA replease.\n");
            // foundLineTest = (resp: IEjes, index: number): boolean => {
            //     return resp.find[index].length > 0;
            // };

            // cmdPrimary += ";find \"" + params.arguments.find + "\"";
            // if (params.arguments.first) {
            //     cmdPrimary += " first";
            // }
            // else if (params.arguments.last) {
            //     cmdPrimary += " last";
            // }
            // else if (params.arguments.all) {
            //     cmdPrimary += " all";
            // }
        }

        process.on("SIGPIPE", () => { params.response.console.log("Broken Pipe"); logoff(); });
        process.on("SIGHUP", () => { params.response.console.log("Hangup"); logoff(); });
        process.on("SIGINT", () => { params.response.console.log(""); params.response.console.log("Interrupt"); logoff(); });
        process.on("exit", (code) => {
            if ( ! signal ) {
                logoff();
            }
            params.response.console.log("Done - Exit Code: " + code);
        });

        const logoff = async (): Promise<void> => {
            clearInterval(timer);
            if ( signal ) return;
            signal = true;
            try {
                this.debugMsg(this.session.DEBUG_HOUSEKEEPING, "logoff", "Sending request.  RESTAPI may not respond before exiting.");
                const resp = await Ejes.term(this.session, this.params.arguments.debug);
                terminated = true;
                this.debugResponse(this.session.DEBUG_HOUSEKEEPING, "logoff", resp);
                //params.response.console.log("Done");
            }
            catch (e) {
                this.session.log(util.inspect(e, true, this.maxDepth, true));
                params.response.data.setExitCode(errorOnTerm150);
                process.exitCode = errorOnTerm150;
            }
        };

        let loopCount = 0;
        const traceData = () => {
            return "reasonCode=" + response.reasonCode + ", returnCode=" + response.returnCode + ", loopCount=" + loopCount + ", response.logInfo.length=" + response.loginfo.length + ", msg=" + util.inspect(response.message, { depth: 3, colors: true, maxArrayLength: 256, breakLength: 256, showHidden: true});
        };

        const fetchData = async (): Promise<void> => {
            if ( signal ) return;  // Don't bother.
            this.running = true;
            loopCount = 0;
            let ev = params.arguments.enumValue;
            this.debugMsg(this.session.DEBUG_FETCHING + this.session.DEBUG_OUTPUT, "listHandler.fetchData 0", "\n\n<<< ENTRY");
            if ( this.init && response.returnCode === 0 && response.lines.length > 0 ) {
                this.session.showlog(this.session.DEBUG_OUTPUT, response, foundLineTest);
                if ( response.function.functionName === "SYSLOG" ) {
                    const stars = "*".repeat(response.function.browseInfo.recordLength / 2 - 8);
                    const bodLine = stars + " Bottom of Data " + stars;
                    params.response.data.setObj(response);
                    this.session.log(bodLine);
                    this.session.log("Limited support for SYSLOG in this release precludes enumeration or nonstop behaviors.");
                    logoff();
                    process.exitCode = errorSyslogLimitedSupport;
                    return;
                }
            }
            while ( response.returnCode <= maxAcceptableReturnCode ) {
                if ( signal ) break; // Don't send new request if we tried to logoff.
                let cmd = "LOCATE BLK=" + this.session.block;
                if ( response.returnCode === 0 && response.reasonCode === 1 )
                    cmd = ""; // enumerate.
                if ( this.session.record >= ev ) { ev += 1; }
                try {
                    response = await Ejes.exec(
                        this.session, { enumValue: ev, command: cmd }, this.params.arguments.debug );
                    this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "exec", response);
                    params.response.data.setObj(response);
                }
                catch (e) {
                    if ( ! signal ) {
                        this.session.log(util.inspect(e, true, this.maxDepth, true));
                        signal = true; // Terminate will likely generate the same error, so skip further requests.
                    }
                    params.response.data.setExitCode(errorOnExec151);
                    this.debugMsg(this.session.DEBUG_FETCHING, "listHandler.fetchData 5", ">>> CATCH: errorOnExec151");
                    process.exit(errorOnExec151); // The on.exit will send a logoff.
                    break;  // Unreachable?
                }
                this.debugMsg(this.session.DEBUG_FETCHING, "listHandler.fetchData 1", traceData());
                if (response.returnCode >= maxAcceptableReturnCode) {
                    this.debugMsg(this.session.DEBUG_HOUSEKEEPING, "listHandler.fetchData 2", ">>> (rc >=4) Exiting: " + traceData());
                    break; // return;
                }
                this.session.showlog(this.session.DEBUG_OUTPUT, response, foundLineTest);
                if (response.returnCode === 0 && response.reasonCode === 1 && loopCount > 0 ) {
                    //params.arguments.debug = 251;
                    this.debugMsg(this.session.DEBUG_FETCHING, "listHandler.fetchData 4", ">>> Exiting: EOD: " + traceData());
                    break;  // return;
                }
            loopCount++;
            }
            this.debugMsg(this.session.DEBUG_FETCHING, "listHandler.fetchData 6", ">>> Exiting: " + traceData());
            if ( response.returnCode > maxAcceptableReturnCode ) {
                if ( ! signal )
                    signal = true; // Terminate will likely generate the same error, so skip further requests.
                params.response.data.setExitCode(errorOnExec151);
                this.session.log("Error from RESTAPI.  Return code greater than 4.  Program will exit. " + traceData());
                process.exit(errorRestApiFailure153); // The on.exit will send a logoff.
            }
            this.running = this.init = false;
        };

        try {
            let ip : object;
            if ( this.session.subsystem )
                ip = { userAgent: ejesVersion, subsystem: this.session.subsystem, columns: this.session.columns, rows: this.session.rows };
            else
                ip = { userAgent: ejesVersion, columns: this.session.columns, rows: this.session.rows };
            response = await Ejes.init(this.session, ip, { enumValue: this.session.dataLines, command: cmdPrimary }, this.params.arguments.debug );
            this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "init", response);
            this.session.log("Displaying the " + response.function.functionName + " with a record length of " + response.function.browseInfo.recordLength);
        }
        catch (e) {
            if ( ! signal ) {
                this.session.log(util.inspect(e, true, this.maxDepth, true));
                signal = true; // Terminate will likely generate the same error, so skip further requests.
            }
            params.response.data.setExitCode(errorOnInit152);
            return process.exit(errorOnInit152);  // The on.exit will send a logoff.
        }
        params.response.data.setObj(response);

        if (params.arguments.nonstop && ! params.arguments.rfj ) {
            timer = setInterval( () => {
                if ( this.running )
                    this.debugMsg(this.session.DEBUG_TIMER, "timer handler", "+++ timer handler running; skip: " + this.skipCount++);
                else {
                    this.debugMsg(this.session.DEBUG_TIMER, "timer handler", "+++ timer handler begin.");
                    this.skipCount = 0;
                    fetchData();
                    response.returnCode = response.reasonCode = 0;
                    this.debugMsg(this.session.DEBUG_TIMER, "timer handler", "+++ timer handler end.");
                }
            }, params.arguments.timerInterval );
        }
        else {
            fetchData();
            logoff();
        }
    }

    private debugMsg(level: number, tag: string, msg: string) {
        if (this.params.arguments.debug & level)
            this.session.log(`*** DEBUG *** ${tag}: ${msg}`);
    }

    private debugResponse(level: number, tag: string, resp: IEjes): void {
        this.debugMsg(level, tag, "response: " + util.inspect(resp, { depth: (this.params.arguments.debug & this.session.DEBUG_RESPONSE_MAX) ? this.maxDepth : 0, colors: true, maxArrayLength: this.params.arguments.enumValue, breakLength: 256, showHidden: true}));
    }
}
