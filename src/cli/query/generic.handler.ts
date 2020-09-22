/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
*/

/* This module acts as a handler for each of the EJES primary displays.
 * It would be better if the imperative could accept a list of the displays
 * available to the user and translate to commands, but it doesn't work that way.
*/
import { ICommandHandler, IHandlerParameters } from "@zowe/imperative";
//import { runEjesQuery } from "./ejes_query";
import { runEjesQuery } from "../../api/ejes_query";

export default class GenericDisplayer implements ICommandHandler {
    public async process(params: IHandlerParameters): Promise<void> {
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
            runEjesQuery(params);
        }
        catch (e) {
            params.response.console.error(e.message || e);
            params.response.console.error("To use EJES Query, you must install the @phoenixsoftware/ejes npm package.");
            params.response.data.setExitCode(99);
        }
    }
}
