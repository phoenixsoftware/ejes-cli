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
exports.ShellDefinition = void 0;
exports.ShellDefinition = {
    name: "shell",
    aliases: ["sh", "prompt"],
    summary: "# Start the EJES Batch Shell without logging in.",
    description: "Starts the EJES Batch Shell without logging on.  " +
        "It allows you to connect to the host and use an " +
        "enhanced set of EJES BATCH commands.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
    options: [
        {
            name: "blanks",
            description: "Display blank lines to stderr (starts with blanks on)",
            type: "string",
            aliases: ["b"]
        },
        {
            name: "cmdstack",
            description: "Start with a host command stack, separated by semicolons " +
                "and enclosed in quotes.",
            type: "string",
            aliases: ["c"]
        },
        {
            name: "autoupdate",
            description: "Append the UPDATE command to the command stack when you " +
                "press enter (if it doesn't end with an UPDATE).  " +
                "Not recommended when issuing FIND requests.",
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
    /*
    positionals: [
        {
            name: "directory",
            description: "The directory/path to list the contents. Blank/Omitted will list the current directory",
            type: "string"
        }
    ],
    */
    profile: {
        required: ["zosmf"],
    }
};
//# sourceMappingURL=Shell.definition.js.map