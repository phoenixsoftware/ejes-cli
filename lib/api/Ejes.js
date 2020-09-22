"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ejes = void 0;
const imperative_1 = require("@zowe/imperative");
let Ejes = /** @class */ (() => {
    class Ejes {
        static init(session, ip, ep) {
            const payload = JSON.stringify({ initParms: ip, execParms: ep });
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_INIT, [], payload);
        }
        static cancelDownload(session) {
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_CANCEL_DOWNLOAD);
        }
        static exec(session, ep) {
            const payload = JSON.stringify({ execParms: ep });
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_EXEC, [], payload);
        }
        static term(session) {
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_TERM);
        }
    }
    Ejes.EJES_INIT = "/init?q=lines,loginfo,position,message,find";
    Ejes.EJES_CANCEL_DOWNLOAD = "/cancel-download";
    Ejes.EJES_EXEC = "/exec?q=lines,loginfo,position,message,find";
    Ejes.EJES_TERM = "/term";
    return Ejes;
})();
exports.Ejes = Ejes;
//# sourceMappingURL=Ejes.js.map