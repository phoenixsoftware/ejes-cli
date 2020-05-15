/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

//  node --inspect-brk C:\Users\vssemc\AppData\Roaming\npm\node_modules\@zowe\core\lib\main.js

import { ICommandHandler, IHandlerParameters } from "@zowe/imperative";
import { IEjes } from "../../../api/doc/IEjes";
import { Ejes } from "../../../api/Ejes";
import { EjesSession } from "../../EjesSession";

export default class ListHandler implements ICommandHandler {

    public async process(params: IHandlerParameters): Promise<void> {

        let acceptLine = (resp: IEjes, index: number) => true;
        let cmdPrimary = "log";
        let cmdAlternate = "";

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

        const maxAcceptableReturnCode = 4;
        const stringNotFoundReturnCode = 8;
        let signal = false;
        let terminated = false;

        const session = EjesSession.EjesSessionFactory(params);

        process.on("SIGPIPE", () => { params.response.console.log("Broken Pipe"); signal = true; terminated = true; logoff(); });
        process.on("SIGHUP", () => { params.response.console.log("Hangup"); logoff(); });
        process.on("SIGINT", () => { params.response.console.log(""); params.response.console.log("Interrupt"); logoff(); });
        process.on("exit", (code) => { params.response.console.log("Done"); });

        const debugResponse = (tag: string, resp: IEjes) => {
            if (params.arguments.debug) {
                session.log(`*** DEBUG ${tag} ***  returnCode: ${resp.returnCode}, `
                    + `reasonCode: ${resp.reasonCode}, block: ${session.block}, `
                    + `position: ${resp.position.logInfo.blockId}, `
                    + `lines: ${resp.lines.length},  `
                    + `message: "${response.message.shortMessage}"`);
            }
        };

        const logoff = async (): Promise<void> => {
            const resp = await Ejes.term(session);
            params.response.data.setObj(resp);
            process.exit(-1);
        };

        const fetchData = async (): Promise<void> => {
            while ( response.returnCode <= maxAcceptableReturnCode ) {
                if (response.returnCode === maxAcceptableReturnCode && response.reasonCode === 0 ) { return; }
                session.showlog(response, acceptLine);
                if (response.returnCode === 0 && response.reasonCode === 1 ) { return; }
                response = await Ejes.exec(session, { enumValue: `${params.arguments.enumValue}`, command: "LOCATE BLK=" + session.block });
                params.response.data.setObj(response);
            }
        };

        let response = await Ejes.init(session, { columns: session.columns, rows: session.rows },
                { enumValue: session.dataLines, command: cmdPrimary });
        params.response.data.setObj(response);

        if (params.arguments.nonstop) {
            const timer = setInterval( () => { fetchData(); response.returnCode = response.reasonCode = 0; },
                    params.arguments.timerInterval );
        }
        else {
            fetchData();
        }
    }
}
