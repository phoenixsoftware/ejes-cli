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
    private running = false;
    private skipCount = 0;

    public async process(params: IHandlerParameters): Promise<void> {

        const ejesVersion = "EJES Log Stream V0.3.2, a Zowe component of (E)JES";
        const errorOnTerm150 = 150;
        const errorOnExec151 = 151;
        const errorOnInit152 = 152;
        const errorRestApiFailure153 = 153; // Return code > 4.
        const last = { blockId: undefined, recordId: undefined, numberOfLines: undefined };
        const maxAcceptableReturnCode = 4;
        let cmdPrimary : string;
        let ip : object;
        let loopCount = 0;
        let operlog : boolean;
        let signal = false;

        this.params = params;
        this.session = EjesSession.EjesSessionFactory(this.params);
        this.session.log("[" + ejesVersion + "]  Use the --help option to display command usage documentation.\n");

        if ( this.session.subsystem )
            ip = { userAgent: ejesVersion, subsystem: this.session.subsystem, columns: this.session.columns, rows: this.session.rows };
        else
            ip = { userAgent: ejesVersion, columns: this.session.columns, rows: this.session.rows };

        if ( params.arguments.logsys )
            cmdPrimary = "logsys " + params.arguments.logsys + "; log";
        else
            cmdPrimary = "log";
        if ( params.arguments.syslog )
            cmdPrimary += " SYSLOG";
        else if ( params.arguments.operlog )
            cmdPrimary += " OPERLOG";

        if ( params.arguments.find !== undefined )
            this.session.log("The --find, --first, --last, and --all options are depricated.\nOnly  syntax parsing is supported in this release.\nIt will be removed completely in the next GA replease.\n");

        process.on("SIGPIPE", ()  => { params.response.console.log("Broken Pipe"); logoff(); });
        process.on("SIGHUP", ()   => { params.response.console.log("Hangup"); logoff(); });
        process.on("SIGINT", ()   => { params.response.console.log(""); params.response.console.log("Interrupt"); logoff(); });
        process.on("exit", (code) => { logoff(); params.response.console.log("Done.    Exit Code: " + code); });

        const logoff = async (): Promise<void> => {
            if ( signal ) return;
            signal = true;
            try {
                this.debugMsg(this.session.DEBUG_HOUSEKEEPING, "logoff", "Sending request.  RESTAPI may not respond before exiting.");
                const resp = await Ejes.term(this.session, this.params.arguments.debug);
                this.debugResponse(this.session.DEBUG_HOUSEKEEPING, "logoff", resp);
            }
            catch (e) {
                this.session.log(util.inspect(e, this.inspectOptions()));
                params.response.data.setExitCode(errorOnTerm150);
                process.exitCode = errorOnTerm150;
            }
        };

        const fetchData = async (): Promise<void> => {
            let begin = true;
            let cmd : string;
            let numberOfLinesOutput = 0;
            let response: IEjes;

            this.running = true;
            if ( signal ) return;  // Don't bother.

            do {
                try {
                    if ( ip ) {
                        response = await Ejes.init(this.session, ip, { enumValue: this.session.initialEnumeration, command: cmd = cmdPrimary }, this.params.arguments.debug );
                        ip = undefined;
                        this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "init", response);
                        if ( response.function.functionName === "OPERLOG" || response.function.functionName === "SYSLOG" ) // RE: EJES475
                            this.session.log("Displaying the " + response.function.functionName + " with a record length of " + response.function.browseInfo.recordLength);
                        operlog = response.function.functionName === "OPERLOG";
                        if ( params.arguments.rfj )
                            params.response.data.setObj(params.arguments.detailedjson ? response : response.lines);
                    }
                    else {
                        if ( begin )
                            if ( operlog )
                                cmd = "LOCATE BLK=" + last.blockId + ";DOWN " + (last.recordId);
                            else
                                cmd = "LOCATE " + (last.numberOfLines + 1);
                        response = await Ejes.exec(this.session, { enumValue: params.arguments.enumValue, command: cmd }, this.params.arguments.debug);
                        this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "exec", response);
                    }
                }
                catch (e) {
                    if ( ! signal ) {
                        if ( params.arguments.rfj )
                            params.response.data.setObj(e, true);
                        else
                            this.session.error(util.inspect(e, this.inspectOptions()));
                        signal = true; // Terminate will likely generate the same error, so skip further requests.
                    }
                    params.response.data.setExitCode(ip ? errorOnInit152 : errorOnExec151);
                    process.exit(ip ? errorOnInit152 : errorOnExec151); // The on.exit will send a logoff.
                }
                this.debugMsg(this.session.DEBUG_FETCH_METADATA, "fetchData",
                "Reason: " + response.reasonCode + ", RC: " + response.returnCode + ", Iterations(enumeration): " + loopCount + "(" + numberOfLinesOutput + "), Lines received: " + response.loginfo.length + ", Begin? " + (begin ? "True" : "False") + ", Msg: " + (response.message.longMessages.length > 0 ? response.message.longMessages : response.message.shortMessage ? response.message.shortMessage : "\"\""));
                if ( response.returnCode >= maxAcceptableReturnCode ) // 4 is No Data, > 4 is Error
                    break;
                begin = false;
                cmd = "";
                response.lines.forEach((line, index) => {
                    let prefix = "";
                    numberOfLinesOutput++;
                    if ( ! params.arguments.rfj ) { // In --rfj count but suppress stdout.
                        if ( this.params.arguments.debug & this.session.DEBUG_RECORD_INFO ) {
                            prefix = "[" + response.loginfo[index].blockId;
                            prefix += " " + response.loginfo[index].recordId.toString().padStart(3, "0");
                            if ( response.position.currentLineNumber !== 0 ) {
                                prefix += " " + (response.position.currentLineNumber + numberOfLinesOutput).toString().padStart(4, " ");
                                const timeStampToTimeDateString = (timestamp: number) : string => {
                                    const d = new Date(timestamp);
                                    return (d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0") + ":" + d.getSeconds().toString().padStart(2, "0") + ":"  + d.getMilliseconds().toString().padStart(2, "0")).slice(0, 11) + "-" + d.getFullYear() + "/" + (d.getMonth() + 1).toString().padStart(2, "0") + "/" + d.getDate().toString().padStart(2, "0");
                                };
                                prefix += " " + timeStampToTimeDateString(response.loginfo[index].timeStamp);
                            }
                            prefix += "] ";
                        }
                        this.session.log(prefix + line);
                    }
                });
                last.blockId = response.loginfo[response.loginfo.length - 1].blockId;
                last.recordId = response.loginfo[response.loginfo.length - 1].recordId;
                last.numberOfLines = response.position.numberOfLines;
                if ( response.reasonCode === 1 ) // No pending data.
                    break;
                loopCount++;
            } while (response.lines.length > 0 );
            if ( response.returnCode > maxAcceptableReturnCode ) {
                if ( ! signal )
                    signal = true; // Terminate will likely generate the same error, so skip further requests.
                this.session.error(
                    "\nError from RESTAPI: " + (response.message.longMessages.length > 0 ? response.message.longMessages : response.message.shortMessage) + "." +
                    "\nReturn Code:        " + response.returnCode +
                    "\nReason Code:        " + response.reasonCode +
                    "\nLines Received:     " + response.loginfo.length +
                    "\nIteration:          " + loopCount +
                    "\nEnumeration:        " + numberOfLinesOutput);
                params.response.data.setExitCode(errorRestApiFailure153);
                process.exit(errorRestApiFailure153); // The on.exit will send a logoff.
            }
            this.running = false;
            if ( ! params.arguments.nonstop || params.arguments.rfj )
                await logoff();
        };

        const wait = (ms) => new Promise((res) => setTimeout(res, ms));
        const startAsync = async () => {
            while (! signal ) {
                await fetchData();
                if ( signal ) break;
                await wait(params.arguments.timerInterval);
            }
        };
        await startAsync();
    }

    private inspectOptions(depthValue: number = 10, maxArrayLengthValue: number = 256) : any {
        return { depth: depthValue, colors: true, maxArrayLength: maxArrayLengthValue, breakLength: 256, showHidden: true};
    }

    private debugMsg(level: number, tag: string, msg: string) {
        if ( this.params.arguments.debug & level )
            this.session.log(`*** DEBUG *** ${tag}: ${msg}`);
    }

    private debugResponse(level: number, tag: string, resp: IEjes): void {
        this.debugMsg(level, tag, "response: " + util.inspect(resp, this.inspectOptions(this.params.arguments.debug & this.session.DEBUG_RESPONSE_MAX ? 10 : 0, this.params.arguments.enumValue)));
    }
}
