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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitDefinition = void 0;
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
exports.SubmitDefinition = {
    name: "submit",
    aliases: ["sub"],
    summary: "Submit a local or host file to the host.",
    description: "Submit a job from the local host with the local: prefix, or a MVS data set or z/OS UNIX path.  Responds with submission messages and a table providing a description of a successful submission.",
    options: [
        { name: "debug", type: "number",
            aliases: ["dbg", "dv"],
            description: "Specify a numeric debugging mode." },
        { name: "jes2",
            aliases: ["2"],
            type: "boolean",
            description: "Use the JES2 spooler instead of the default spooler." },
        { name: "jes3",
            aliases: ["3"],
            type: "boolean",
            description: "Use the JES3 or JES3plus spooler instead of the default spooler." },
        { name: "lrecl", type: "number",
            description: "Logical record length." },
        { name: "recfm", type: "string",
            allowableValues: {
                values: ["f", "v", "list", "help"],
                caseSensitive: true
            },
            description: "Record format of fixed or variable length." },
        { name: "subsys", type: "string",
            allowableValues: {
                values: ["jes2", "jes3", "list", "help"],
                caseSensitive: true
            },
            description: "Subsystem name where the job should be sent. If not specified defaults to the subsystem under which the current (E)JES session is running.  For JES3plus, use jes3." },
        { name: "unit", type: "string",
            description: "Generic or esoteric unit name where an uncataloged MVS data set resides." },
        { name: "volume", type: "string",
            description: "Volume serial where an uncataloged MVS data set resides." },
    ],
    examples: [{
            description: "Submit a local workstation file",
            options: "\"local:iefbr14.jcl\" --lrecl 132 --subsys jes3"
        }, {
            description: "Submit a local workstation file using arguments",
            options: "\"local:iefbr14.jcl lrecl(132) subsys(jes3)\""
        }, {
            description: "Submit a clist member",
            options: "\"a.cntl(iefbr14)\""
        }],
    type: "command",
    positionals: [
        {
            name: "command",
            type: "string",
            description: "Any of MVS data set name, z/OS UNIX path name, or a workstation file prefixed by 'local:'.  The environment variable EJES_SUBMIT_PATH is used to provide a path for a local workstation file if only a file name is provided.  When not present, the current working directory is used instead.  While the use of the command line options below is recommended, you may instead append to the command string arguments for the submit command listed in the (E)JES Reference.",
            required: true
        }
    ],
    handler: __dirname + "/Submit.handler"
};
//# sourceMappingURL=Submit.definition.js.map