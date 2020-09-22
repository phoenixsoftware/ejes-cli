"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ejes_1 = require("../../../api/Ejes");
const EjesSession_1 = require("../../EjesSession");
const util = require("util");
class ListHandler {
    constructor() {
        this.maxDepth = 10;
    }
    process(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.params = params;
            this.session = EjesSession_1.EjesSession.EjesSessionFactory(this.params);
            const errorOnTerm150 = 150;
            const errorOnExec151 = 151;
            const errorOnInit152 = 152;
            const maxAcceptableReturnCode = 4;
            const stringNotFoundReturnCode = 8;
            let acceptLine = (resp, index) => true;
            let cmdPrimary = "log";
            let cmdAlternate = "";
            let response;
            let signal = false;
            let terminated = false;
            let timer;
            if (params.arguments.find !== undefined) {
                acceptLine = (resp, index) => {
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
                if (!signal) {
                    logoff();
                }
                params.response.console.log("Done");
            });
            const logoff = () => __awaiter(this, void 0, void 0, function* () {
                clearInterval(timer);
                signal = true;
                try {
                    this.debugMsg("logoff", "Sending request.  RESTAPI may not respond before exiting.");
                    const resp = yield Ejes_1.Ejes.term(this.session);
                    terminated = true;
                    this.debugResponse("logoff", resp);
                }
                catch (e) {
                    this.session.log(util.inspect(e, true, this.maxDepth, true));
                    params.response.data.setExitCode(errorOnTerm150);
                    process.exitCode = errorOnTerm150;
                }
            });
            const fetchData = () => __awaiter(this, void 0, void 0, function* () {
                while (response.returnCode <= maxAcceptableReturnCode) {
                    if (signal) {
                        return; // Don't send new request if we tried to logoff.
                    }
                    if (response.returnCode === maxAcceptableReturnCode && response.reasonCode === 0) {
                        return;
                    }
                    this.session.showlog(response, acceptLine);
                    if (response.returnCode === 0 && response.reasonCode === 1) {
                        return;
                    }
                    try {
                        response = yield Ejes_1.Ejes.exec(this.session, { enumValue: `${params.arguments.enumValue}`, command: "LOCATE BLK=" + this.session.block });
                    }
                    catch (e) {
                        if (!signal) {
                            this.session.log(util.inspect(e, true, this.maxDepth, true));
                            signal = true; // Terminate will likely generate the same error, so skip further requests.
                        }
                        params.response.data.setExitCode(errorOnExec151);
                        return process.exit(errorOnExec151); // The on.exit will send a logoff.
                    }
                    params.response.data.setObj(response);
                }
            });
            try {
                response = yield Ejes_1.Ejes.init(this.session, { columns: this.session.columns, rows: this.session.rows }, { enumValue: this.session.dataLines, command: cmdPrimary });
            }
            catch (e) {
                if (!signal) {
                    this.session.log(util.inspect(e, true, this.maxDepth, true));
                    signal = true; // Terminate will likely generate the same error, so skip further requests.
                }
                params.response.data.setExitCode(errorOnInit152);
                return process.exit(errorOnInit152); // The on.exit will send a logoff.
            }
            params.response.data.setObj(response);
            this.debugResponse("init", response);
            if (params.arguments.nonstop && !params.arguments.rfj) {
                timer = setInterval(() => { fetchData(); response.returnCode = response.reasonCode = 0; }, params.arguments.timerInterval);
            }
            else {
                fetchData();
            }
        });
    }
    debugMsg(tag, msg) {
        if (this.params.arguments.debug) {
            this.session.log(`*** DEBUG ${tag} ***  ${msg}`);
        }
    }
    debugResponse(tag, resp) {
        this.debugMsg(tag, "response: " + util.inspect(resp, true, this.maxDepth, true));
    }
}
exports.default = ListHandler;
//# sourceMappingURL=Stream.handler.js.map