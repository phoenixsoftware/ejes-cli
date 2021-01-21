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
const Stream_definition_1 = require("./Stream/Stream.definition");
const EjesSession_1 = require("../EjesSession");
const LogDefinition = {
    name: "log",
    summary: "- Stream syslog/operlog to stdout.",
    description: "Stream syslog/operlog to stdout.",
    type: "group",
    children: [Stream_definition_1.StreamDefinition],
    pluginHealthCheck: "./lib/healthCheck.handler",
    passOn: [
        {
            property: "profile",
            value: { required: ["ejes"] },
            merge: false,
            ignoreNodes: [{ type: "group" }]
        },
        {
            property: "options",
            value: EjesSession_1.EjesSession.EJES_CLI_OPTIONS,
            merge: true,
            ignoreNodes: [{ type: "group" }]
        }
    ]
};
module.exports = LogDefinition;
//# sourceMappingURL=Log.definition.js.map