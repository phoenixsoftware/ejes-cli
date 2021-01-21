/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

import { ICommandHandler, IHandlerParameters, Imperative, ImperativeError } from "@zowe/imperative";
import { runEjesQuery } from "../../../api/ejes_query";

export default class SubmitCommandHandler implements ICommandHandler {
    public async process(params: IHandlerParameters): Promise<void> {
        try {
            runEjesQuery(params);
        }
        catch (e) {
            params.response.console.error(e.message || e);
            params.response.console.error("To use EJES Issue, you must install the @phoenixsoftware/ejes NPM package.");
            params.response.data.setExitCode(99);
        }
    }
}
