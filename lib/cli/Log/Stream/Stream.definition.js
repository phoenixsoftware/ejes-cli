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
const XSELECT_OPTIONS = "OPERLOG Message Filtering Options";
// const FUNCTIONAL_OPTIONS = "Functional Options";
const CONSOLE_ANSI_OPTIONS = "ANSI Color Options";
const FIND_OPTIONS = "Find String and Position Options";
const SUBSYSTEM_OPTIONS = "JES-type Options";
const LOG_OPTIONS = "Log Options";
const POSITIONING_OPTIONS = "Positioning Options";
const OFFSET_OPTIONS = "Positioning Offset Options";
exports.StreamDefinition = {
    name: "stream",
    summary: "- Tail or stream operlog or syslog to stdout.",
    description: "Outputs the operations log or system log to stdout.  Behaves like a Linux tail function with support for standard tail options --follow (-f), --lines (-n), -q, -v, and --version.\n\n      Set the position in the log to begin output using --find, --line, --time, and --offset.  \n\n      Use OPERLOG Message Filtering Options to create a windowed log by filtering for and outputting only lines that fit criteria, e.g., fetch only lines associated with an IAT6xxxx message by specifying: --msgId \"IAT6*\".  After filtering the log, output is positioned at the bottom.  Use position options to change that.\n\n      Turn on highlighting for --find using --hilite.  Perform regex text matching with highlighting using --match.  Enable MCS console color emulation with --mcs.  To prevent ANSI escape characters from being output and to instead use accessibility-friendly text-only indicators, specify: --nocolor \"on\".\n\n      The order of host commands issued during initialization are fixed in this program in this order:\n\n1. All OPERLOG message filtering options, e.g., --msgId and --msgTxt \n\n2. --line \n\n3. --time \n\n4. --find \n\n5. --offset  \n\n      Conceptually and depending on specified options, the program can create a window into the log data using message filtering options, then can point to a line in the data such as the first line, then can position at a time, then find arbitrary text, then offset the view up and down by seconds to days or a number of lines.\n\n      The program outputs trailer diagnostic lines at the end of the run to stderr.  Use this information to make your queries more efficient.  The trailer and header lines can be muted using the --quiet (-q) option or setting the EJES_LOG_CLI_QUIET environment variable.  The program outputs a bottom-of-data line to stdout that is considered an output line by --lines with a line-count argument.  To disable it, set the EJES_LOG_CLI_NO_BOTTOM environment variable.",
    type: "command",
    handler: path.join(__dirname, "Stream.handler"),
    positionals: [
        {
            name: "log-type",
            type: "string",
            description: "Optional. If not specified, the Operations Log is output if the Operations Log is active for the current MVS system.  Otherwise, the System Log is output.",
            regex: "operlog|oper|o|syslog|sys|s",
        }
    ],
    options: [
        {
            name: "follow",
            aliases: ["f", "nonstop", "ns"],
            description: "Follow the log stream.  Displays last page of log then waits for more data.  Ignored for --response-format-json.  The actual maximum duration is controlled by your host refresh command settings.",
            type: "boolean"
        }, {
            name: "lines",
            description: "Limit output to a number of lines or a time span.  10 lines is used if the option is not specified.\n\n      Specify a maximum number of lines up to 999,999 lines (supports multipliers), or specify a time span of 0.01 to 999 seconds, minutes, hours, or days by specifying a number followed by \"s\", \"m\", \"h\", or \"d\".  Specify  \"all\" for unlimited output.\n\n      When --request-format-json (--rfj) is specified, the number of lines up to 5,000 specified on this option (or the default of 10) determines the number of lines fetched from the host and stored in the output json data array.  With --rfj, this option overrides --enumValue.\n\n      Supports Linux positioning syntax of + followed by a line number.  This is the same as specifying --line n --lines all.  When the intent is to fetch middle lines from the log, use --line to position and --lines to limit the count.\n\n      Note: When there are no positioning requests, the program attempts to get the bottom n lines.  However, the log is a dynamic data set and the actual log type may be different than assumed.  The bottom-of-data line will output only if the number of lines is not exceeded when bottom is found.",
            type: "array",
            aliases: ["n"],
            allowableValues: { values: ["all", "^(?:[1-9]|\\d\\.)\\d{0,2}[smhd]$", "^[1-9]\\d{0,5}$", "^\\+[1-9]\\d*$", "^[1-9]\\d{0,2}(b|kB|K|MB|M|GB|G|KiB|MiB|GiB)$"], caseSensitive: true },
            conflictsWith: ["bytes"],
        }, {
            name: "bytes",
            aliases: ["c"],
            description: "Byte level output counts supported only for syntax checking.  Use --lines or filter with a TAIL terminal command instead.",
            allowableValues: { values: ["^\\+[1-9]\\d*$"], caseSensitive: true },
            type: "string"
        }, {
            name: "quiet",
            aliases: ["q", "silent"],
            description: "Do not display header or trailer lines.  Set the environment variable EJES_LOG_CLI_QUIET to make this the default.  Set EJES_LOG_CLI_NO_BOTTOM to prevent displaying the bottom of data line.",
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
            description: "Limit the number of normally unlimited host requests.  Only host requests for data, additional data, or find next data count as a request.",
            numericValueRange: [1, 99999],
            type: "number"
        }, {
            name: "mcs",
            aliases: ["mcsConsoleColor", "mcs-console-color"],
            description: "Use ANSI escape characters to emulate the color and extended highlighting attributes in OPERLOG output to resemble the formatting on an MCS operator console.  If --no-color on is specified, textual attributes will be prefixed instead.  The MVS \"DISPLAY MPF\" command displays the message assignments color attributes in use on your host system.",
            type: "boolean",
            group: CONSOLE_ANSI_OPTIONS
        }, {
            name: "match",
            aliases: ["matchText", "match-text", "mt", "m"],
            description: "Specify case-independent text to match and highlight using ANSI escape characters.\n\n      Specify a string, a Javascript regex pattern without the enclosing slashes (e.g., \"login|logoff|force\"), or a Javascript regex pattern string with slashes and regex option flags (e.g., \"/[Ll]ogo.{1,2}|Signoff/g\").  If the first or second type is used, the flags default to ig (ignore-case and global match).\n\n      Matching does not position for output the way --find does; it can be used in conjuction with a --find.  Matching is done on each output line separately.  All matches in a line will be highlighted.  If --no-color on is specified, the line will be prefixed with \">\".  If the built-in highlight attribute isn't visible on your terminal, either change the foreground color or set the environment variable EJES_LOG_CLI_ANSIMATCHATTR.  0 to 256 are valid as defined on this Wikipedia page:\n\n      <https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit>",
            type: "string",
            group: CONSOLE_ANSI_OPTIONS
        }, {
            name: "find",
            description: "Position start of output using (E)JES host FIND command syntax (below).  Find positioning is done after --line and --time, but before --offset.  Limit lines to found lines with --only.  Limit excessive enumeration and provide context with --context.\n\n      NOTE: To search for specific message IDs or find text in messages on the OPERLOG, use --msgId or --msgText instead.  OPERLOG message filtering Options show entire messages and may be more efficient.  Since these options position at the bottom of the log, specify --line to position at the first message or specify --find to find further refine your search.  Refer to OPERLOG Message Filtering Options for further alternatives to FIND.\n\n      (E)JES Host FIND Command Syntax:  Only the find-string is required.  It should be enclosed in single quotes if it contains spaces or special characters.  Case-independent search is the default.  Case dependent is specified using c'find-string'. Searching for double-quotes is not supported.  (The search-type arguments \"next\" and \"prev\" carry over  3270 display behavior.  In this program, \"prev\" means find the last occurrence above the last 53 lines of the log; the default \"next\" searches forward starting 53 lines before the bottom.)  Refer to the (E)JES Reference for the FIND command for detailed find syntax and option documention.\n\n      ['|c'|p'|x']find-string['] [NEXT|prev|first|last] [CHARS|prefix|pre|suffix|suf|word] [startcol[ endcol]]",
            type: "string",
            stringLengthRange: [1, 80],
            allowableValues: { values: ["^((?:c|p|x|)'.+'(?:c|p|x|)|[^'\\s]+)(?:(?:\\s+(first|last|next|prev|all)){0,1}(?:(?:\\s+(chars|pre|prefix|suf|suffix|word)){0,1}(?:\\s+(\\d*\\s+\\d*|\\d*)){0,2}){0,1}){0,1}$"], caseSensitive: false },
            group: FIND_OPTIONS
        }, {
            name: "hilite",
            aliases: ["highlight-find-text", "highlight", "ht"],
            description: "Use in conjunction with --find to highlight found strings using ANSI escape characters.  If --no-color on is specified, the line will be prefixed with \"=\".\n\n      If the built-in highlight attribute isn't visible on your terminal, either change the foreground color or set the environment variable EJES_LOG_CLI_ANSIFINDATTR to 8, 6, or 3.  0 to 256 are valid as defined on this Wikipedia page:\n\n      <https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit>",
            type: "array",
            impliesOneOf: ["find"],
            group: FIND_OPTIONS
        }, {
            name: "only",
            description: "Output only lines marked by the host as found using the --find option.  The --context option modifies this option by also outputing context lines following the found lines.  Some OPERLOG message filtering options (e.g., --msgId and --msgTxt) may provide better results and will be more efficient and faster.",
            type: "boolean",
            aliases: ["o"],
            impliesOneOf: ["find"],
            group: FIND_OPTIONS
        }, {
            name: "context",
            aliases: ["cx"],
            description: "Specify 2 to 49 lines of context after the found line when --only is specified.  5 is used if an argument is not specified.  To display only found lines, do not specify --context.",
            type: "array",
            implies: ["only"],
            allowableValues: { values: ["s", "sep", "separator", "^[1-4]\\d*$|^[2-9]$"], caseSensitive: false },
            group: FIND_OPTIONS
        }, {
            name: "line",
            description: "Position at a specific line in the log.  With no argument, it positions to top of the displayable log (like the TOP command).  Positioning done before --time, --find, and --offset.",
            type: "array",
            allowableValues: { values: ["first", "last", "^[1-9]\\d*$"], caseSensitive: false },
            group: POSITIONING_OPTIONS
        }, {
            name: "head",
            description: "Position at top of log same as --line without an argument.  Positioning done before --time, --find, and --offset.",
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
            description: "Offset positioning by time or line count after the final position arrived at by message filtering, --line, --time, and --find.  Optional directional indicators are next or + (later in log) or prev (earlier).  If the directional indicator is omitted, earlier in the log is assumed.  Valid trailing time indicators are s, m, h, or d.  A number without a time indicator assumes h on OPERLOG, but on SYSLOG positions by adding to the current data set number (if 0, it positions at the top of the current data set).  The l indicator is a line count indicator.  Specify this to offset by n lines.  Without an argument, prev4l is assumed, which is helpful when specifying --find to provide context even when -n 10 (the default) is specified.",
            type: "array",
            conflictsWith: ["only"],
            allowableValues: { values: ["^(\\+|next|prev)*(\\d+[smhdl]{0,1})$"], caseSensitive: false },
            group: OFFSET_OPTIONS
        }, {
            name: "system-name",
            aliases: ["systemName", "sysname", "sn"],
            description: "Filter for up to 4 provided system name(s).  Multiline messages are output in their entirety.  Generic (*) and placeholder (%) mask characters allowed.  Note: The response time of the OPERLOG browser can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "job-name",
            aliases: ["jobName", "jname", "j"],
            description: "Filter OPERLOG for up to 4 provided job names.  Multiline messages are output in their entirety.  Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "job-id",
            aliases: ["jobId", "jid"],
            description: "Filter OPERLOG for up to 4 provided job ids, e.g, J0632369.  Multiline messages are output in their entirety.  Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "console",
            aliases: ["con"],
            description: "Filter OPERLOG for up to 4 provided consoles.  Multiline messages are output in their entirety.  Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "message-id",
            aliases: ["messageId", "msgId", "mi"],
            description: "Filter OPERLOG for up to 3 provided message ids of up to 12 characters.   Multiline messages are output in their entirety.  Generic (*) and placeholder (%) mask characters allowed.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "message-text",
            aliases: ["messageText", "msgText", "msgTxt", "mtxt", "mx"],
            description: "Filter OPERLOG for message text of up to 34 characters.  Multiline messages are output in their entirety.  Generic (*) and placeholder (%) mask characters allowed.  To filter for strings inside a message's text, use generic characters, e.g., \"*logon*\".  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            group: XSELECT_OPTIONS
        }, {
            name: "routing-codes",
            aliases: ["routingCodes", "routing", "r"],
            description: "Filter OPERLOG for routing codes.  Up to 34 characters that may be ALL, NONE, or a list of decimal routing codes or ranges. For example: 1,3,6-9,100-128.  Multiline messages are output in their entirety.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            defaultValue: ["ALL"],
            group: XSELECT_OPTIONS
        }, {
            name: "descriptor-codes",
            aliases: ["descriptorCodes", "descriptor", "dc"],
            description: "Filter OPERLOG for descriptor codes.  Up to 34 characters that may be ALL, NONE, or a list of decimal descriptor codes or ranges. For example: 1,3,6-9.  Multiline messages are output in their entirety.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
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
            description: "Filter OPERLOG for MPF/Exit flags with a \"value mask\" of eight hexadecimal characters, e.g., 00000291. Use in conjunction with the \"result directive\" (see --result-directive).\n\n      The filtering is performed by ANDing the hexadecimal value mask against a message’s MPF/Exit Flags value and then displaying the message based upon the result directive (zero or non-zero).  For example, a mask and result directive of 00000001 and NZ will display messages that were suppressed by MPF. Specifying 00000001 and Z displays messages that were not suppressed.\n\n      Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.  Multiline messages are output in their entirety.  ",
            type: "array",
            defaultValue: ["FFFFFFFF"],
            allowableValues: { values: ["^[0-9A-F]{8}$", "^[0-9a-f]{8}$"] },
            group: XSELECT_OPTIONS
        }, {
            name: "result-directive",
            aliases: ["resultDirective", "rd"],
            description: "Provide the result directive for the --mpf-exit-flags option (see the option for more information).  A mask and result directive of 00000001 and NZ will display messages that were suppressed by MPF.  A mask and result directive of 00000001 and Z displays messages that were not suppressed.  Multiline messages are output in their entirety.  Note: The response time can be seriously impacted by the use of filtering criteria that results in too few messages being considered for display.",
            type: "array",
            defaultValue: ["NZ"],
            allowableValues: { values: ["NZ", "Z", "EQ", "NE"], caseSensitive: false },
            group: XSELECT_OPTIONS
        }, {
            name: "logsys",
            aliases: ["l"],
            description: "Specify a syslog to display by specifying the MVS name of a system in a JES2 environment.  The current system is browsed if --logsys is not specified.",
            type: "string",
            group: LOG_OPTIONS
        }, {
            name: "syslog",
            aliases: ["sys"],
            description: "Display the SYSLOG instead of the default log.  Deprecated.  Use the positional parameter instead.",
            type: "boolean",
            defaultValue: false,
            group: LOG_OPTIONS
        }, {
            name: "operlog",
            aliases: ["oper"],
            description: "Display the OPERLOG instead of the default log.  Deprecated.  Use the positional parameter instead.",
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
            description: "Specify the JES spooler system to use instead of the default spooler.",
            type: "string",
            group: SUBSYSTEM_OPTIONS
        }
    ],
    examples: [
        {
            description: "Output 10 lines at the tail of the log",
            options: ""
        }, {
            description: "Output 40 lines at head of the log with no header or trailer lines.  The -n option is an alias for --lines and  -q  is an alias for --quiet",
            options: "--head -n 40 -q"
        }, {
            description: "Stream the tail of the default log defined for your credentials until you press CTRL+C.  The -f option is an alias for --follow",
            options: "--follow"
        }, {
            description: "Stream the tail of the syslog",
            options: "syslog --follow"
        }, {
            description: "Stream the tail of the operlog",
            options: "operlog --follow"
        }, {
            description: "Match and highlight user logons in output lines.  (NOTE: This does not position to the string; it *only* highlights them *if* they are in the output.)  Match can also work with a simple string, or a regex string with no forward slash characters, implying the \"ig\" flags (ignore-case and global-match)",
            options: "--match \"/[Ll]ogo.{1,2}|force|Signoff/g\""
        }, {
            description: "Match and mark user logons without ANSI color escape sequences.  The --nc option is an alias for --no-color",
            options: "--match \"/[Ll]ogo.{1,2}|force|Signoff/g\" --nc on"
        }, {
            description: "Find your logon Id in the log",
            options: "--find yourLogonId"
        }, {
            description: "Find your logon Id in the log and highlight the found text",
            options: "--hilite --find yourLogonId"
        }, {
            description: "Find your logon id in the log with a few lines above it for context.  The --offset option is down 4 lines (prev4l) if the argument is not specified",
            options: "--find yourLogonId --offset"
        }, {
            description: "Find your TSO logons and logoffs for today by specifying you logon id followed by \"- log\" in the log.  Note that if the find string includes spaces or special characters, you need to enclose it in single-quotes.  Find without a find without a search type uses NEXT, searching forward from a position.  Using the --time option without an argument positions to the start of the current day before finding.   Without the --time option, the default position is 53 lines from the bottom.  (NOTE: The space after the trailing apostrophe and before the double quote is a work-around for a zowe parsing issue.)",
            options: "--find \"'yourLogonId - log' \" --time"
        }, {
            description: "Find your unix home directory in the log.  Note that if find string is case sensitive, you need to enclose it in single-quotes prefixed with the letter c, e.g., c'String'",
            options: "--find \"c'DSN=/u/userName' last\""
        }, {
            description: "Find beginning of speed boost with highlighting",
            options: "--find \"'speed boost is active' first\" --hilite"
        }, {
            description: "Find beginning of speed boost but mark found lines without ANSI color escape sequences.  The --ht option is an alias for --hilite and --nc is an alias for --no-color",
            options: "--find \"'speed boost is active' first\" --ht --nc on"
        }, {
            description: "Find all speed boost messages with highlighting and only output found lines",
            options: "--find \"'speed boost is active' first\" --ht --only -n all"
        }, {
            description: "Find all speed boost messages with highlighting and output five lines of context (the default)",
            options: "--find \"'speed boost is active' first\" --ht --only --context -n all"
        }, {
            description: "Filter for IPL and boost informational messages that appear in the IEA681I message.  The message can include generic characters to specify classes or subclasses of messages.  The entire multiline message is output if the message is multiline.  Other OPERLOG filtering options can be found under Message Filters Options",
            options: "--msgId \"IEA681I\""
        }, {
            description: "Filter for all informational IEA messages.  The % character is a placeholder that matches any character.  The entire multiline message is output if the message is multiline.  Other OPERLOG filtering options can be found under Message Filters Options",
            options: "--msgId \"IEA%%%I\""
        }, {
            description: "Filter for \"boost\" in the text of any message.  Note the use of the generic character * that matches any number of characters before or after the string.  These are necessary for this type of search.  The entire multiline message is output if the message is multiline.  Other OPERLOG filtering options can be found under Message Filters Options",
            options: "--msgTxt \"*boost*\""
        }, {
            description: "Filter using descriptor codes for audible alarm errors and warning messages with MCS console color emulation on.  The program will beep.The option --dc is an alias for --descriptorCodes.  OPERLOG filtering options can be found under Message Filt          ers Options",
            options: "--descriptorCodes \"1,2,11\" --mcs"
        }, {
            description: "Find all system messages that required action for the hour after midnight.  Specifying --only shows just found lines.  Specifying --lines with \"1h\" tells the program to output lines up to one hour from the first line output. The --top option here specifies a time without a date, which means the current day.  This logically sets the top of the log, windowing it, to midnight today (with no lines above it).  Specifying --find with the first verb tells to search from the top.  The character in the find string has a special meaning  indicating that a message requires action.  The special characters \"|\", \"-\", \"@\", \" \* \", and \"+\" can be indexed from column 54 and \" \* \" is a column 4 character, thus 58 below.\n\n      <https://www.ibm.com/docs/en/zos/2.4.0?topic=consoles-special-screen-characters>",
            options: "--find  \"'*' first 58 58\" --only --top \"00:00\"  --lines 1h"
        }, {
            description: "Same result as previous example but with different options and colorized to emulate an MCS color console.  Specifying --time without an argument positions at the beginning of the current day.  The difference from above is that --top sets the first line of the log the program sees and positions at the bottom.  The --time option positions before --find runs.  No directional argument is specified on the --find option so it runs starting as positioned by the --time option.",
            options: "--find  \"'*' 58 58\" --only --time --lines 1h --mcs"
        }, {
            description: "Stream the tail of the log until you press CTRL+C.  The -f option is an alias for --follow",
            options: "--follow"
        }
    ]
};
//# sourceMappingURL=Stream.definition.js.map