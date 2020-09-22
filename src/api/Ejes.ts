/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
*/

import { IEjes } from "./Doc/IEjes";
import { RestClient, Session, ImperativeExpect, IHandlerParameters, Logger, Imperative, TextUtils } from "@zowe/imperative";

export class Ejes {

    public static readonly EJES_INIT            = "/init?q=lines,loginfo,position,message,find";
    public static readonly EJES_CANCEL_DOWNLOAD = "/cancel-download";
    public static readonly EJES_EXEC            = "/exec?q=lines,loginfo,position,message,find";
    public static readonly EJES_TERM            = "/term";

    public static init(session: Session, ip: object, ep: object): Promise<IEjes> {
        const payload = JSON.stringify({ initParms: ip, execParms: ep });
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_INIT, [], payload );
    }

    public static cancelDownload(session: Session): Promise<IEjes> {
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_CANCEL_DOWNLOAD);
    }

    public static exec(session: Session, ep: object): Promise<IEjes> {
        const payload = JSON.stringify({ execParms: ep });
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_EXEC, [], payload );
    }

    public static term(session: Session): Promise<IEjes> {
        return RestClient.postExpectJSON<IEjes>(session, Ejes.EJES_TERM);
    }
}
