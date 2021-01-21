/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

import { ICommandArguments, ICommandOptionDefinition, IProfile, Logger,
    Session, ISession, IHandlerParameters, IHandlerResponseConsoleApi } from "@zowe/imperative";
// import { IEjes } from "../api/Doc/IEjes";

/**
 * Utility Methods for EJES CLI
 * @export
 */
export class EjesProfile extends Session {

    public static EJES_CONNECTION_OPTION_GROUP = "EJES Connection Options";
    public static EJES_RUNTIME_OPTION_GROUP    = "EJES CLI Runtime Options";
    public static GLOBAL_OPTIONS    = "Global Options";

    /**
     * Option used in profile creation and commands for protocol for (E)JES
     */
    public static EJES_OPTION_PROTOCOL: ICommandOptionDefinition = {
        name: "protocol",
        aliases: ["prot"],
        description: "Protocol used to access (E)JES server.",
        type: "string",
        defaultValue: "https",
        group: EjesProfile.EJES_CONNECTION_OPTION_GROUP,
        allowableValues: { values: [ "http", "https", "list", "help" ], caseSensitive: false },
    };

    /**
     * Option used in profile creation and commands for hostname for (E)JES
     */
    public static EJES_OPTION_HOST: ICommandOptionDefinition = {
        name: "host",
        description: "The (E)JES server host name.",
        type: "string",
        required: true,
        group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for (E)JES
     */
    public static EJES_OPTION_PORT: ICommandOptionDefinition = {
        name: "port",
        description: "The (E)JES server port.",
        type: "number",
        defaultValue: 443,
        group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for username / ID  for (E)JES
     */
    public static EJES_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        description: "Mainframe (E)JES user name, which can be the same as your TSO login.",
        type: "string",
        required: true,
        group: EjesProfile.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for password/passphrase for (E)JES
     */
    public static EJES_OPTION_PASSWORD: ICommandOptionDefinition = {
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
    public static EJES_OPTION_REJECT_UNAUTHORIZED: ICommandOptionDefinition = {
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
    public static EJES_OPTION_BASE_PATH: ICommandOptionDefinition = {
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
    public static EJES_OPTION_COLOR_SCHEME: ICommandOptionDefinition = {
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
    public static EJES_OPTION_NO_COLOR: ICommandOptionDefinition = {
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
    public static EJES_OPTION_TIMER_INTERVAL: ICommandOptionDefinition = {
        name: "timer-interval",
        aliases: ["timeint", "ti"],
        description: "Number of milliseconds between (E)JES API calls in log stream command.",
        type: "number",
        defaultValue: 2000,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_ENUMERATION_VALUE: ICommandOptionDefinition = {
            name: "enum-value",
            aliases: ["enumval", "ev"],
            description: "Number of lines to retreieve per (E)JES API call in log stream command.",
            type: "number",
            defaultValue: 200,
            group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
        };

    public static EJES_OPTION_DEBUG: ICommandOptionDefinition = {
            name: "debug",
            aliases: ["dbg", "dv", "d"],
            description: "Invoke debugging code with additive flags.  1=request, 2=response, 4=maximumize response, 8=housekeeping, 16=show block/record id, 32=fetching, 64=output.",
            type: "number",
            defaultValue: 0,
            group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_JES2: ICommandOptionDefinition = {
        name: "jes2",
        aliases: ["2"],
        description: "Use the JES2 spooler instead of the default spooler.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_JES3: ICommandOptionDefinition = {
        name: "jes3",
        aliases: ["3"],
        description: "Use the JES3 or JES3plus spooler instead of the default spooler.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_SYSLOG: ICommandOptionDefinition = {
        name: "syslog",
        aliases: ["sys"],
        description: "Display the SYSLOG instead of the default log.  No support for --nonstop or --enumeration in V0.3.1.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_OPERLOG: ICommandOptionDefinition = {
        name: "operlog",
        aliases: ["oper"],
        description: "Display the OPERLOG instead of the default log.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_HELP_APP: ICommandOptionDefinition = {
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
    public static EJES_RM_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
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
    public static EJES_RM_RUNTIME_OPTIONS: ICommandOptionDefinition[] = [
        EjesProfile.EJES_OPTION_ENUMERATION_VALUE,
        EjesProfile.EJES_OPTION_TIMER_INTERVAL,
        EjesProfile.EJES_OPTION_DEBUG,
        EjesProfile.EJES_OPTION_JES2,
        EjesProfile.EJES_OPTION_JES3,
        EjesProfile.EJES_OPTION_OPERLOG,
        EjesProfile.EJES_OPTION_SYSLOG,
    ];
    /**
     * Options related to the (E)JES CLI
     * These options can be filled in if the user creates a profile
     */
    public static EJES_GLOBAL_OPTIONS: ICommandOptionDefinition[] = [
        EjesProfile.EJES_OPTION_HELP_APP
    ];
}
