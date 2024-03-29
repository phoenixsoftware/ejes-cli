"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
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
/* This module acts as a handler for each of the EJES primary displays.
 * It would be better if the imperative could accept a list of the displays
 * available to the user and translate to commands, but it doesn't work that way.
*/
const imperative_1 = require("@zowe/imperative");
//import { runEjesQuery } from "./ejes_query";
const ejes_query_1 = require("../../api/ejes_query");
class GenericDisplayer {
    process(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessCfg = {};
            const sessCfgWithCreds = yield imperative_1.ConnectionPropsForSessCfg.addPropsOrPrompt(sessCfg, params.arguments, { doPrompting: true, parms: params });
            try {
                (0, ejes_query_1.runEjesQuery)(params);
            }
            catch (e) {
                params.response.console.error(e.message || e);
                params.response.console.error("To use EJES Query, you must install the @phoenixsoftware/ejes npm package.");
                params.response.data.setExitCode(99);
            }
        });
    }
}
exports.default = GenericDisplayer;
//# sourceMappingURL=generic.handler.js.map