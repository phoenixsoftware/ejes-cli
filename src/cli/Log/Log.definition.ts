/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

import { ICommandDefinition } from "@zowe/imperative";
import { StreamDefinition } from "./Stream/Stream.definition";
import { EjesSession } from "../EjesSession";


const LogDefinition: ICommandDefinition = {
    name: "log",
    summary: "- Output syslog/operlog to stdout.",
    description: "Output the tail end of the host log to stdout, optionally streaming new records.  Positioning, searching, and limiting options are supported, including specifying which log type and what system.",
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
