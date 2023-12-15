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
const util = require("util");
/**
 * Utility Methods for EJES CLI
 * NB: These definition are reflected in the help and presented option switches.
 * @export
 */
class EjesSession extends imperative_1.Session {
    static EjesSessionFactory(params) {
        // const profile = params.profiles.get("ejes");
        const sessCfg = {};
        const sessCfgWithCreds = imperative_1.ConnectionPropsForSessCfg.addPropsOrPrompt(sessCfg, params.arguments, { doPrompting: true, parms: params });
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
            const list = [];
            for (const key in params.arguments)
                if (params.arguments.hasOwnProperty(key) && key !== "password" && key !== "pass" && key !== "pw")
                    list.push((key + ": ").padEnd(21, " ") + util.inspect(params.arguments[key], true, 2, false));
            session.log("ZOWE PARAMETER LIST  Options not in list did not appear on the command line and are \"undefined\".  Passwords are stripped.");
            session.log("-------------------  ---------------");
            session.log("Option               Value");
            session.log("-------------------  ---------------");
            list.sort().forEach((item) => session.log(item));
        }
        return session;
    }
    constructor(newSession) {
        super(newSession);
        this.DEBUG_REQUEST = 1;
        this.DEBUG_RESPONSE = 2;
        this.DEBUG_RESPONSE_MAX = 4;
        this.DEBUG_ANY_RESPONSE = 6;
        this.DEBUG_HOUSEKEEPING = 8;
        this.DEBUG_RECORD_INFO = 16;
        this.DEBUG_NOTIFICATIONS = 32;
        this.DEBUG_FETCH_METADATA = 64;
        this.columns = 240;
        this.rows = 63;
        this.initialEnumeration = 53; // Will fetch all of the initial enumeration, which will be one screen's worth.
        this.emptyEnumeration = 0; // Fetch no lines.
        this.resultEnumeratedDataExhausted = 4;
        this.resultErrorCode = 8;
        this.resultServiceFailureOrTeminateSuccess = 12;
        this.reasonEndOfData = 1;
        this.reasonMoreDataPossible = 0;
        this.resultSuccessfulCompletion = 0;
        this.subsystem = undefined;
        this.errorOnTerm150 = 150;
        this.errorOnExec151 = 151;
        this.errorOnInit152 = 152;
        this.errorRestApiFailure153 = 153; // Return code > 4.
        this.errorDuringMatchProcessing154 = 154;
        this.infoRefreshDurationExceeded155 = 155;
        this.errorFindStringNotFound156 = 156;
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
        this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG *** [" + (new Date()).valueOf() + "] storeCookie has been invoked.");
        this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG *** [" + (new Date()).valueOf() + "] ISession.tokenType: " + this.ISession.tokenType);
        const headerKeys = Object.keys(cookie);
        headerKeys.forEach((key) => {
            const auth = cookie[key];
            const authArr = auth.split(";");
            this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG *** [" + (new Date()).valueOf() + "] key: " + key + ", auth: " + auth);
            // see each field in the cookie, e/g. Path=/; Secure; HttpOnly; LtpaToken2=...
            authArr.forEach((element) => {
                this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG *** [" + (new Date()).valueOf() + "] element: " + element + ",  tokenType: " + element.indexOf(this.ISession.tokenType));
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
                    this.debugLog(this.DEBUG_HOUSEKEEPING, "*** DEBUG *** [" + (new Date()).valueOf() + "] tokenType: " + this.ISession.tokenType + ", tokenValue: " + this.ISession.tokenValue);
                }
            });
        });
        // super.storeCookie(cookie);
    }
}
exports.EjesSession = EjesSession;
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
    description: "Accessibility option: Specify the name of a color scheme.  User scheme files may also be created and specified to provide better contrast or to favor easier to see colors.  For a how-to, use \"zowe ejes emulate batch --helpApp scheme-info\".  Zowe ejes log stream ignores this option as it outputs plain text by default, only colorizing when ANSI color options are specified.\n\nAllowed values: dark, light, powershell, nono, none, user-scheme-file, list, help",
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
    name: "refresh-interval",
    aliases: ["refreshInterval", "refresh", "ri", "sleep-interval", "sleep", "s"],
    description: "Number of seconds between (E)JES API calls in log stream command.  The actual minimum and maximum interval is controlled by your host refresh command settings.",
    type: "number",
    defaultValue: 5,
    numericValueRange: [1, 100],
    group: EjesSession.EJES_RUNTIME_OPTION_GROUP
};
EjesSession.EJES_OPTION_ENUMERATION_VALUE = {
    name: "enum-value",
    aliases: ["enumval", "ev"],
    description: "Number of lines to retreieve per (E)JES API call.  Overridden by the combination of --rfj and --line (-n).  See --line.",
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
];
//# sourceMappingURL=EjesSession.js.map