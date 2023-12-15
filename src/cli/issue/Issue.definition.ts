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
import { SystemCommandDefinition } from "./system_command/SystemCommand.definition";
import { SubmitDefinition } from "./submit/Submit.definition";

import { EjesProfile } from "../EjesProfile";

/**
 * [action] command defintion for the [action] two group. The [action] is of imperative command definition type
 * "group", which means it must have children.
 *
 * In this case, the action is "fail" - which will cause handlers to fail in a variety of ways.
 *
 * Property Summary:
 * =================
 * "name" of the [action]. Always a verb (e.g. "copy")
 * "summary" will display when issuing the help for the [group] (e.g. zowe zos-files --help)
 * "type" is "group" which means it has children (the [objects])
 * "children" is the set of child definitions (the [objects])
 */
const SystemDefinition: ICommandDefinition = {
    name: "issue",
    aliases: ["i"],
    summary: "- Issue a system command on the host, if authorized.",
    description: "Issue a system command by sending the positional parameters to the host.  (E)JES will respond with output sent to your user log.",
    type: "group",
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
            value: EjesProfile.EJES_RM_CONNECTION_OPTIONS,
            merge: true,
            ignoreNodes: [ { type: "group" } ]
        },
//        {
//            property: "options",
//            value: EjesProfile.EJES_RM_RUNTIME_OPTIONS,
//            merge: true,
//            ignoreNodes: [ { type: "group" } ]
//        },
        {
            property: "options",
            value: EjesProfile.EJES_GLOBAL_OPTIONS,
            merge: true,
            ignoreNodes: [ { type: "group" } ]
        }
    ],
    children: [SystemCommandDefinition, SubmitDefinition]
};

export = SystemDefinition;
