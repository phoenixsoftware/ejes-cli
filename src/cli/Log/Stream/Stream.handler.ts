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

//  node --inspect-brk C:\Users\vssemc\AppData\Roaming\npm\node_modules\@brightside\core\lib\main.js

import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { IEjes } from "../../../api/doc/IEjes";
import { Ejes } from "../../../api/Ejes";
import { EjesSession } from "../../EjesSession";

export default class ListHandler implements ICommandHandler {

    public async process(params: IHandlerParameters): Promise<void> {

        let findInProgress = false;
        let acceptLine = (resp: IEjes, index: number) => true;
        let cmdPrimary = "log";
        let cmdAlternate = "";
        let findCount = 0;

        if (params.arguments.find !== undefined) {
            findInProgress = true;
            acceptLine = (resp: IEjes, index: number): boolean => {
                if ( resp.find[index].length > 0 ) {
                    findCount += 1;
                    return true;
                }
                else { return false; }
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
                    + `lines: ${resp.lines.length}, findCount: ${findCount}, `
                    + `message: "${response.message.shortMessage}"`);
            }
        };

        const logoff = async (): Promise<void> => {
            const resp = await Ejes.term(session);
            params.response.data.setObj(resp);
            process.exit(-1);
        };

        let response = await Ejes.init(session, { columns: session.columns, rows: session.rows },
                { enumValue: session.dataLines, command: cmdPrimary });
        params.response.data.setObj(response);
        debugResponse("2000", response);

        const fetchDataWithFind = async (): Promise<void> => {

            debugResponse("2000", response);

            while ( response.returnCode <= maxAcceptableReturnCode ) {

                if (response.returnCode === stringNotFoundReturnCode
                        && response.reasonCode === 0
                        && response.message.shortMessage === "*Bottom of data reached*") { return; }

                if (response.returnCode === maxAcceptableReturnCode && response.reasonCode === 0 ) { return; }

                findCount = 0;
                debugResponse("2200", response);
                session.showlog(response, acceptLine);
                debugResponse("2300", response);

                if (response.returnCode === 0 && response.reasonCode === 1 ) { return; }

                if (findCount === 0) {
                    response = await Ejes.exec(session, { enumValue: `${params.arguments.enumValue}`, command: cmdAlternate });
                    params.response.data.setObj(response);
                    debugResponse("2500", response);
                    session.block = "";
                    session.record = 0;
                    session.showlog(response, acceptLine);
                }

                debugResponse("3000", response);
                response = await Ejes.exec(session, { enumValue: `${params.arguments.enumValue}`, command: "LOCATE BLK=" + session.block });
                params.response.data.setObj(response);
                debugResponse("4000", response);
            }
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

        if (params.arguments.find) {
            if (params.arguments.nonstop) {
                const xyzzy = async (): Promise<void> => {
                    debugResponse("6000", response);
                    await fetchDataWithFind();
                    debugResponse("8000", response);
                    setTimeout(xyzzy, params.arguments.timerInterval );
                };
                xyzzy();
            }
            else {
                fetchDataWithFind();
            }
        }
        else {
            if (params.arguments.nonstop) {
                const timer = setInterval( () => { fetchData(); response.returnCode = response.reasonCode = 0; },
                        params.arguments.timerInterval );
            }
            else {
                fetchData();
            }
        }
    }
}
