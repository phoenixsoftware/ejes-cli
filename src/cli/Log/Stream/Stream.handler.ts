/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
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

    public async process(params: IHandlerParameters): Promise<void> {

        this.params = params;
        this.session = EjesSession.EjesSessionFactory(this.params);

        const errorOnTerm150 = 150;
        const errorOnExec151 = 151;
        const errorOnInit152 = 152;
        const maxAcceptableReturnCode = 4;
        const stringNotFoundReturnCode = 8;
        let acceptLine = (resp: IEjes, index: number) => true;
        let cmdPrimary = "log";
        let cmdAlternate = "";
        let response: IEjes;
        let signal = false;
        let terminated = false;
        let timer: any;

        if (params.arguments.find !== undefined) {
            acceptLine = (resp: IEjes, index: number): boolean => {
                return resp.find[index].length > 0;
            };

            cmdPrimary += ";find \"" + params.arguments.find + "\"";
            if (params.arguments.first) {
                cmdPrimary += " first";
            }
            else if (params.arguments.last) {
                cmdPrimary += " last";
            }
            else if (params.arguments.all) {
                cmdPrimary += " all";
            }

            cmdAlternate = "find \"" + params.arguments.find + "\" next";
        }

        process.on("SIGPIPE", () => { params.response.console.log("Broken Pipe"); logoff(); });
        process.on("SIGHUP", () => { params.response.console.log("Hangup"); logoff(); });
        process.on("SIGINT", () => { params.response.console.log(""); params.response.console.log("Interrupt"); logoff(); });
        process.on("exit", (code) => {
            if ( ! signal ) {
                logoff();
            }
            params.response.console.log("Done");
        });

        const logoff = async (): Promise<void> => {
            clearInterval(timer);
            signal = true;
            try {
                this.debugMsg("logoff", "Sending request.  RESTAPI may not respond before exiting.");
                const resp = await Ejes.term(this.session);
                terminated = true;
                this.debugResponse("logoff", resp);
            }
            catch (e) {
                this.session.log(util.inspect(e, true, this.maxDepth, true));
                params.response.data.setExitCode(errorOnTerm150);
                process.exitCode = errorOnTerm150;
            }
        };

        const fetchData = async (): Promise<void> => {
            while ( response.returnCode <= maxAcceptableReturnCode ) {
                if ( signal ) {
                    return; // Don't send new request if we tried to logoff.
                }
                if (response.returnCode === maxAcceptableReturnCode && response.reasonCode === 0 ) { return; }
                this.session.showlog(response, acceptLine);
                if (response.returnCode === 0 && response.reasonCode === 1 ) { return; }
                try {
                    response = await Ejes.exec(
                            this.session,
                            { enumValue: `${params.arguments.enumValue}`, command: "LOCATE BLK=" + this.session.block });
                }
                catch (e) {
                    if ( ! signal ) {
                        this.session.log(util.inspect(e, true, this.maxDepth, true));
                        signal = true; // Terminate will likely generate the same error, so skip further requests.
                    }
                    params.response.data.setExitCode(errorOnExec151);
                    return process.exit(errorOnExec151); // The on.exit will send a logoff.
                }
                params.response.data.setObj(response);
            }
        };

        try {
            response = await Ejes.init(this.session, { columns: this.session.columns, rows: this.session.rows },
                { enumValue: this.session.dataLines, command: cmdPrimary });
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
        this.debugResponse("init", response);

        if (params.arguments.nonstop && ! params.arguments.rfj ) {
            timer = setInterval( () => { fetchData(); response.returnCode = response.reasonCode = 0; },
                    params.arguments.timerInterval );
        }
        else {
            fetchData();
        }
    }

    private debugMsg(tag: string, msg: string) {
        if (this.params.arguments.debug) {
            this.session.log(`*** DEBUG ${tag} ***  ${msg}`);
        }
    }

    private debugResponse(tag: string, resp: IEjes): void {
        this.debugMsg(tag, "response: " + util.inspect(resp, true, this.maxDepth, true));
    }
}
