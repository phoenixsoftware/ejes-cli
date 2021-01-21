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
const ejes_query_1 = require("../../../api/ejes_query");
class SubmitCommandHandler {
    process(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ejes_query_1.runEjesQuery(params);
            }
            catch (e) {
                params.response.console.error(e.message || e);
                params.response.console.error("To use EJES Issue, you must install the @phoenixsoftware/ejes NPM package.");
                params.response.data.setExitCode(99);
            }
        });
    }
}
exports.default = SubmitCommandHandler;
//# sourceMappingURL=Submit.handler.js.map