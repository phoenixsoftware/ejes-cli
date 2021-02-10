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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ejes = void 0;
const imperative_1 = require("@zowe/imperative");
let Ejes = /** @class */ (() => {
    class Ejes {
        static init(session, ip, ep, debug = 0) {
            const payload = JSON.stringify({ initParms: ip, execParms: ep });
            if (debug & (session.DEBUG_REQUEST | session.DEBUG_FETCH_METADATA)) {
                session.log("*** DEBUG *** Ejes:init - Request data=" + payload + ", Query=" + Ejes.EJES_INIT);
            }
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_INIT, [], payload);
        }
        static cancelDownload(session, debug = 0) {
            if (debug & session.DEBUG_REQUEST) {
                session.log("*** DEBUG *** Ejes:cancelDownload - No request data.  Query=" + Ejes.EJES_CANCEL_DOWNLOAD);
            }
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_CANCEL_DOWNLOAD);
        }
        static exec(session, ep, debug = 0) {
            const payload = JSON.stringify({ execParms: ep });
            if (debug & (session.DEBUG_REQUEST | session.DEBUG_FETCH_METADATA)) {
                session.log("*** DEBUG *** Ejes:exec - Request data=" + payload + ", Query = " + Ejes.EJES_EXEC);
            }
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_EXEC, [], payload);
        }
        static term(session, debug = 0) {
            if (debug & session.DEBUG_REQUEST) {
                session.log("*** DEBUG *** Ejes:term - No Request Data.  Query=" + Ejes.EJES_TERM);
            }
            return imperative_1.RestClient.postExpectJSON(session, Ejes.EJES_TERM);
        }
    }
    Ejes.EJES_INIT = "/init?q=loginfo,environment,version,function,notice,position,message,lines";
    Ejes.EJES_CANCEL_DOWNLOAD = "/cancel-download";
    Ejes.EJES_EXEC = "/exec?q=loginfo,position,message,lines";
    Ejes.EJES_TERM = "/term";
    return Ejes;
})();
exports.Ejes = Ejes;
//# sourceMappingURL=Ejes.js.map