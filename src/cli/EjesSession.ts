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
import { IEjes } from "../api/Doc/IEjes";
import { EjesProfile } from "./EjesProfile";

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
        allowableValues: { values: [ "http", "https" ], caseSensitive: false },
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
        name: "timer-interval",
        aliases: ["timeint", "ti"],
        description: "Number of milliseconds between (E)JES API calls.",
        type: "number",
        defaultValue: 2000,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_ENUMERATION_VALUE: ICommandOptionDefinition = {
            name: "enum-value",
            aliases: ["enumval", "ev"],
            description: "Number of lines to retreieve per (E)JES API call.",
            type: "number",
            defaultValue: 200,
            group: EjesSession.EJES_RUNTIME_OPTION_GROUP
        };

    public static EJES_OPTION_DEBUG: ICommandOptionDefinition = {
            name: "debug",
            aliases: ["dbg", "dv", "d"],
            description: "Invoke debugging code with additive flags.  1=request, 2=response, 4=maximumize response, 8=housekeeping.",
            type: "number",
            defaultValue: 0,
            group: EjesSession.EJES_RUNTIME_OPTION_GROUP
        };

    public static EJES_OPTION_JES2: ICommandOptionDefinition = {
        name: "jes2",
        aliases: ["2"],
        description: "Use the JES2 spooler instead of the default spooler.",
        type: "boolean",
        defaultValue: false,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_JES3: ICommandOptionDefinition = {
        name: "jes3",
        aliases: ["3"],
        description: "Use the JES3 or JES3plus spooler instead of the default spooler.",
        type: "boolean",
        defaultValue: false,
        group: EjesSession.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_SYSLOG: ICommandOptionDefinition = {
        name: "syslog",
        aliases: ["sys"],
        description: "Display the SYSLOG instead of the default log.  No support for --nonstop or --enumeration in V0.3.1.",
        type: "boolean",
        group: EjesProfile.EJES_RUNTIME_OPTION_GROUP
    };

    public static EJES_OPTION_OPERLOG: ICommandOptionDefinition = {
        name: "operlog",
        aliases: ["oper"],
        description: "Display the OPERLOG instead of the default log.",
        type: "boolean",
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
        EjesSession.EJES_OPTION_JES2,
        EjesSession.EJES_OPTION_JES3,
        EjesProfile.EJES_OPTION_OPERLOG,
        EjesProfile.EJES_OPTION_SYSLOG
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
        session.subsystem = params.arguments.jes2 ? "JES2" : params.arguments.jes3 ? "JES3" : undefined;

        if ( params.arguments.debug & session.DEBUG_HOUSEKEEPING ) {
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
            session.log("              params.arguments.jes2: " + params.arguments.jes2);
            session.log("              params.arguments.jes3: " + params.arguments.jes3);
            session.log("           params.arguments.nonstop: " + params.arguments.nonstop);
            session.log("             params.arguments.first: " + params.arguments.first);
            session.log("              params.arguments.last: " + params.arguments.last);
            session.log("               params.arguments.all: " + params.arguments.all);
        }

        return session;
    }

    public DEBUG_REQUEST = 1;
    public DEBUG_RESPONSE = 2;
    public DEBUG_RESPONSE_MAX = 4;
    public DEBUG_ANY_RESPONSE = 6;
    public DEBUG_HOUSEKEEPING = 8;
    public DEBUG_BLOCKING = 16;
    public DEBUG_FETCHING = 32;
    public DEBUG_OUTPUT = 64;
    public DEBUG_FETCHING_OUTPUT = this.DEBUG_FETCHING + this.DEBUG_OUTPUT; // 80
    public DEBUG_TIMER = 128;


    public columns = 240;
    public rows = 63;
    public rowOverhead = 6;
    public dataLines: number;
    public block = "";
    public record = 0;
    public subsystem = undefined;

    private params: IHandlerParameters;
    private logger: IHandlerResponseConsoleApi;


    constructor(newSession: ISession) {
        super(newSession);
        this.dataLines = (this.rows - this.rowOverhead);
        this.block = "";
        this.record = 0;
    }

    public log(msg: string) {
        this.logger.log(msg);
    }

    public debugLog(level: number, msg: string) {
        if ( this.params.arguments.debug & level ) {
            this.log(msg);
        }
    }

    public showlog( level: number, resp: IEjes, acceptLine: (response: IEjes, index: number) => boolean): boolean {
        let found = this.block ? false : true;
        let result = "";
        if ( this.block === "" ) {
            this.debugLog(this.DEBUG_FETCHING, "*** DEBUG *** EjesSession.showlog: Initalizing block to \"00\", resp.loginfo.length=" + resp.loginfo.length);
            this.block = "00";
         }
        resp.loginfo.forEach((info, index) => {
            if ( ! found ) {
                found = ( parseInt(info.blockId, 16) > parseInt(this.block, 16) || (info.blockId === this.block && info.recordId > this.record) );
                this.debugLog(this.DEBUG_FETCHING, "*** DEBUG *** EjesSession.showlog: " + (found ? "(match)" : "(fail) ") + " TEST=" + (info.blockId + " " + info.recordId.toString().padStart(3, "0") + " COMP=" + (this.block + " " + this.record.toString().padStart(3, "0") + " ")));
                if ( ! found ) { return; }
            }
            if (acceptLine(resp, index)) {
                if (this.params.arguments.debug & (this.DEBUG_OUTPUT + this.DEBUG_BLOCKING))
                    result += (info.blockId + " " + info.recordId.toString().padStart(3, "0") + " ");
                result += (resp.lines[index] + "\n");
            }
        });
        if ( result ) {
            this.params.response.console.log(result.substr(0, result.length - 1));
            this.block = resp.loginfo.length ? resp.loginfo[resp.loginfo.length - 1].blockId : "";
            this.record = resp.loginfo.length ? resp.loginfo[resp.loginfo.length - 1].recordId : 0;
            this.debugLog(this.DEBUG_OUTPUT, "*** DEBUG *** EjesSession.showlog: Now expecting a blk/rec >- to: " + (this.block + " " + this.record.toString().padStart(3, "0") + " "));
        }
        return result.length > 0;
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
                if (element.indexOf(this.ISession.tokenType) === 0) {
                    // parse off token value, minus LtpaToken2= (as an example)
                    const split = element.indexOf("=");
                    if (split >= 0) {
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
