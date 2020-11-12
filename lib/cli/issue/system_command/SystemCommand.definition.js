"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemCommandDefinition = void 0;
/**
 * Command one [object] defintion. This definition is of imperative type "command" and therefore must have a
 * command handler (which performs the "work" for this command).
 *
 * In this case, "error-handler" will always fail with an "ImperativeError".
 *
 * Property Summary:
 * =================
 * "name" of the [object]. Should be a noun (e.g. data-set).
 * "aliases" normally contains a shortened form of the command
 * "summary" will display when issuing the help on this [objects] [action].
 * "type" is "command" which means a handler is required.
 * "handler" is the file path to the handler (does the work)
 */
exports.SystemCommandDefinition = {
    name: "syscmd",
    aliases: ["s"],
    summary: "Issue a system command",
    description: "Issue a system command and receive console output as a report in text format.",
    options: [
        { name: "debug", type: "number", aliases: ["dbg"], description: "Specify a numeric debugging mode." },
        { name: "dry-run", type: "array", aliases: ["n"], description: "Run under dry-run protocols." },
        { name: "jes2", type: "boolean", aliases: ["2"], description: "Use the JES2 spooler instead of the default spooler." },
        { name: "jes3", type: "boolean", aliases: ["3"], description: "Use the JES3 or JES3plus spooler instead of the default spooler." },
        { name: "lines", type: "string", aliases: ["y"], description: "Maximum lines in a table or report.  [1000 | tty-default | number | all]" },
        { name: "width", type: "string", aliases: ["x"], description: "Maximum characters per line or row.  [tty-default | number | all]" },
    ],
    examples: [{
            description: "Display the time",
            options: "\"d t\""
        }, {
            description: "Display time and ppt",
            options: "\"d t;/d ppt\""
        }],
    type: "command",
    positionals: [
        {
            name: "command",
            type: "string",
            description: "System console command enclosed in double-quotes.  If you wish to issue multiple commands, " +
                "follow each command with a semicolon and a slash(;/)",
            required: true
        }
    ],
    handler: __dirname + "/SystemCommand.handler"
};
//# sourceMappingURL=SystemCommand.definition.js.map