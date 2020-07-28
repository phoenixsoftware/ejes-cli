/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { ICommandArguments, ICommandOptionDefinition, IProfile, Logger,
    Session, ISession, IHandlerParameters, IHandlerResponseConsoleApi } from "@zowe/imperative";
import { IEjes } from "../api/Doc/IEjes";

/**
 * Utility Methods for EJES CLI
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
        aliases: ["u"],
        description: "Mainframe ((E)JES) user name, which can be the same as your TSO login.",
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
        description: "Mainframe ((E)JES) password, which can be the same as your TSO password.",
        type: "string",
        group: EjesSession.EJES_CONNECTION_OPTION_GROUP,
        required: true
    };

    /**
     * Option used in profile creation and commands for rejectUnauthorized setting for connecting to (E)JES
     */
    public static EJES_OPTION_REJECT_UNAUTHORIZED: ICommandOptionDefinition = {
        name: "reject-unauthorized",
        aliases: ["ru"],
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
            aliases: ["dbg"],
            description: "Invoke debugging code.",
            type: "boolean",
            defaultValue: false,
            group: EjesSession.EJES_RUNTIME_OPTION_GROUP
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
        EjesSession.EJES_OPTION_ENUMERATION_VALUE,
        EjesSession.EJES_OPTION_TIMER_INTERVAL,
        EjesSession.EJES_OPTION_DEBUG
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

        if (params.arguments.debug) {
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
            session.log("           params.arguments.nonstop: " + params.arguments.nonstop);
            session.log("             params.arguments.first: " + params.arguments.first);
            session.log("              params.arguments.last: " + params.arguments.last);
            session.log("               params.arguments.all: " + params.arguments.all);
        }

        return session;
    }


    public columns = 240;
    public rows = 63;
    public rowOverhead = 6;
    public dataLines: number;
    public block = "";
    public record = 0;

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

    public debugLog(msg: string) {
        if (this.params.arguments.debug) {
            this.log(msg);
        }
    }

    public showlog( resp: IEjes, acceptLine: (response: IEjes, index: number) => boolean): void {
        let found = this.block ? false : true;
        let result = "";
        resp.loginfo.forEach((info, index) => {
            if ( ! found ) {
                found = ( info.blockId === this.block && info.recordId === this.record );
                return;
            }
            // if (find[index].length > 0) {
            if (acceptLine(resp, index)) {
                if (this.params.arguments.debug) {
                    result += (info.blockId + " ");
                }
                result += (resp.lines[index] + "\n");
            }
        });
        if ( result ) { this.params.response.console.log(result.substr(0, result.length - 1)); }
        this.block = resp.loginfo.length ? resp.loginfo[resp.loginfo.length - 1].blockId : "";
        this.record = resp.loginfo.length ? resp.loginfo[resp.loginfo.length - 1].recordId : 0;
    }

    public storeCookie(cookie: any) {
        this.debugLog("*** DEBUG ***  storeCookie has been invoked.");
        this.debugLog("*** DEBUG ***  ISession.tokenType: " + this.ISession.tokenType);

        const headerKeys: string[] = Object.keys(cookie);
        headerKeys.forEach((key) => {
            const auth = cookie[key] as string;
            const authArr = auth.split(";");
            this.debugLog("*** DEBUG ***  key: " + key + ", auth: " + auth);
            // see each field in the cookie, e/g. Path=/; Secure; HttpOnly; LtpaToken2=...
            authArr.forEach((element: string) => {
                this.debugLog("*** DEBUG ***  element: " + element + ",  tokenType: " + element.indexOf(this.ISession.tokenType));
                // if we match requested token type, save it off for its length
                if (element.indexOf(this.ISession.tokenType) === 0) {
                    // parse off token value, minus LtpaToken2= (as an example)
                    const ejesCookie: string[] = element.split("=");
                    this.debugLog("*** DEBUG ***  token: " + ejesCookie[0] + ", value: " + ejesCookie[1]);
                    this.ISession.tokenType  = ejesCookie[0];
                    this.ISession.tokenValue = ejesCookie[1];
                    // this.ISession.tokenValue = element.substr(this.ISession.tokenType.length + 1, element.length);
                    this.debugLog("*** DEBUG ***  element: " + element + ",  tokenType: " + element.indexOf(this.ISession.tokenType));
                }
            });
        });

        // super.storeCookie(cookie);
    }
}
