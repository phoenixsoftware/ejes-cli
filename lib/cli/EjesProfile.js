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
exports.EjesProfile = void 0;
const imperative_1 = require("@zowe/imperative");
// import { EjesSession } from "./EjesSession";
// import { Ejes } from "../api/Ejes";
// import { IEjes } from "../api/Doc/IEjes";
/**
 * Utility Methods for EJES CLI
 * @export
 */
class EjesProfile extends imperative_1.Session {
}
exports.EjesProfile = EjesProfile;
EjesProfile.EJES_CONNECTION_OPTION_GROUP = "EJES Connection Options";
EjesProfile.EJES_RUNTIME_OPTION_GROUP = "EJES CLI Runtime Options";
EjesProfile.GLOBAL_OPTIONS = "Global Options";
/**
 * Option used in profile creation and commands for protocol for (E)JES
 */
EjesProfile.EJES_OPTION_PROTOCOL = {
    name: "protocol",
    aliases: ["prot"],
    description: "Protocol used to access (E)JES server.",
    type: "string",
    defaultValue: "https",
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP,
    allowableValues: { values: ["http", "https", "list", "help"], caseSensitive: false },
};
/**
 * Option used in profile creation and commands for hostname for (E)JES
 */
EjesProfile.EJES_OPTION_HOST = {
    name: "host",
    description: "The (E)JES server host name.",
    type: "string",
    required: true,
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
};
/**
 * Option used in profile creation and commands for port for (E)JES
 */
EjesProfile.EJES_OPTION_PORT = {
    name: "port",
    description: "The (E)JES server port.",
    type: "number",
    defaultValue: 443,
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
};
/**
 * Option used in profile creation and commands for username / ID  for (E)JES
 */
EjesProfile.EJES_OPTION_USER = {
    name: "user",
    description: "Mainframe (E)JES user name, which can be the same as your TSO login.",
    type: "string",
    required: true,
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
};
/**
 * Option used in profile creation and commands for password/passphrase for (E)JES
 */
EjesProfile.EJES_OPTION_PASSWORD = {
    name: "password",
    aliases: ["pass", "pw"],
    description: "Mainframe (E)JES password, which can be the same as your TSO password.",
    type: "string",
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP,
    required: true
};
/**
 * Option used in profile creation and commands for rejectUnauthorized setting for connecting to (E)JES
 */
EjesProfile.EJES_OPTION_REJECT_UNAUTHORIZED = {
    name: "reject-unauthorized",
    aliases: ["rejectunauthorized", "ru"],
    description: "Reject self-signed certificates.",
    type: "boolean",
    defaultValue: true,
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
};
/**
 * Option used in profile creation and commands for base path setting for connecting to (E)JES
 */
EjesProfile.EJES_OPTION_BASE_PATH = {
    name: "base-path",
    aliases: ["basepath", "bp"],
    description: "The base path for your API mediation layer instance." +
        " Specify this option to prepend the base path to all (E)JES resources when making REST requests.",
    type: "string",
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
};
/**
 * Option used in profile creation and commands for CLI run-time configuration.
 */
EjesProfile.EJES_OPTION_COLOR_SCHEME = {
    name: "color-scheme",
    aliases: ["scheme", "cs"],
    description: "Accessibility option: Specify the name of a color scheme.  User scheme files may also be created and specified to provide better contrast or to favor easier to see colors.  For a how-to, use \"zowe ejes emulate batch --helpApp scheme-info\".  Zowe ejes log stream ignores this option as it outputs plain text by default, only colorizing when ANSI color options are specified.\n\nAllowed values: dark, light, powershell, nono, none, user-scheme-file, list, help",
    type: "string",
    defaultValue: "dark",
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
};
/**
 * Option used in profile creation and commands for CLI run-time configuration.
 */
EjesProfile.EJES_OPTION_NO_COLOR = {
    name: "no-color",
    aliases: ["nocolor", "nc"],
    description: "Accessibility option: Specify to prevent colorization of the CLI.  Same effect as defining NO_COLOR or FORCE_COLOR=0.",
    type: "string",
    //        defaultValue: "off",
    group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
};
/**
 * Option used in profile creation and commands for CLI run-time configuration.
 */
EjesProfile.EJES_OPTION_TIMER_INTERVAL = {
    name: "refresh-interval",
    aliases: ["refreshInterval", "refresh", "ri", "sleep-interval", "sleep", "s"],
    description: "Number of seconds between (E)JES API calls in log stream command.  The actual minimum and maximum interval is controlled by your host refresh command settings.",
    type: "number",
    defaultValue: 5,
    numericValueRange: [1, 100],
    group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
};
EjesProfile.EJES_OPTION_ENUMERATION_VALUE = {
    name: "enum-value",
    aliases: ["enumval", "ev"],
    description: "Number of lines to retreieve per (E)JES API call in log stream command.",
    type: "number",
    defaultValue: 200,
    group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
};
EjesProfile.EJES_OPTION_DEBUG = {
    name: "debug",
    aliases: ["dbg", "dv", "d"],
    description: "Invoke debugging code with additive flags.  1=request, 2=minimum response, 4=full response, 8=housekeeping, 16=show record info, 32=show notifications, 64=show fetch metadata.",
    type: "number",
    defaultValue: 0,
    group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
};
EjesProfile.EJES_OPTION_DETAILED_JSON = {
    name: "detailed-json",
    aliases: ["detailedjson", "detail", "dj"],
    description: "Include metadata objects and arrays in --rfj output, not just an array of lines.",
    type: "boolean",
    defaultValue: false,
    group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
};
EjesProfile.EJES_OPTION_HELP_APP = {
    name: "helpApp",
    aliases: ["ha"],
    description: "Invoke extended application specific detailed help.",
    type: "array",
    //            defaultValue: "usage",
    group: EjesProfile.GLOBAL_OPTIONS
};
/**
 * Options related to the (E)JES CLI
 * These options can be filled in if the user creates a profile
 */
EjesProfile.EJES_RM_CONNECTION_OPTIONS = [
    EjesProfile.EJES_OPTION_PROTOCOL,
    EjesProfile.EJES_OPTION_HOST,
    EjesProfile.EJES_OPTION_PORT,
    EjesProfile.EJES_OPTION_USER,
    EjesProfile.EJES_OPTION_PASSWORD,
    EjesProfile.EJES_OPTION_REJECT_UNAUTHORIZED,
    EjesProfile.EJES_OPTION_BASE_PATH,
    EjesProfile.EJES_OPTION_COLOR_SCHEME,
    EjesProfile.EJES_OPTION_NO_COLOR,
];
/**
 * Options related to the (E)JES CLI
 * These options can be filled in if the user creates a profile
 */
EjesProfile.EJES_RM_RUNTIME_OPTIONS = [
    EjesProfile.EJES_OPTION_ENUMERATION_VALUE,
    EjesProfile.EJES_OPTION_TIMER_INTERVAL,
    EjesProfile.EJES_OPTION_DEBUG,
    EjesProfile.EJES_OPTION_DETAILED_JSON,
];
/**
 * Options related to the (E)JES CLI
 * These options can be filled in if the user creates a profile
 */
EjesProfile.EJES_GLOBAL_OPTIONS = [
    EjesProfile.EJES_OPTION_HELP_APP
];
//# sourceMappingURL=EjesProfile.js.map