/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

import { IEjes } from "./Doc/IEjes";
import { EjesSession } from "../cli/EjesSession";

import { RestClient, Session, ImperativeExpect, IHandlerParameters, Logger, Imperative, TextUtils } from "@zowe/imperative";

export class Ejes {

    public static readonly EJES_INIT            = "/init?q=lines,loginfo,position,message,find,function";
    public static readonly EJES_CANCEL_DOWNLOAD = "/cancel-download";
    public static readonly EJES_EXEC            = "/exec?q=lines,loginfo,position,message,find";
    public static readonly EJES_TERM            = "/term";

    public static init(session: EjesSession, ip: object, ep: object, debug: number = 0): Promise<IEjes> {
        const payload = JSON.stringify({ initParms: ip, execParms: ep });
        if ( debug & (session.DEBUG_REQUEST | session.DEBUG_FETCHING) ) { session.log("*** DEBUG *** Ejes:init - Request data=" + payload + ", Query=" + Ejes.EJES_INIT); }
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_INIT, [], payload );
    }

    public static cancelDownload(session: EjesSession, debug: number = 0): Promise<IEjes> {
        if ( debug & session.DEBUG_REQUEST ) { session.log("*** DEBUG *** Ejes:cancelDownload - No request data.  Query=" + Ejes.EJES_CANCEL_DOWNLOAD); }
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_CANCEL_DOWNLOAD);
    }

    public static exec(session: EjesSession, ep: object, debug: number = 0): Promise<IEjes> {
        const payload = JSON.stringify({ execParms: ep });
        if ( debug & (session.DEBUG_REQUEST | session.DEBUG_FETCHING) ) { session.log("*** DEBUG *** Ejes:exec - Request data=" + payload + ", Query = " + Ejes.EJES_EXEC); }
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_EXEC, [], payload );
    }

    public static term(session: EjesSession, debug: number = 0): Promise<IEjes> {
        if ( debug & session.DEBUG_REQUEST ) { session.log("*** DEBUG *** Ejes:term - No Request Data.  Query=" + Ejes.EJES_TERM); }
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_TERM);
    }
}
