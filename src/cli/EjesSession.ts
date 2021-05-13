/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

import { ICommandOptionDefinition, Session, ISession, IHandlerParameters, IHandlerResponseConsoleApi } from "@zowe/imperative";
import { Ejes } from "../api/Ejes";
import { EjesProfile } from "./EjesProfile";
import * as util from "util";

/**
 * Utility Methods for EJES CLI
 * NB: These definition are reflected in the help and presented option switches.
 * @export
 */
export class EjesSession extends Session {

    public static EJES_CONNECTION_OPTION_GROUP = "EJES Connection Options";
    public static EJES_RUNTIME_OPTION_GROUP    = "EJES CLI Runtime Options";

    /**
     * Option used in profile creation and commands for protocol for (E)JES
     */
    public static EJES_OPTION_PROTOCOL: ICommandOptionDefinition = {
        name: "protocol",
        aliases: ["prot"],
        description: "Protocol used to access (E)JES server.",
        type: "string",
        defaultValue: "https",
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP,
        allowableValues: { values: ["http", "https"], caseSensitive: false },
    };

    /**
     * Option used in profile creation and commands for hostname for (E)JES
     */
    public static EJES_OPTION_HOST: ICommandOptionDefinition = {
        name: "host",
        aliases: ["H"],
        description: "The (E)JES server host name.",
        type: "string",
        required: true,
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for port for (E)JES
     */
    public static EJES_OPTION_PORT: ICommandOptionDefinition = {
        name: "port",
        aliases: ["P"],
        description: "The (E)JES server port.",
        type: "number",
        defaultValue: 443,
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for username / ID  for (E)JES
     */
    public static EJES_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        aliases: ["U"],
        description: "Mainframe (E)JES user name, which can be the same as your TSO login.",
        type: "string",
        required: true,
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for password/passphrase for (E)JES
     */
    public static EJES_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        aliases: ["pass", "pw"],
        description: "Mainframe (E)JES password, which can be the same as your TSO password.",
        type: "string",
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP,
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
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for base path setting for connecting to (E)JES
     */
    public static EJES_OPTION_BASE_PATH: ICommandOptionDefinition = {
        name: "base-path",
        aliases: ["bp"],
        description: "The base path for your API mediation layer instance." +
            " Specify this option to prepend the base path to all (E)JES resources when making REST requests.",
        type: "string",
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP
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
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP
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
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP
    };

    /**
     * Option used in profile creation and commands for CLI run-time configuration.
     */
    public static EJES_OPTION_TIMER_INTERVAL: ICommandOptionDefinition = {
        name: "refresh-interval",
        aliases: ["refreshInterval", "refresh", "ri"],
        description: "Number of seconds between (E)JES API calls in log stream command.  The actual minimum and maximum interval is controlled by your host refresh command settings.",
        type: "number",
        defaultValue: 5,
        numericValueRange: [1, 100],
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_ENUMERATION_VALUE: ICommandOptionDefinition = {
        name: "enum-value",
        aliases: ["enumval", "ev"],
        description: "Number of lines to retreieve per (E)JES API call.  Overridden by the combination of --rfj and --line (-n).  See --line.",
        type: "number",
        defaultValue: 200,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_DEBUG: ICommandOptionDefinition = {
        name: "debug",
        aliases: ["dbg", "dv", "d"],
        description: "Invoke debugging code with additive flags.  1=request, 2=minimum response, 4=full response, 8=housekeeping, 16=show record info, 32=show fetch metadata.",
        type: "number",
        defaultValue: 0,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_DETAILED_JSON: ICommandOptionDefinition = {
        name: "detailed-json",
        aliases: ["detailedjson", "detail", "dj"],
        description: "Include metadata objects and arrays in --rfj output, not just an array of lines.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    /**
     * Options related to the (E)JES CLI
     * These options can be filled in if the user creates a profile
     */
    public static EJES_CLI_OPTIONS: ICommandOptionDefinition[] = [
        EjesSession.EJES_OPTION_PROTOCOL,
        EjesSession.EJES_OPTION_HOST,
        EjesSession.EJES_OPTION_PORT,
        EjesSession.EJES_OPTION_USER,
        EjesSession.EJES_OPTION_PASSWORD,
        EjesSession.EJES_OPTION_REJECT_UNAUTHORIZED,
        EjesSession.EJES_OPTION_BASE_PATH,
        EjesSession.EJES_OPTION_COLOR_SCHEME,
        EjesSession.EJES_OPTION_NO_COLOR,
        EjesSession.EJES_OPTION_ENUMERATION_VALUE,
        EjesSession.EJES_OPTION_TIMER_INTERVAL,
        EjesSession.EJES_OPTION_DEBUG,
        EjesSession.EJES_OPTION_DETAILED_JSON,
    ];


    public static EjesSessionFactory(params: IHandlerParameters): EjesSession {
        const profile = params.profiles.get("ejes");
        const session = new EjesSession({
            protocol: params.arguments.protocol,
            type: "token",
            tokenType: "EJES",
            hostname: params.arguments.host,
            port: params.arguments.port,
            basePath: params.arguments.basePath,
            user: params.arguments.user,
            password: params.arguments.password,
            rejectUnauthorized: params.arguments.rejectUnauthorized
        });
        session.params = params;
        session.logger = params.response.console;
        session.subsystem = params.arguments.subsystem ? params.arguments.subsystem.toUpperCase() : params.arguments.jes2 ? "JES2" : params.arguments.jes3 ? "JES3" : undefined;

        if ( params.arguments.debug & session.DEBUG_HOUSEKEEPING ) {
            const list = [];
            for (const key in params.arguments)
                if ( params.arguments.hasOwnProperty(key) && key !== "password" && key !== "pass" && key !== "pw" )
                    list.push((key + ": ").padEnd(21, " ") + util.inspect(params.arguments[key], true, 2, false));
            session.log("ZOWE PARAMETER LIST  Options not in list did not appear on the command line and are \"undefined\".  Passwords are stripped.");
            session.log("-------------------  ---------------");
            session.log("Option               Value");
            session.log("-------------------  ---------------");
            list.sort().forEach((item) => session.log(item));
        }

        return session;
    }

    public DEBUG_REQUEST = 1;
    public DEBUG_RESPONSE = 2;
    public DEBUG_RESPONSE_MAX = 4;
    public DEBUG_ANY_RESPONSE = 6;
    public DEBUG_HOUSEKEEPING = 8;
    public DEBUG_RECORD_INFO = 16;
    public DEBUG_NOTIFICATIONS = 32;
    public DEBUG_FETCH_METADATA = 64;

    public columns = 240;
    public rows = 63;
    public initialEnumeration = 53; // Will fetch all of the initial enumeration, which will be one screen's worth.
    public emptyEnumeration = 0;    // Fetch no lines.
    public resultEnumeratedDataExhausted = 4;
    public resultErrorCode = 8;
    public resultServiceFailureOrTeminateSuccess = 12;
    public reasonEndOfData = 1;
    public reasonMoreDataPossible = 0;
    public resultSuccessfulCompletion = 0;
    public subsystem = undefined;
    public errorOnTerm150 = 150;
    public errorOnExec151 = 151;
    public errorOnInit152 = 152;
    public errorRestApiFailure153 = 153; // Return code > 4.
    public errorDuringMatchProcessing154 = 154;
    public infoRefreshDurationExceeded155 = 155;


    private params: IHandlerParameters;
    private logger: IHandlerResponseConsoleApi;

    constructor(newSession: ISession) {
        super(newSession);
    }

    public log(msg: string) {
        this.logger.log(msg);
    }

    public error(msg: string) {
        this.logger.error(msg);
    }

    public debugLog(level: number, msg: string) {
        if ( this.params.arguments.debug & level ) {
            this.log(msg);
        }
    }

    public storeCookie(cookie: any) {
        this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  storeCookie has been invoked.");
        this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  ISession.tokenType: " + this.ISession.tokenType);

        const headerKeys: string[] = Object.keys(cookie);
        headerKeys.forEach((key) => {
            const auth = cookie[key] as string;
            const authArr = auth.split(";");
            this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  key: " + key + ", auth: " + auth);
            // see each field in the cookie, e/g. Path=/; Secure; HttpOnly; LtpaToken2=...
            authArr.forEach((element: string) => {
                this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  element: " + element + ",  tokenType: " + element.indexOf(this.ISession.tokenType));
                // if we match requested token type, save it off for its length
                if ( element.indexOf(this.ISession.tokenType) === 0 ) {
                    // parse off token value, minus LtpaToken2= (as an example)
                    const split = element.indexOf("=");
                    if ( split >= 0 ) {
                        this.ISession.tokenType  = element.substring(0, split);
                        this.ISession.tokenValue = element.substring(split + 1);
                    }
                    else
                        this.ISession.tokenValue = "";
                    this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  tokenType: " + this.ISession.tokenType + ", tokenValue: " + this.ISession.tokenValue);
                }
            });
        });

        // super.storeCookie(cookie);
    }
}
