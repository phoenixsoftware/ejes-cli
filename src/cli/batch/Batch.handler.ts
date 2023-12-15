/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

import { ICommandHandler, IHandlerParameters, ConnectionPropsForSessCfg, TextUtils } from "@zowe/imperative";
import { runEjesBatch } from "../../api/ejes_batch";

/**
 * Generic handler for shelling (E)JES batch
 * @export
 * @class ShellHandler
 * @implements {ICommandHandler}
 */
export default class DisplayHandler implements ICommandHandler {
    public async process(params: IHandlerParameters): Promise<void> {
        const sessCfg = {};
        const sessCfgWithCreds = await ConnectionPropsForSessCfg.addPropsOrPrompt(sessCfg, params.arguments, { doPrompting: true, parms: params });
        try {
            runEjesBatch(params);
        }
        catch (e) {
            params.response.console.error(e.message || e);
            params.response.console.error("To use EJES Batch, you must install the @phoenixsoftware/ejes npm package.");
            params.response.data.setExitCode(99);
        }
    }
}

