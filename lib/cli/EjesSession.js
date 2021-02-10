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
exports.EjesSession = void 0;
const imperative_1 = require("@zowe/imperative");
const EjesProfile_1 = require("./EjesProfile");
/**
 * Utility Methods for EJES CLI
 * NB: These definition are reflected in the help and presented option switches.
 * @export
 */
let EjesSession = /** @class */ (() => {
    class EjesSession extends imperative_1.Session {
        constructor(newSession) {
            super(newSession);
            this.DEBUG_REQUEST = 1;
            this.DEBUG_RESPONSE = 2;
            this.DEBUG_RESPONSE_MAX = 4;
            this.DEBUG_ANY_RESPONSE = 6;
            this.DEBUG_HOUSEKEEPING = 8;
            this.DEBUG_RECORD_INFO = 16;
            this.DEBUG_FETCH_METADATA = 32;
            this.columns = 240;
            this.rows = 63;
            this.initialEnumeration = -1; // Will fetch all of the initial enumeration, which will be one screen's worth.
            this.subsystem = undefined;
        }
        static EjesSessionFactory(params) {
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
            if (params.arguments.debug & session.DEBUG_HOUSEKEEPING) {
                session.log("          params.arguments.protocol: " + params.arguments.protocol);
                session.log("              params.arguments.host: " + params.arguments.host);
                session.log("              params.arguments.port: " + params.arguments.port);
                session.log("              params.arguments.user: " + params.arguments.user);
                session.log("          params.arguments.password: " + params.arguments.password);
                session.log("params.arguments.rejectUnauthorized: " + params.arguments.rejectUnauthorized);
                session.log("         params.arguments.base-path: " + params.arguments.basePath);
                session.log("        params.arguments.enum-value: " + params.arguments.enumValue);
                session.log("    params.arguments.timer-interval: " + params.arguments.timerInterval);
                session.log("             params.arguments.debug: " + params.arguments.debug);
                session.log("      params.arguments.detailedjson: " + params.arguments.detailedjson);
                session.log("              params.arguments.jes2: " + params.arguments.jes2);
                session.log("              params.arguments.jes3: " + params.arguments.jes3);
                session.log("         params.arguments.subsystem: " + params.arguments.subsystem);
                session.log("           params.arguments.nonstop: " + params.arguments.nonstop);
                session.log("             params.arguments.first: " + params.arguments.first);
                session.log("              params.arguments.last: " + params.arguments.last);
                session.log("               params.arguments.all: " + params.arguments.all);
            }
            return session;
        }
        log(msg) {
            this.logger.log(msg);
        }
        error(msg) {
            this.logger.error(msg);
        }
        debugLog(level, msg) {
            if (this.params.arguments.debug & level) {
                this.log(msg);
            }
        }
        storeCookie(cookie) {
            this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  storeCookie has been invoked.");
            this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  ISession.tokenType: " + this.ISession.tokenType);
            const headerKeys = Object.keys(cookie);
            headerKeys.forEach((key) => {
                const auth = cookie[key];
                const authArr = auth.split(";");
                this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  key: " + key + ", auth: " + auth);
                // see each field in the cookie, e/g. Path=/; Secure; HttpOnly; LtpaToken2=...
                authArr.forEach((element) => {
                    this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG ***  element: " + element + ",  tokenType: " + element.indexOf(this.ISession.tokenType));
                    // if we match requested token type, save it off for its length
                    if (element.indexOf(this.ISession.tokenType) === 0) {
                        // parse off token value, minus LtpaToken2= (as an example)
                        const split = element.indexOf("=");
                        if (split >= 0) {
                            this.ISession.tokenType = element.substring(0, split);
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
    EjesSession.EJES_CONNECTION_OPTION_GROUP = "EJES Connection Options";
    EjesSession.EJES_RUNTIME_OPTION_GROUP = "EJES CLI Runtime Options";
    /**
     * Option used in profile creation and commands for protocol for (E)JES
     */
    EjesSession.EJES_OPTION_PROTOCOL = {
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
    EjesSession.EJES_OPTION_HOST = {
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
    EjesSession.EJES_OPTION_PORT = {
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
    EjesSession.EJES_OPTION_USER = {
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
    EjesSession.EJES_OPTION_PASSWORD = {
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
    EjesSession.EJES_OPTION_REJECT_UNAUTHORIZED = {
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
    EjesSession.EJES_OPTION_BASE_PATH = {
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
    EjesSession.EJES_OPTION_COLOR_SCHEME = {
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
    EjesSession.EJES_OPTION_NO_COLOR = {
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
    EjesSession.EJES_OPTION_TIMER_INTERVAL = {
        name: "timer-interval",
        aliases: ["timeint", "ti"],
        description: "Number of milliseconds between (E)JES API calls.",
        type: "number",
        defaultValue: 2000,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_ENUMERATION_VALUE = {
        name: "enum-value",
        aliases: ["enumval", "ev"],
        description: "Number of lines to retreieve per (E)JES API call.",
        type: "number",
        defaultValue: 200,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_DEBUG = {
        name: "debug",
        aliases: ["dbg", "dv", "d"],
        description: "Invoke debugging code with additive flags.  1=request, 2=minimum response, 4=full response, 8=housekeeping, 16=show record info, 32=show fetch metadata.",
        type: "number",
        defaultValue: 0,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_DETAILED_JSON = {
        name: "detailed-json",
        aliases: ["detailedjson", "detail", "dj"],
        description: "Include metadata objects and arrays in --rfj output, not just an array of lines.",
        type: "boolean",
        defaultValue: false,
        group: EjesProfile_1.EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_JES2 = {
        name: "jes2",
        aliases: ["2"],
        description: "Use the JES2 spooler instead of the default spooler.",
        type: "boolean",
        defaultValue: false,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_JES3 = {
        name: "jes3",
        aliases: ["3"],
        description: "Use the JES3 or JES3plus spooler instead of the default spooler.",
        type: "boolean",
        defaultValue: false,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_SUBSYSTEM = {
        name: "subsystem",
        aliases: ["subsys", "ss"],
        description: "Specify the JES spooler system to use instead of the default spooler.",
        type: "string",
        defaultValue: false,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_LOGSYS = {
        name: "logsys",
        aliases: ["l"],
        description: "Specify a syslog to display by specifying the MVS name of a system in a JES2 environment.  The current system is browsed by default.",
        type: "string",
        group: EjesProfile_1.EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_SYSLOG = {
        name: "syslog",
        aliases: ["sys"],
        description: "Display the SYSLOG instead of the default log.",
        type: "boolean",
        group: EjesProfile_1.EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };
    EjesSession.EJES_OPTION_OPERLOG = {
        name: "operlog",
        aliases: ["oper"],
        description: "Display the OPERLOG instead of the default log.",
        type: "boolean",
        group: EjesProfile_1.EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };
    /**
     * Options related to the (E)JES CLI
     * These options can be filled in if the user creates a profile
     */
    EjesSession.EJES_CLI_OPTIONS = [
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
        EjesSession.EJES_OPTION_JES2,
        EjesSession.EJES_OPTION_JES3,
        EjesSession.EJES_OPTION_SUBSYSTEM,
        EjesProfile_1.EjesProfile.EJES_OPTION_OPERLOG,
        EjesProfile_1.EjesProfile.EJES_OPTION_SYSLOG,
        EjesProfile_1.EjesProfile.EJES_OPTION_LOGSYS
    ];
    return EjesSession;
})();
exports.EjesSession = EjesSession;
//# sourceMappingURL=EjesSession.js.map