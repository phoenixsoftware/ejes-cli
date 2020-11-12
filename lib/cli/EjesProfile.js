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
exports.EjesProfile = void 0;
const imperative_1 = require("@zowe/imperative");
// import { IEjes } from "../api/Doc/IEjes";
/**
 * Utility Methods for EJES CLI
 * @export
 */
let EjesProfile = /** @class */ (() => {
    class EjesProfile extends imperative_1.Session {
    }
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
        description: "Accessibility option: Specify the name of a color scheme.  User scheme files may also be created and specified to provide better contrast or to favor easier to see colors.  For a how-to, use \"zowe ejes emulate batch --helpApp scheme-info\"\n\nAllowed values: dark, light, powershell, nono, none, user-scheme-file, list, help",
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
        name: "timer-interval",
        aliases: ["timeint", "ti"],
        description: "Number of milliseconds between (E)JES API calls in log stream command.",
        type: "number",
        defaultValue: 2000,
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
        aliases: ["dbg"],
        description: "Invoke debugging code.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };
    EjesProfile.EJES_OPTION_JES2 = {
        name: "jes2",
        aliases: ["2"],
        description: "Use the JES2 spooler instead of the default spooler.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };
    EjesProfile.EJES_OPTION_JES3 = {
        name: "jes3",
        aliases: ["3"],
        description: "Use the JES3 or JES3plus spooler instead of the default spooler.",
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
        EjesProfile.EJES_OPTION_NO_COLOR
    ];
    /**
     * Options related to the (E)JES CLI
     * These options can be filled in if the user creates a profile
     */
    EjesProfile.EJES_RM_RUNTIME_OPTIONS = [
        EjesProfile.EJES_OPTION_ENUMERATION_VALUE,
        EjesProfile.EJES_OPTION_TIMER_INTERVAL,
        EjesProfile.EJES_OPTION_DEBUG,
        EjesProfile.EJES_OPTION_JES2,
        EjesProfile.EJES_OPTION_JES3
    ];
    /**
     * Options related to the (E)JES CLI
     * These options can be filled in if the user creates a profile
     */
    EjesProfile.EJES_GLOBAL_OPTIONS = [
        EjesProfile.EJES_OPTION_HELP_APP
    ];
    return EjesProfile;
})();
exports.EjesProfile = EjesProfile;
//# sourceMappingURL=EjesProfile.js.map