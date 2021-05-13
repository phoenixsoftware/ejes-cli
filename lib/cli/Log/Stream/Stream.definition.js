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
exports.StreamDefinition = void 0;
const path = require("path");
const XSELECT_OPTIONS = "Message Filtering Options";
// const FUNCTIONAL_OPTIONS = "Functional Options";
const CONSOLE_ANSI_OPTIONS = "Console ANSI Highlighting Options";
const FIND_OPTIONS = "Line Search Positioning Options";
const SUBSYSTEM_OPTIONS = "JES Type Options";
const LOG_OPTIONS = "Log Type Options";
const POSITIONING_OPTIONS = "Positioning Options";
const OFFSET_OPTIONS = "Positioning Offset Options";
exports.StreamDefinition = {
    name: "stream",
    summary: "- Stream or tail operlog or systlog to stdout.",
    description: "Outputs the default log to stdout, or the log specified via options.  Defaults as a linux tail function with support for standard tail options --follow (-f), --lines (-n), -q, -v, and --version.\n\n      Set the position in the log to begin output using --find, --line, --time, and --offset.  Advanced host line reduction filtering is available with \"Message Filtering\" options, e.g., fetch only lines associated with an IAT6xxxx message by specifying: --msgId \"IAT6*\".\n\n      Turn on ANSI highlighting for --find using --hilite.  Perform regex text matching with ANSI highlighting  using --match.  Enable MCS console color emulation with --mcs.  Prevent ANSI characters in the stream, instead using text-only indicators, by specifying: --nocolor \"on\".\n\n      The order of host commands issued during initialization are fixed in this program in this order: (1) All message filtering options (2) --line (3) --time (4) --find (5) --offset",
    type: "command",
    handler: path.join(__dirname, "Stream.handler"),
    options: [
        {
            name: "follow",
            aliases: ["f", "nonstop", "ns"],
            description: "Follow the log stream.  Displays last page of log then waits for more data.  Ignored for --response-format-json.  The actual maximum duration is controlled by your host refresh command settings.",
            type: "boolean"
        }, {
            name: "lines",
            description: "Limit output to a number of lines or a time span.  Defaults to 10 lines.\n\n      Specify a maximum number of lines up to 999,999 lines, or specify a time span of 0.01 to 999 seconds, minutes, hours, or days by specifying a number followed by \"s\", \"m\", \"h\", or \"d\".  Specify  \"all\" for unlimited output.\n\n      When --request-format-json (--rfj) is specified, the number of lines up to 5,000 specified on this option (or the default of 10) determines the number of lines fetched from the host and stored in the output json data array.  With --rfj, this option overrides --enumValue.\n\n      Note: When there are no positioning requests, the CLI attempts to get the bottom n lines.  However, the log is a dynamic data set and the actual log type may be different than assumed.",
            type: "array",
            aliases: ["n"],
            allowableValues: { values: ["all", "^(?:[1-9]|\\d\\.)\\d{0,2}[smhd]$", "^[1-9]\\d{0,5}$"], caseSensitive: true }
        }, {
            name: "bytes",
            aliases: ["c"],
            description: "Limit output to the specified number of bytes.  NOT SUPPORTED.  Pipe to built-in tail command instead.",
            numericValueRange: [1, 99999],
            type: "number"
        }, {
            name: "quiet",
            aliases: ["q"],
            description: "Do not display header or trailer lines.  Set the environment variable EJES_LOG_CLI_QUIET to any value to make this the default.  Set EJES_LOG_CLI_NO_BOTTOM to prevent displaying the bottom of data line.",
            type: "boolean"
        }, {
            name: "verbose",
            aliases: ["v"],
            description: "Display header lines or trailer.  This is the default unless the environment variable EJES_LOG_CLI_QUIET is set.  Set EJES_LOG_CLI_NO_BOTTOM to prevent displaying the bottom of data line.",
            type: "boolean"
        }, {
            name: "version",
            description: "Display version header and quit.",
            type: "boolean"
        }, {
            name: "requests",
            description: "Limit the number of normally unlimited host requests.  Only requests for data or additional data count as a request.",
            numericValueRange: [2, 99999],
            type: "number"
        }, {
            name: "mcs",
            aliases: ["mcsConsoleColor", "mcs-console-color"],
            description: "Use ANSI escape sequences to emulate the color and extended highlighting attributes in OPERLOG output to resemble the formatting on your MCS operator consoles.  If color is disabled, textual attributes will be prefixed instead.  The MVS \"DISPLAY MPF\" command displays the color attributes in use on your system. ",
            type: "boolean",
            group: CONSOLE_ANSI_OPTIONS
        }, {
            name: "match",
            aliases: ["matchText", "match-text", "mt", "m"],
            description: "Specify case-independent text to match and highlight using ANSI escape sequences.\n\n      Specify a string, a Javascript regex pattern without the enclosing slashes (e.g., \"login|logoff|force\"), or a Javascript regex pattern string with slashes and regex option flags (e.g., \"/[Ll]ogo.{1,2}|Signoff/g\").  If the first or second type is used, the flags default to ig (ignore-case and global match).\n\n      Matching is done on each line separately.  All matches in a line will be highlighted.  If color is disabled, the line will be prefixed with \">\".",
            type: "string",
            group: CONSOLE_ANSI_OPTIONS
        }, {
            name: "find",
            description: "Position start of output using host FIND command syntax.  Refer to the (E)JES Reference for the FIND command for detailed find syntax and option documention.  Find positiong is done after --line and --time, but before --offset.  If you are searching for specific messages IDs or finding text in messages, --msgId or --msgText may prove faster and more efficient.\n\n      See supported syntax below, where find-string is required and should be enclosed in single quotes if it contains spaces or special characters.  All caps options are the default if not specified. Searching for double-quotes is not supported.\n\n      [']find-string['] [NEXT|prev|first|last] [CHARS|prefix|pre|suffix|suf|word] [startcol[ endcol]]",
            type: "string",
            stringLengthRange: [1, 80],
            //                conflictsWith: ["follow"],
            group: FIND_OPTIONS
        }, {
            name: "hilite",
            aliases: ["highlight-find-text", "highlight", "ht"],
            description: "Use in conjunction with --find to highlight found strings using ANSI characters.  If color is disabled, the line will be prefixed with \"=\".",
            type: "array",
            impliesOneOf: ["find"],
            //                conflictsWith: ["follow"],
            group: FIND_OPTIONS
        }, {
            name: "only-enumerate-maximum",
            description: "(1) Output only lines marked by the host as found using the --find option.  (2) Limit the number of lines enumerated from the host while outputting only found lines.  Specify a maximum number of lines up to 999,999 lines; 0.01 to 999 seconds, minutes, hours, or days by specifying a number followed by \"s\", \"m\", \"h\", or \"d\"; or \"all\" to not limit enumeration.  The default is 1000.   Some Message Filtering options (e.g., --msgId) may provide better results and will be more efficient and faster.\n\n      BETA functionality — specification may change.",
            type: "array",
            aliases: ["onlyEnumerateMaximum", "oem", "only"],
            conflictsWith: ["follow"],
            impliesOneOf: ["find"],
            allowableValues: { values: ["all", "^(?:[1-9]|\\d\\.)\\d{0,2}[smhd]$", "^[1-9]\\d{0,5}$"], caseSensitive: true },
            group: FIND_OPTIONS
        }, {
            name: "line",
            description: "Position at a specific line in the log.  With no argument, it positions to top of the displayable log (like the TOP command).  Positioning done before --time, --find, and --offset.",
            type: "array",
            allowableValues: { values: ["first", "last", "^[1-9]\\d*$"], caseSensitive: false },
            group: POSITIONING_OPTIONS
        }, {
            name: "head",
            description: "Position at top of log same as --top without an argument.  Positioning done before --time, --find, and --offset.",
            type: "boolean",
            conflictsWith: ["line", "follow"],
            group: POSITIONING_OPTIONS
        }, {
            name: "time",
            description: "Positions a time on the current day or to a time and date.  With no argument, positions to the beginning of the day.  Positioning done before --find and --offset, but after --line.\n\n      The argument is hh:mm:ss:th-date, where ss or ss:th and the date are optional.\n\nThe date, if specified, is specified as yyyy.ddd, yyyy-ddd, yyyy/mm/dd, yyyy/dd/mm, mm/dd/yyyy, dd/mm/yyyy, yyyy-mm-dd, yyyy-dd-mm, mm-dd-yyyy, or dd-mm-yyyy. The Julian date form is always valid.\n\n      The Gregorian date form depends upon your current date format setting, though both slash (/) and dash (-) are accepted as separator characters.  Specify \"?\" to return the Gregorian date format and quit, i.e., --time \"?\"\n\n      Two copy-paste date-time formats are supported.  A date-time may copied from the log and pasted, enclosed in quotes, after the --time option.  Operlog: \"yyyydddd hh:mm:ss.th\".  Syslog: \"yyyyddd hhmmsst\".",
            type: "array",
            allowableValues: { values: ["(?:^(20\\d{5}) (\\d{7})$)|(?:^(20\\d{5}) ((\\d\\d:\\d\\d:\\d\\d.\\d\\d))$)|(?:^(\\d\\d\\:\\d\\d(?:\\:\\d\\d){0,2}(?:-(?:(?:\\d{4}[.-]\\d{3}$)|(?:^\\d{4}(?:[\\/|-]\\d{2}){2}$)|(?:^(?:\\d{2}[\\/|-]){2}\\d{4})))*){0,1}$|^\\?$)"], caseSensitive: false },
            group: POSITIONING_OPTIONS
        }, {
            name: "offset",
            aliases: ["off"],
            description: "Offset positioning by time after the final position arrived at by message filtering, --line, --time, and --find.  Valid directional indicators next or + (later in log) or prev (earlier).  The directional indicator is optional and prev is assumed.  Valid trailing time indicators are s, m, h, or d.  Without an argument, prev1m is assumed.  A number without a time indicator assumes h on OPERLOG, but on SYSLOG positions by adding to the current data set number (if 0, it positions at the top of the current data set.)",
            type: "array",
            allowableValues: { values: ["^(\\+|next|prev)*(\\d+[smhd]{0,1})$"], caseSensitive: false },
            group: OFFSET_OPTIONS
        }, {
            name: "system-name",
            aliases: ["systemName", "sysname", "sn"],
            description: "Filter for up to 4 provided system name(s).    Generic (*) and placeholder (%) mask characters allowed.  Note: The response time of the OPERLOG browser can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "job-name",
            aliases: ["jobName", "jname", "j"],
            description: "Filter OPERLOG for up to 4 provided job names.    Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "job-id",
            aliases: ["jobId", "jid"],
            description: "Filter OPERLOG for up to 4 provided job ids, e.g, J0632369.    Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "console",
            aliases: ["con"],
            description: "Filter OPERLOG for up to 4 provided consoles.    Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "message-id",
            aliases: ["messageId", "msgId", "mi"],
            description: "Filter OPERLOG for up to 3 provided message ids of up to 12 characters.    Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "message-text",
            aliases: ["messageText", "msgText", "msgTxt", "mtxt", "mx"],
            description: "Filter OPERLOG for message text of up to 34 characters.  Generic (*) and placeholder (%) mask characters allowed.  To filter for strings inside a message's text, use generic characters, e.g., \"*logon*\".  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "routing-codes",
            aliases: ["routingCodes", "routing", "r"],
            description: "Filter OPERLOG for routing codes.  Up to 34 characters that may be ALL, NONE, or a list of decimal routing codes or ranges. For example: 1,3,6-9,100-128.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            defaultValue: ["ALL"],
            group: XSELECT_OPTIONS
        }, {
            name: "descriptor-codes",
            aliases: ["descriptorCodes", "descriptor", "dc"],
            description: "Filter OPERLOG for descriptor codes.  Up to 34 characters that may be ALL, NONE, or a list of decimal descriptor codes or ranges. For example: 1,3,6-9.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            defaultValue: ["ALL"],
            group: XSELECT_OPTIONS
        }, {
            name: "window-bottom",
            aliases: ["windowBottom", "winBot", "wb", "bot", "high-time-date", "htd"],
            description: "Filter OPERLOG by setting the time and optionally the date of the bottom of the log to use.  Up to 23 characters.\n\n      The boundary specifications may be either fixed time-date values, e.g.\"16:00:12:90-2021/02/12\" (see “Time-Date Values” in the (E)JES Reference) or calculated relative to the time stamp associated with the record shown at 57 lines from the bottom of the log at start-up.\n\n      A relative value is indicated by the presence of a next (+) or previous preceding the boundary specification, e.g., prev1h. After the next or previous you may specify either a number of seconds, minutes, hours, or days as indicated by using a 's', 'm', 'h', or 'd' suffix. Assumes 'h' if omitted.\n\n      Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            allowableValues: { values: ["^(\\+|next|prev)*(\\d+[smhd]{0,1})$|^(?:(\\d\\d\\:\\d\\d(?:\\:\\d\\d){0,2}(?:-(?:(?:\\d{4}[.-]\\d{3})|(?:\\d{4}(?:[\\/|-]\\d{2}){2})|(?:(?:\\d{2}[\\/|-]){2}\\d{4})))*){0,1}|\\?)$"], caseSensitive: false },
            group: XSELECT_OPTIONS
        }, {
            name: "window-top",
            aliases: ["windowTop", "winTop", "wt", "top", "low-time-date", "ltd"],
            description: "Filter OPERLOG by setting the time and optionally the date of the top of the log to use.  Up to 23 characters.\n\n      The boundary specifications may be either fixed time-date values, e.g.\"16:00:12:90-2021/02/12\" (see “Time-Date Values” in the (E)JES Reference) or calculated relative to the time stamp associated with the record shown at 57 lines from the bottom of the log at start-up.\n\n      A relative value is indicated by the presence of a next (+) or previous preceding the boundary specification, e.g., prev1h. After the next or previous you may specify either a number of seconds, minutes, hours, or days as indicated by using a 's', 'm', 'h', or 'd' suffix. Assumes 'h' if omitted.\n\n      Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            allowableValues: { values: ["^(\\+|next|prev)*(\\d+[smhd]{0,1})$|^(?:(\\d\\d\\:\\d\\d(?:\\:\\d\\d){0,2}(?:-(?:(?:\\d{4}[.-]\\d{3})|(?:\\d{4}(?:[\\/|-]\\d{2}){2})|(?:(?:\\d{2}[\\/|-]){2}\\d{4})))*){0,1}|\\?)$"], caseSensitive: false },
            group: XSELECT_OPTIONS
        }, {
            name: "mpf-exit-flags",
            aliases: ["mpfExitFlags", "mpf"],
            description: "Filter OPERLOG for MPF/Exit flags with a \"value mask\" of eight hexadecimal characters, e.g., 00000291. Use in conjunction with the \"result directive\" (see --result-directive).\n\n      The filtering is performed by ANDing the hexadecimal value mask against a message’s MPF/Exit Flags value and then displaying the message based upon the result directive (zero or non-zero).  For example, a mask and result directive of 00000001 and NZ will display messages that were suppressed by MPF. Specifying 00000001 and Z displays messages that were not suppressed.\n\n      Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            defaultValue: ["FFFFFFFF"],
            allowableValues: { values: ["^[0-9A-F]{8}$", "^[0-9a-f]{8}$"] },
            group: XSELECT_OPTIONS
        }, {
            name: "result-directive",
            aliases: ["resultDirective", "rd"],
            description: "Provide the result directive for the --mpf-exit-flags option (see the option for more information).  A mask and result directive of 00000001 and NZ will display messages that were suppressed by MPF.  A mask and result directive of 00000001 and Z displays messages that were not suppressed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            defaultValue: ["NZ"],
            allowableValues: { values: ["NZ", "Z"], caseSensitive: false },
            group: XSELECT_OPTIONS
        }, {
            name: "logsys",
            aliases: ["l"],
            description: "Specify a syslog to display by specifying the MVS name of a system in a JES2 environment.  The current system is browsed by default.",
            type: "string",
            group: LOG_OPTIONS
        }, {
            name: "syslog",
            aliases: ["sys"],
            description: "Display the SYSLOG instead of the default log.",
            type: "boolean",
            defaultValue: false,
            group: LOG_OPTIONS
        }, {
            name: "operlog",
            aliases: ["oper"],
            description: "Display the OPERLOG instead of the default log.",
            type: "boolean",
            defaultValue: false,
            group: LOG_OPTIONS
        }, {
            name: "jes2",
            aliases: ["2"],
            description: "Use the JES2 spooler instead of the default spooler.",
            type: "boolean",
            defaultValue: false,
            group: SUBSYSTEM_OPTIONS
        }, {
            name: "jes3",
            aliases: ["3"],
            description: "Use the JES3 or JES3plus spooler instead of the default spooler.",
            type: "boolean",
            defaultValue: false,
            group: SUBSYSTEM_OPTIONS
        }, {
            name: "subsystem",
            aliases: ["subsys", "ss"],
            description: "Specify the JES spooler system to use instead of the default spooler.",
            type: "string",
            group: SUBSYSTEM_OPTIONS
        }
    ],
    examples: [
        {
            description: "Get 10 lines at the tail of the log." +
                "\n\n  Example",
            options: ""
        }, {
            description: "Get 40 lines at head of the log with no header or trailer lines." +
                "\n\n  Example",
            options: "--line -n 40 -q"
        }, {
            description: "Stream the tail of the log until you press CTRL+C." +
                "\n\n  Example",
            options: "--follow"
        }, {
            description: "Match and highlight user logons." +
                "\n\n  Example",
            options: "--match \"/[Ll]ogo.{1,2}|force|Signoff/g\""
        }, {
            description: "Find beginning of IPL speed boost with highlighting." +
                "\n\n  Example",
            options: "--find \"'IPL speed boost is active' first\" --hilite"
        }, {
            description: "Filter for IPL recovery informational messages." +
                "\n\n  Example",
            options: "--msgId \"IEA681I\""
        }, {
            description: "Filter for audible alarm errors and warning messages with MCS console color emulation on." +
                "\n\n  Example",
            options: "--descriptorCodes \"1,2,11\" --mcs"
        }, {
            description: "Find all system messages that require action for the current day.  Uses --only to show only the found messages within period of 1 day.  Uses --limit to limit enumerating messages up to 1 day.  (The special characters |-@*+ can be indexed from column 54 in this reference: https://tinyurl.com/p84bs2nj)" +
                "\n\n  Example",
            options: "--find  \"'*' first 58 58\" --only 1d --top \"00:00\" --lines 1d"
        }, {
            description: "Same as previous example, but colorized." +
                "\n\n  Example",
            options: "--find  \"'*' first 58 58\" --only 1d --top \"00:00\" --lines 1d --mcs"
        }
    ]
};
//# sourceMappingURL=Stream.definition.js.map