/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
*/

import { ICommandDefinition } from "@zowe/imperative";
import { StreamDefinition } from "./Stream/Stream.definition";
import { EjesSession } from "../EjesSession";


const LogDefinition: ICommandDefinition = {
    name: "log",
    summary: "- Stream syslog/operlog to stdout.",
    description: "Stream syslog/operlog to stdout.",
    type: "group",
    children: [ StreamDefinition ],
    pluginHealthCheck: "./lib/healthCheck.handler",
    passOn: [
             {
                 property: "profile",
                 value: { required: ["ejes"] },
                 merge: false,
                 ignoreNodes: [ {type: "group"} ]
             },
             {
                 property: "options",
                 value: EjesSession.EJES_CLI_OPTIONS,
                 merge: true,
                 ignoreNodes: [ {type: "group"} ]
             }
         ]
};

export = LogDefinition;
