/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

/* This module acts as a handler for each of the EJES primary displays.
 * It would be better if the imperative could accept a list of the displays
 * available to the user and translate to commands, but it doesn't work that way.
*/
import { ICommandHandler, IHandlerParameters, ISession, ConnectionPropsForSessCfg } from "@zowe/imperative";
//import { runEjesQuery } from "./ejes_query";
import { runEjesQuery } from "../../api/ejes_query";

export default class GenericDisplayer implements ICommandHandler {
    public async process(params: IHandlerParameters): Promise<void> {
        const sessCfg: ISession = {};
        const sessCfgWithCreds = await ConnectionPropsForSessCfg.addPropsOrPrompt(sessCfg, params.arguments, { doPrompting: true, parms: params });
        try {
            runEjesQuery(params);
        }
        catch (e) {
            params.response.console.error(e.message || e);
            params.response.console.error("To use EJES Query, you must install the @phoenixsoftware/ejes npm package.");
            params.response.data.setExitCode(99);
        }
    }
}
