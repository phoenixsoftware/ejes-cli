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
//import { runEjesQuery } from "./ejes_query";
const ejes_api_1 = require("../../api/ejes_api");
class GenericDisplayer {
    process(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = params.profiles.get("ejes");
            //        params.response.console.log("          params.arguments.protocol: " + params.arguments.protocol);
            //        params.response.console.log("              params.arguments.host: " + params.arguments.host);
            //        params.response.console.log("              params.arguments.port: " + params.arguments.port);
            //        params.response.console.log("            params.arguments.userid: " + params.arguments.userid);
            //        params.response.console.log("          params.arguments.password: " + params.arguments.password);
            //        params.response.console.log("params.arguments.rejectUnauthorized: " + params.arguments.rejectUnauthorized);
            //        params.response.console.log("         params.arguments.base-path: " + params.arguments.basePath);
            //        params.response.console.log("        params.arguments.enum-value: " + params.arguments.enumValue);
            //        params.response.console.log("    params.arguments.timer-interval: " + params.arguments.timerInterval);
            //        params.response.console.log("             params.arguments.debug: " + params.arguments.debug);
            //        params.response.console.log("           params.arguments.nonstop: " + params.arguments.nonstop);
            //        params.response.console.log("             params.arguments.first: " + params.arguments.first);
            //        params.response.console.log("              params.arguments.last: " + params.arguments.last);
            //        params.response.console.log("               params.arguments.all: " + params.arguments.all);
            try {
                ejes_api_1.runEjesApi(params);
            }
            catch (e) {
                params.response.console.error(e.message || e);
                params.response.console.error("To use EJES Api, you must install the @phoenixsoftware/ejes npm package.");
                params.response.data.setExitCode(99);
            }
        });
    }
}
exports.default = GenericDisplayer;
//# sourceMappingURL=generic.api.handler.js.map