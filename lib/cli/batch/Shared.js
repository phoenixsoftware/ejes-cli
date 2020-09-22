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
exports.addShared = void 0;
function addShared(x) {
    const common = "The command stack may contain both host commands and meta commands " +
        "like echo and download.  For a list of meta commands, use the option --helpApp meta.  For " +
        "invocation parameters, see the (E)JES Reference Manual for information for the " +
        "corresponding command for details about content and the list's internal order.";
    const positionals = [{
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  ",
            required: !!x.parmRequired
        }];
    x.obj.profile = {
        required: ["ejes"],
    };
    x.obj.positionals = positionals;
    if (x.primary && x.system && x.parms)
        x.obj.positionals[0].description += "May contain optional parameters, invocation primary selection criteria, an invocation system selection override, and/or a command stack.  " + common;
    else if (x.primary && x.system && !x.parms)
        x.obj.positionals[0].description += "May contain invocation primary selection criteria, an invocation system selection override, and/or a command stack.  " + common;
    else if (!x.primary && x.system && !x.parms)
        x.obj.positionals[0].description += "May contain an invocation system selection override and/or a command stack.  " + common;
    else if (x.primary && !x.system && !x.parms)
        x.obj.positionals[0].description += "May contain invocation primary selection criteria and/or a command stack.  " + common;
    else if (x.primary && !x.system && x.parms)
        x.obj.positionals[0].description += "May contain optional parameters, invocation primary selection criteria, and/or a command stack.  " + common;
    else if (!x.primary && x.system && x.parms)
        x.obj.positionals[0].description += "May contain optional parameters, an invocation system selection override, and/or a command stack.  " + common;
    else if (!x.primary && !x.system && x.parms)
        x.obj.positionals[0].description += "May contain optional parameters and/or a command stack.  " + common;
    else if (!x.primary && !x.system && !x.parms)
        x.obj.positionals[0].description += "May contain command stack.  " + common;
    x.obj.options = [{
            name: "blanks",
            description: "Display blank lines to stderr (screen on).  Off by default.  Specify with no argument to turn on.",
            type: "array",
            aliases: ["b"]
        }, {
            name: "cmdstack",
            description: "Start with a host command stack, separated by semicolons and enclosed in quotes.",
            type: "string",
            aliases: ["c"]
        }, {
            name: "autoupdate",
            description: "Append the UPDATE command to the command stack when you press enter (if it doesn't end with an UPDATE).  " +
                "Not recommended when issuing FIND requests.  Off by default.  Specify with no argument to turn on.",
            type: "array",
            aliases: ["a", "aup"]
        }, {
            name: "debug",
            type: "number",
            aliases: ["dbg", "dv", "debug-value"],
            description: "Specify a numeric debugging mode."
        }, {
            name: "echo",
            description: "Display host screen output to stdout.  Off by default.  Specify with no argument to turn on.",
            type: "array",
            aliases: ["e"]
        }, {
            name: "inactivity",
            type: "number",
            aliases: ["i"],
            description: "Specify host activity timeout in minutes (starts set to 2)."
        }, {
            name: "screen",
            description: "Display host screen output to stderr.  Off by default.  Specify with no argument to turn on.",
            type: "array",
            aliases: ["s"]
        }, {
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
        },
    ];
}
exports.addShared = addShared;
//# sourceMappingURL=Shared.js.map