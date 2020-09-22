"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmdstackDefinition = void 0;
exports.CmdstackDefinition = {
    name: "cmdstack",
    aliases: ["cmd", "stack", "stk"],
    summary: "# Shell a command stack.",
    description: "Issues a starting command stack.  It connects to the host and allows you to use an enhanced set of EJES BATCH commands.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "A required command stack enclosed in double-quotes.  The command stack " +
                "may contain meta commands like echo and download.  For a list of meta " +
                "commands, use the option --helpApp meta.  For information about (E)JES host primary " +
                "commands and their parameters, read Chapter 5 (E)JES Commands in the (E)JES Reference.",
            required: true
        }
    ],
    options: [
        {
            name: "blanks",
            description: "Display blank lines to stderr (starts with blanks on)",
            type: "string",
            aliases: ["b"]
        },
        {
            name: "cmdstack",
            description: "Start with a host command stack, separated by semicolons and enclosed in quotes.",
            type: "string",
            aliases: ["c"]
        },
        {
            name: "autoupdate",
            description: "Append the UPDATE command to the command stack when you press enter (if it doesn't end with an UPDATE).  Not recommended when issuing FIND requests.",
            type: "array",
            aliases: ["a", "aup"]
        },
        { name: "debug",
            type: "number",
            aliases: ["dbg", "dv", "debug-value"],
            description: "Specify a numeric debugging mode." },
        {
            name: "echo",
            description: "Display host screen output to stdout.",
            type: "array",
            aliases: ["e"]
        },
        {
            name: "inactivity",
            type: "number",
            aliases: ["i"],
            description: "Specify host activity timeout in minutes (starts set to 2)."
        },
        {
            name: "resume",
            description: "For use with the pause meta command.  Use \"off\" to prevent resuming an auto pin session.",
            type: "array",
            aliases: ["r"]
        },
        {
            name: "screen",
            description: "Display host screen output to stderr.",
            type: "array",
            aliases: ["s"]
        },
        {
            name: "terminal",
            description: "Set terminal emulation size or type.   String: [*|[<number>[,|x] <number>]|[2|3|4|5]",
            type: "string",
            aliases: ["t"]
        },
        {
            name: "quiet",
            description: "Prevent output of interactive details, including version title on start and exit code on exit.",
            type: "array",
            aliases: ["q"]
        }
    ],
    profile: {
        required: ["ejes"],
    }
};
//# sourceMappingURL=Cmdstack.definition.js.map