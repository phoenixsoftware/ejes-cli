/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

//  node --inspect-brk C:\Users\vssemc\AppData\Roaming\npm\node_modules\@zowe\core\lib\main.js

import { ICommandHandler, IHandlerParameters } from "@zowe/imperative";
import { IArgument, IEjes } from "../../../api/Doc/IEjes";
import { Ejes } from "../../../api/Ejes";
import { EjesSession } from "../../EjesSession";
import * as util from "util";
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";
import { throws } from "assert";

export default class ListHandler implements ICommandHandler {

    private session: EjesSession;
    private params: IHandlerParameters;

    public async process(params: IHandlerParameters): Promise<void> {

        const ejesVersion = "EJES Log Stream V1.1.1, a Zowe component of (E)JES";
        const linesDefault = 10;
        const last = { blockId: undefined, recordId: undefined, numberOfLines: undefined };
        const cmdPrimary = [""];
        const overtypes = [""];
        let regex : RegExp;
        let ip : object;
        let loopCount = 0;
        let operlog : boolean;
        let signal = false;
        let outputRecordLength: number;
        let overtypeItemCount = 0;
        let indexOvertypes = -1;
        let countParsed = 0;
        let endIndexOvertypes : number;
        let limitMinutesMax : number;       // --lines time
        let limitLinesMax : number;         // --lines count
        let noBottomOfDataIfAtLinesMax = true;
        let requestInitialize = 0;
        let requestLocate = 0;
        let requestMore = 0;
        let requestFindNext = 0;
        let requestTerm = 0;
        let linesActuallyOutput = 0;
        let linesSuppressed = 0;
        let linesLimited = 0;
        let linesOnlyed = 0;
        let requestsHandled = 0;
        let linecount = 0;
        let linesReceivedFromHost = 0;
        let cmdIndex = 0;
        let reason = "";
        let elapsed = 0.0;
        let expectingSyslog = false;
        let atBottom = false;
        let verbose = true;
        let maxRunTime: number;
        let refreshDiganostics = "The --follow option was not specified.";
        let refreshInfoMessage : string;
        let errorExitDiagnostics = "";
        let findArguments : string;
        let sep : boolean;
        let findSepRequestNumber : number;
        let evContext : number;
        let needToCountUp : boolean;

        /* Functions */

        const logoff = async (): Promise<void> => {
            if ( signal ) return;
            requestTerm++;
            signal = true;
            try {
                this.debugMsg(this.session.DEBUG_HOUSEKEEPING, "logoff", "Sending request.  RESTAPI may not respond before exiting.");
                const resp = await Ejes.term(this.session, this.params.arguments.debug);
                requestsHandled++;
                this.debugResponse(this.session.DEBUG_HOUSEKEEPING, "logoff", resp);
            }
            catch (e) {
                try { require("fs").writeFileSync(".\\ejesLogStreamTerminationDiagnostics.txt", util.inspect(e, this.inspectOptions())); }
                catch (err) { this.session.error("Error writing .\\ejesLogStreamTerminationDiagnostics.txt: " + util.inspect(err)); }
                if ( ! reason ) {
                    reasonReturn(true, "Exception during host termination request.  Can be ignored.  Diagnostics in ejesLogStreamTerminationDiagnostics.txt.");
                params.response.data.setMessage(reason);
                params.response.data.setExitCode(this.session.errorOnTerm150);
                process.exitCode = this.session.errorOnTerm150;
                }
            }
        };

        const convertNextPrevToPlusMinus = (option: string) => {
            const parm: string[] = params.arguments[option];
            if ( parm && parm.length )
                parm[0] = parm[0].replace(/^next/, "+").replace(/^prev/, "-");
        };

        const messageFilterOptionParse = (option: string, model: string[], fieldLength: number, flags?: IArgument) => {
            const parm: string[] = params.arguments[option];
            let list = "";
            let captureEndOfLastRealData = false;
            model.forEach((value, index) => {
                countParsed++;
                value = (parm && index < parm.length) ? parm[index] : value;
                if ( flags && flags.isTimeArgument && value.length > 10 && value.indexOf(":") === 10 )
                    value = value.substr(8, 8) + ":" + value.substr(17, 2) + "-"  + value.substr(0, 4) + "." + value.substr(4, 3);
                if ( value !== model[index] )
                    captureEndOfLastRealData = true;
                list += /* (index > 0 ? "," : "" ) + */ "<" + (value ? ("'" + (value.length > fieldLength ? value.substring(0, fieldLength) : value) + "'") : "")  + ">";
            });
            if ( overtypes[0].length === 0 || overtypes[indexOvertypes].length + list.length >= 125 ) {
                overtypes[++indexOvertypes] = "x;:" + "<>".repeat(overtypeItemCount); // Start next array with skips.
                overtypes[indexOvertypes] += list;
            }
            else
                overtypes[indexOvertypes] += (countParsed === 4 ? ":" : "") + list;
             overtypeItemCount += model.length;
            if ( captureEndOfLastRealData ) {
                endIndexOvertypes = indexOvertypes;
            }
        };

        const doFindHilite = (response: IEjes, line: string, index: number, start: string = "[", stop: string = "]") : string => {
            if ( params.arguments.hilite && response.find.length > 0  && response.find[index].length !== 0)
                for ( let i = response.find[index].length - 1; i >= 0; i--) {
                    const position = response.find[index][i].position;
                    const length = response.find[index][i].length;
                    line = line.slice(0, position - 1) + start + line.slice(position - 1, position + length - 1) + stop + line.slice(position + length - 1);
                }
            return line;
        };

        const isRefreshSetup = (response: IEjes, index: number) : boolean => {
            if ( /^EJES20[01]/.test(response.message.longMessages[0]) ) {
                response.returnCode = 0; // Got message, but it's not an error the CLI.
                const match = response.message.longMessages[0].match(/(\d+)-(\d+)/);
                if ( match != null ) {
                    const a = parseInt(match[1], 10);
                    const b = parseInt(match[2], 10);
                    switch (index) {
                    case 1: // Interval
                    params.arguments.refresh = Math.min(Math.max(a, params.arguments.refresh), b);
                    refreshDiganostics = "Interval: " + a + "-" + b + " seconds. Using " + params.arguments.refresh + " second" + (params.arguments.refresh > 1 ? "s" : "")  + ". ";
                        break;
                    case 2: // Duration
                        if ( ! response.message.longMessages[0].startsWith("EJES201") ) {
                            refreshDiganostics += "Duration: " + b + " minute" + (b > 1 ? "s" : "")  + ".";
                            maxRunTime = (new Date()).valueOf() + (b * 60 * 1000);
                            refreshInfoMessage = "Refresh duration exceeded.  Maximum set by host credentials is " + b + " minutes.";
                        }
                        else
                            refreshDiganostics += "  Duration: No limit.";

                    }
                }
                return true;
            }
            return false;
        };

        const debugOption16Blocking = (response: IEjes, index: number, countOfLinesOutput: number, isFirstRecord: boolean) : string => {
            let debug = "";
            if ( this.params.arguments.debug & this.session.DEBUG_RECORD_INFO ) {
                if ( isFirstRecord && verbose ) {
                    this.session.log(" lineno blockId          recId  enumline time-stamp    hh:mm:ss:th-year/mm/dd");
                    this.session.log(" ------ ---------------- ------ -------- ------------- -- -- -- -- ---- -- --");
                }
                debug =  "[" + (linesActuallyOutput + 1).toString().padStart(6, "0");
                debug += " " + response.loginfo[index].blockId;
                debug += " " + response.loginfo[index].recordId.toString().padStart(6, " ");
                debug += " " + (response.position.currentLineNumber + countOfLinesOutput).toString().padStart(8, " ");
                debug += " " + response.loginfo[index].timeStamp;
                const timeStampToTimeDateString = (timestamp: number) : string => {
                    const d = new Date(timestamp);
                    return (d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0") + ":" + d.getSeconds().toString().padStart(2, "0") + ":"  + d.getMilliseconds().toString().padStart(2, "0")).slice(0, 11) + "-" + d.getFullYear() + "/" + (d.getMonth() + 1).toString().padStart(2, "0") + "/" + d.getDate().toString().padStart(2, "0");
                };
                debug += " " + timeStampToTimeDateString(response.loginfo[index].timeStamp);
                debug += "] ";
            }
            return debug;
        };

        /*
            • --lines counts may have a multiplier suffix: b 512, kB 1000, K 1024, MB 1000*1000, M 1024*1024, GB 1000*1000*1000, G 1024*1024*1024.  Higher multipliers not supported. Binary prefixes supported: KiB=K, MiB=M, and GiB=G.  Note that the casing: b not B.  K not k.  Do not confuse m (minutes) with M (multiplier).
        */
        const parseMultiplier = (value: string ) : number => {
            let num = parseInt(value, 10);
            const multiplier = value.replace(/\d/g, "");
            switch (multiplier) {
                case "GiB": case "G": num *= 1024;
                case "MiB": case "M": num *= 1024;
                case "KiB": case "K": num *= 1024; break;
                case "GB": num *= 1000;
                case "MB": num *= 1000;
                case "kB": num *= 1000; break;
                case "b": num *= 512; break;
            }
            return num;
        };

        const reasonReturn = (isReason: boolean, reasonText: string) => {
            if ( isReason )
                reason = reasonText;
            return isReason;
        };

        const bottomLine = (bod: boolean, bodPad: number) : boolean => {
            if ( bod ) {
                bod = false;
                if ( ! process.env.EJES_LOG_CLI_NO_BOTTOM && (! noBottomOfDataIfAtLinesMax || limitLinesMax === undefined || linesActuallyOutput < limitLinesMax) ) {
                    linesActuallyOutput++;
                    this.session.log(" ".repeat(bodPad) + "*".repeat((outputRecordLength - 15) / 2) + " Bottom of Data " + "*".repeat((outputRecordLength - 15) / 2));
                }
            }
            return bod;
        };

        const requestsExceeded = () => {
            return reasonReturn(params.arguments.requests && (requestLocate + requestMore + requestFindNext >= params.arguments.requests), "--requests " + params.arguments.requests);
        };

        const lineOutputComplete = (response: IEjes, index: number, contextCounter: number) : boolean => {
            if (params.arguments.find && params.arguments.only !== undefined) {
                if ( response.find && response.find.length > 0 && response.find[index].length === 0 && contextCounter <= 0 )
                    return true; // No FIND hits in this enumeration.
            }
            if (limitMinutesMax) {
                if (response.lines.length > 0 && limitMinutesMax < response.loginfo[index].timeStamp)
                    return true;
            }
            else if (limitLinesMax && linesActuallyOutput >= limitLinesMax)
                return true;
            return false;
        };

        const enumerationComplete = (response: IEjes) : boolean => {
            if ( limitMinutesMax && response.lines.length > 0 && limitMinutesMax <= response.loginfo[response.loginfo.length - 1].timeStamp )
                return reasonReturn(true, "--lines " + (params.arguments.lines ? params.arguments.lines[0] : linesDefault));
            if ( ! limitMinutesMax && limitLinesMax && linesActuallyOutput >= limitLinesMax )
                return reasonReturn(true, "--lines " + (params.arguments.lines ? params.arguments.lines[0] : linesDefault));
            return false;
        };

        const fetchData = async (): Promise<void> => {
            let beeped = false;
            let begin = true;
            let bod = false;
            let bodPad = 0;
            let cmd : string;
            let contextCounter = 0;
            let countOfLinesOutput = 0;
            let lastResponseLineCount : number;
            let response: IEjes;
            let showSeparator = false;

            if ( signal ) return;  // Don't bother.

            do {
                try {
                    if ( ip ) {
                        for ( let index = 0; index < cmdPrimary.length && ! signal; index++ ) {
                            const lastTransaction = index === cmdPrimary.length - 1;
                            // First enumeration of data must be < 54 to encourage host to always return no lines
                            // at the bottom of the log when requesting after the last-known line.  Since there is
                            // no guarentee on the behavior, code below tests for a suppresses previously output lines.
                            // Exception: If --request-format-json, we maximize for a one-shot data capture.
                            const ev = lastTransaction ? (params.arguments.rfj ? params.arguments.enumValue : evContext || this.session.initialEnumeration) : this.session.emptyEnumeration;
                            requestInitialize++;
                            switch (index) {
                            case 0:
                                response = await Ejes.init(this.session, ip, { enumValue: ev, command: cmd = cmdPrimary[index] }, this.params.arguments.debug );
                                requestsHandled++;
                                elapsed += response.elapsed ? parseFloat(response.elapsed) : 0;
                                ip = undefined;
                                this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "init", response);
                                if ( response.function.functionName === "OPERLOG" || response.function.functionName === "SYSLOG" ) // RE: EJES475
                                outputRecordLength = response.function.browseInfo.recordLength;
                                operlog = response.function.functionName === "OPERLOG";
                                if ( params.arguments.time && params.arguments.time.length !== 0 && params.arguments.time[0] === "?" ) {
                                    response.notice.optionNotices.forEach((value) => {
                                        if ( value.startsWith("DateFmt=") )
                                            reasonReturn(true, "--time \"?\" result: Host accepts \"YYYY.DDD\" or \"" + value.slice(8) + "\ dates");
                                    });
                                    await logoff();
                                    return;
                                }
                                break;
                            default:
                                response = await Ejes.exec(this.session, { enumValue: ev, command: cmd = cmdPrimary[index] }, this.params.arguments.debug);
                                requestsHandled++;
                                elapsed += response.elapsed ? parseFloat(response.elapsed) : 0;
                                this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "exec (init continued)", response);
                                if ( findSepRequestNumber === index )
                                    showSeparator = sep;
                                break;
                            }
                            if (response.returnCode === this.session.resultErrorCode) {
                                if ( ! isRefreshSetup (response, index) ) {
                                    if (response.message.shortMessage.startsWith("*Bot") || response.message.shortMessage.startsWith("* Top"))
                                        response.message.shortMessage = "String not found!";
                                    else
                                        reasonReturn(true, response.message.longMessages[0]);
                                    await logoff();
                                }
                            }
                            if ( lastTransaction ) {
                                this.debugMsg(this.session.DEBUG_NOTIFICATIONS, "Notifications", util.inspect(response.notice));
                                lastResponseLineCount = response.lines.length;
                                if ( params.arguments.rfj ) {
                                    params.response.data.setObj(params.arguments.detailedjson ? response : response.lines);
                                break;
                                }
                            }
                        }
                    if ( params.arguments.rfj ) // --rfj captures only first data.
                        break;
                    }
                    else {
                        let ev = params.arguments.enumValue;
                        if ( response && response.returnCode !== 4 && ! atBottom && params.arguments.find && params.arguments.only && requestsHandled >= cmdPrimary.length ) {
                            ev = evContext || ev;
                            cmd = "DOWN " + lastResponseLineCount + ";FIND * NEXT " + findArguments;
                            requestFindNext++;
                            showSeparator = sep;
                        }
                        else if ( begin ) {
                            requestLocate++;
                            if ( operlog )
                                cmd = "LOCATE BLK=" + last.blockId + ";DOWN " + last.recordId;
                            else
                                cmd = "LOCATE " + (last.numberOfLines + 1);
                        }
                        else
                            requestMore++;
                        response = await Ejes.exec(this.session, { enumValue: ev, command: cmd }, this.params.arguments.debug);
                        requestsHandled++;
                        elapsed += response.elapsed ? parseFloat(response.elapsed) : 0;
                        this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "exec", response);
                        lastResponseLineCount = response.lines.length;
                    }
                }
                catch (e) {
                    params.response.data.setExitCode(process.exitCode = ip ? this.session.errorOnInit152 : this.session.errorOnExec151);
                    let msg = "Exception during host " + (ip ? "initialization" : "execution") + " request.";
                    try { require("fs").writeFileSync(".\\ejesLogStreamDiagnostics.txt", util.inspect(e, this.inspectOptions())); }
                    catch (err) { this.session.error("Error writing .\\ejesLogStreamDiagnostics.txt: " + util.inspect(err)); }
                        try {
                        const x = JSON.parse(e.mDetails.causeErrors);
                        msg = (ip ? "Initialization" : "Execution") + " request: " + e.mDetails.msg + ". " + (x.errorMessage && x.errorMessage !== null ? x.errorMessage + ": " : "") + (x.statusMessage && x.statusMessage != null ? x.statusMessage + "." : "") + " Diagnostics in ejesLogStreamDiagnostics.txt.";
                    }
                    catch (e2) {
                        try {  msg = (ip ? "Initialization" : "Execution") + " request: " + e.mDetails.msg + ". " + (e.mDetails.causeErrors ? e.mDetails.causeErrors + "." : "") + " Diagnostics in ejesLogStreamDiagnostics.txt.";  }
                        catch (e3) {
                            this.session.error(verbose ? util.inspect(e, this.inspectOptions()) : msg + "  Diagnostics in ejesLogStreamDiagnostics.txt.");
                        }
                    }
                    params.response.data.setMessage(msg);
                    if ( params.arguments.rfj ) {
                        this.session.error(msg);
                        (params.response as any).writeJsonResponse();
                    }
                    if ( ! reason )
                        reasonReturn(true, msg);
                    if ( ! verbose && ! params.arguments.rfj )
                        this.session.error(msg);
                    process.exit(process.exitCode); // The on.exit will send a logoff.
                }
                this.debugMsg(this.session.DEBUG_FETCH_METADATA, "fetchData", "Reason: " + response.reasonCode + ", RC: " + response.returnCode + ", Iterations(enumeration): " + loopCount + "(" + countOfLinesOutput + "), Lines received: " + response.loginfo.length + ", Begin? " + (begin ? "True" : "False") + ", Msg: " + (response.message.longMessages.length > 0 ? response.message.longMessages : response.message.shortMessage ? response.message.shortMessage : "\"\""));
                linesReceivedFromHost += response.lines.length;
                if ( ! atBottom && (response.returnCode === this.session.resultEnumeratedDataExhausted || response.reasonCode === this.session.reasonEndOfData) || response.message.shortMessage.startsWith("*Bot") )
                    bod = atBottom = true;
                if ( response.returnCode === this.session.resultErrorCode || response.returnCode === this.session.resultServiceFailureOrTeminateSuccess ) {
                    if ( response.message.shortMessage.startsWith("*Bot") )
                        bottomLine(bod, bodPad);
                    break;
                }
                if (response.returnCode === this.session.resultEnumeratedDataExhausted && requestsExceeded()) {
                    bottomLine(bod, bodPad);
                    await logoff();
                    return;
                }
                if ( linecount === 0 ) { // First enumerated line!
                    const addTime =  (timestamp, time, interval) =>  new Date(timestamp + time * (interval === "s" ? 1000 : interval === "m" ? 60000 : interval === "h" ? 3600000 : 86400000)).valueOf();
                    limitMinutesMax = limitMinutesMax ? addTime(response.loginfo[0].timeStamp, limitLinesMax, params.arguments.lines[0].substr(-1)) : undefined;
                    if (params.arguments.find ) // When FIND is progress, the first line always matches.
                        if ((response.find.length === 0 || response.find[0].length === 0 && ! params.arguments.offset )) {
                            response.message.longMessages = ["EJES144 The string could not be located within the column range (if any)."];
                            response.message.shortMessage = "String not found.";
                            response.returnCode = 8;
                            response.reasonCode = undefined;
                            break;
                    }
                    if ( needToCountUp ) { // Enumeration fix for message filtering lines < page
                        response.lines.splice(0, response.lines.length  - limitLinesMax);
                        bod = true; // This will always be at the end of the log.
                    }
                }
                begin = false;
                let foundCount = 0;
                cmd = "";
                const HardReset =                       "\x1b[0m";
                const doubleIntensityHighlightNormal =  "\x1b[38;5;" + (process.env.EJES_LOG_CLI_ANSIMATCHATTR || "11") + "m\x1b[48;5;0m";  // --match
                const doubleIntensityHighlightFind =    "\x1b[38;5;" + (process.env.EJES_LOG_CLI_ANSIFINDATTR || "15") + "m\x1b[48;5;0m";  // --find
                const mcsHighlightNormal =              "\x1b[38;5;1m\x1b[48;5;15m";
                const mcsHighlightFind =                "\x1b[38;5;0m\x1b[48;5;15m";
                const findAttr = HardReset + (params.arguments.mcs && operlog ? mcsHighlightNormal : doubleIntensityHighlightNormal);
                const ansiAllowed = params.arguments.nc === "off" && ! (process.env._BPX_TERMPATH === "OMVS" || process.env.NO_COLOR || process.env.FORCE_COLOR === "0");
                response.lines.forEach((line, index) => {
                    const emulateMCS = () => {
                        const FgBlack = "\x1b[30m";
                        const mcsConsoleAttributes = {
                            blue:   { high: "45",  low: "111"  },
                            red:    { high: "9",   low: "160"  },
                            pink:   { high: "224", low: "217"  },
                            green:  { high: "10",  low: "28"   },
                            cyan:   { high: "14",  low: "43"   },
                            yellow: { high: "11",  low: "221"  },
                            white:  { high: "15",  low: "252"  },
                            black:  { high: "255", low: "250"  },
                          };
                        return HardReset + (response.loginfo[index].highlight === "reverse" ? FgBlack : "") +
                            (response.loginfo[index].highlight === "underscore" ? "\x1b[48;5;232m\x1b[4m" : "") + "\x1b[" +
                            (response.loginfo[index].highlight === "reverse" ? "48" : "38") + ";5;" +
                            mcsConsoleAttributes[response.loginfo[index].color][response.loginfo[index].intensity] + "m" +
                            (response.loginfo[index].highlight === "normal" ? "\x1b[48;5;232m" : "");
                    };
                    let eol = "";
                    let beep = "";
                    let debug = "";
                    let found = "";
                    let logattrTextOnly = "";
                    let logattrAnsi = "";
                    linecount++;
                    if ( ! params.arguments.rfj ) { // NB: We restrict output in --rfj mode.
                        if ( lineOutputComplete(response, index, contextCounter) ) {
                            linesLimited++;
                            return;
                        }
                        // While enumerating 1-53 lines then arbitrary enumValue usu. prevents re-enumeration, API doesn't guarentee it.  Test.
                        /*if ( response.position.isVerticalAdjustment ) {  // Host redisplaying previous page?
                            this.session.log(debugOption16Blocking(response, index, countOfLinesOutput, linecount === 1) + " redisplayed flag line suppressed");
                            linesSuppressed++;   // Known issue: If less than 53 lines are enumerated, any message filter is on, no positioning is done, and
                            return;              //              isVerticalAdjustment is on as a result, output is erronously suppressed.
                        }
                        else*/ if ( ! operlog && last.numberOfLines > response.position.currentLineNumber + index ) { // syslog
                            //this.session.log(debugOption16Blocking(response, index, countOfLinesOutput, linecount === 1) + " syslog redisplayed line suppressed");
                            linesSuppressed++;
                            return;
                        }
                        else if (response.loginfo[index].blockId < last.blockId || (response.loginfo[index].blockId === last.blockId && response.loginfo[index].recordId <= last.recordId) ) {
                            //this.session.log(debugOption16Blocking(response, index, countOfLinesOutput, linecount === 1) + " operlog redisplayed line suppressed");
                            linesSuppressed++;
                            return;
                        }
                        const isFind = response.find && response.find[index] && response.find[index].length > 0;
                        if ( isFind ) {
                            foundCount++;
                            if ( evContext )
                                contextCounter = evContext;
                        }
                        else if ( evContext > 0 && contextCounter-- <= 0 ) {
                            if ( sep && foundCount && contextCounter === 0 && (! limitLinesMax || linesActuallyOutput < limitLinesMax) ) {
                                this.session.log("----");
                                countOfLinesOutput++;  // Local
                                linesActuallyOutput++; // Global
                            }
                            linesOnlyed++;
                            return;
                        }
                        else if ( params.arguments.only  && contextCounter <= 0 ) {
                            if ( sep && foundCount && contextCounter === 0 && (! limitLinesMax || linesActuallyOutput < limitLinesMax)) {
                                this.session.log("----");
                                countOfLinesOutput++;  // Local
                                linesActuallyOutput++; // Global
                            }
                            linesOnlyed++;
                            return;
                        }
                        // A line will output...
                        debug = debugOption16Blocking(response, index, countOfLinesOutput, linecount === 1);
                        countOfLinesOutput++;
                        linesActuallyOutput++;
                        if ( params.arguments.mcs && operlog && ansiAllowed ) {
                            logattrAnsi = emulateMCS();
                            line = line + " ".repeat(outputRecordLength - line.length + 1);
                            if ( response.loginfo[index].control === "alarm" && ! beeped ) {
                                beep = "\u0007";
                                beeped = true;
                            }
                            eol = HardReset;
                        }
                        line = doFindHilite(response, line, index, ! ansiAllowed ? undefined : (params.arguments.mcs && operlog) ? mcsHighlightFind : doubleIntensityHighlightFind, ! ansiAllowed ? undefined : (params.arguments.mcs && operlog) ? logattrAnsi : HardReset);  // TODO : Convert to ANSI.
                        if ( regex && ansiAllowed ) {
                            eol = HardReset;
                            line = line.replace(regex, (x) => findAttr + x + (logattrAnsi || eol));
                        }
                        if ( params.arguments.mcs && operlog && ! ansiAllowed )
                            logattrTextOnly = response.loginfo[index].color.padEnd(4, " ").substr(0, 4) + " " + response.loginfo[index].highlight.padEnd(4, " ").substr(0, 4) + " " + response.loginfo[index].intensity.padEnd(4, " ").substr(0, 4) + " " + (response.loginfo[index].control === "alarm" ? "beep" : "    ") + " ";
                        if ( ! ansiAllowed ) {
                            const isMatch = regex ? regex.test(line) : false;
                            found = (isFind ? "=" : " ") + (isMatch ? ">" : " " ) + " ";
                        }
                        this.session.log(debug + logattrTextOnly + found + beep + logattrAnsi + line + eol);
                        if ( bod )
                            bodPad = logattrTextOnly.length + found.length + debug.length;
                    }
                });
                bod = bottomLine(bod, bodPad);
                if (requestsExceeded()) {
                    await logoff();
                    return;
                }
                if ( enumerationComplete(response) ) {
                    await logoff();
                    return;
                }
                if ( showSeparator ) {
                    showSeparator = false;
                    this.session.log("----");
                    countOfLinesOutput++;
                    linesActuallyOutput++;
                }
                if ( response.returnCode === this.session.resultEnumeratedDataExhausted )
                    break;
                last.blockId = response.loginfo[response.loginfo.length - 1].blockId;
                last.recordId = response.loginfo[response.loginfo.length - 1].recordId;
                last.numberOfLines = atBottom ? response.position.numberOfLines : response.position.currentLineNumber + response.lines.length;
                if ( response.reasonCode === this.session.reasonEndOfData ) // || response.position.isVerticalAdjustment )
                    break;
                loopCount++;
            } while (response.lines.length > 0 );
            if ( response.returnCode === this.session.resultServiceFailureOrTeminateSuccess || (response.returnCode === this.session.resultErrorCode && ! response.message.shortMessage.startsWith("*Bot")) ) {
                reasonReturn(true, "(E)JES Error Reported by REST API.");
                if ( ! signal )
                    signal = true; // Terminate will likely generate the same error, so skip further requests.
                const ejes = response.message.longMessages.length > 0 ? parseInt(response.message.longMessages[0].substr(4), 10) : 0;
                if ( response.message.longMessages.length > 0 && (ejes === 157 || ejes === 158) )
                    response.message.longMessages[0] = response.message.longMessages[0].slice(0, response.message.longMessages[0].indexOf(",")) + ".  String not found.";
                const t = (response.message.longMessages.length > 0 ? response.message.longMessages[0] : response.message.shortMessage);
                errorExitDiagnostics =
                    "\n  Error reported by RESTAPI: " + t +
                    "\n  Response Return Code:      " + response.returnCode +
                    "\n  Response Reason Code:      " + response.reasonCode +
                    "\n  Response Log Info Length:  " + response.loginfo.length +
                    "\n  Iteration:                 " + loopCount +
                    "\n  Enumeration:               " + countOfLinesOutput +
                    "\n  ---------------------------";
                if ( ! verbose || params.arguments.rfj )
                    this.session.error("(E)JES Error Reported by RESTAPI: " + t + " (rc=" + response.returnCode + ", rsn=" + response.reasonCode + ")");
                process.exitCode = (ejes === 144 || ejes === 157 || ejes === 158 ? this.session.errorFindStringNotFound156 : this.session.errorRestApiFailure153);
                params.response.data.setExitCode(process.exitCode);
                params.response.data.setMessage(t);
                if (params.arguments.rfj)
                    (params.response as any).writeJsonResponse();
                process.exit(process.exitCode); // The on.exit will send a logoff.
            }
            if ( ! params.arguments.follow || params.arguments.rfj ) {
                if ( params.arguments.rfj )
                    reasonReturn(true, "--response-format-json");
                await logoff();
            }
        };

        /* Procedural Statements */

        verbose = params.arguments.verbose || verbose;
        if ( params.arguments.quiet || process.env.EJES_LOG_CLI_QUIET )
            verbose = false;
        this.params = params;
        this.session = EjesSession.EjesSessionFactory(this.params);
        if ( params.arguments.version || verbose )
            this.session.log("[" + ejesVersion + "]  Use the --help or --helpWeb option to display command usage documentation.\n");
        if ( params.arguments.version )
            process.exit(0);

        process.on("SIGPIPE", ()  => { params.response.console.error("Broken Pipe"); reasonReturn(true, "Broken Pipe"); logoff(); });
        process.on("SIGHUP", ()   => { params.response.console.error("Hangup"); reasonReturn(true, "Hangup"); logoff(); });
        process.on("SIGINT", ()   => { params.response.console.error("\nInterrupt"); reasonReturn(true, "User interrupt"); logoff(); });
        process.on("exit", (code) => {
            logoff();
            if ( verbose )
                params.response.console.error("Done." + errorExitDiagnostics +
                    "\n  Exit Code:                 " + code +
                    "\n  Reason:                    " + reason +
                    "\n  Log Type:                  " + (operlog ? "OPERLOG" : "SYSLOG") +
                    "\n  Record Length:             " + outputRecordLength +
                    "\n  Refresh host settings:     " + refreshDiganostics +
                    "\n  Lines Received from Host:  " + linesReceivedFromHost +
                    "\n  Lines Limited/Skipped:     " + linesLimited +
                    "\n  Lines Suppressed:          " + linesSuppressed +
                    "\n  Lines Only Suppressed:     " + linesOnlyed +
                    "\n  Lines Output:              " + (linecount - linesLimited - linesSuppressed - linesOnlyed) + "(" + linesActuallyOutput + ")" +
                    "\n  Initialize Requests:       " + requestInitialize +
                    "\n  Locate Requests:           " + requestLocate +
                    "\n  Requests for More Data:    " + requestMore +
                    "\n  Requests for Find Next:    " + requestFindNext +
                    "\n  Terminate Requests:        " + requestTerm +
                    "\n  Requests Handled:          " + requestsHandled +
                    "\n  Elapsed Time (server)      " + elapsed.toString(10).substr(0, (elapsed.toString(10).indexOf(".") + 5)) + " seconds." +
                    "\n  Command Line:              Zowe " + process.argv.slice(2).join(" ") );
        });

        if ( params.arguments.match ) {
            const match = params.arguments.match.match(/^\/(.+)\/([a-z]*)$/i);
            try { regex = match !== null ? new RegExp(match[1], match[2]) : new RegExp(params.arguments.match, "ig"); }
            catch (e) {
                const t = "Exception while while processing --match option. " + e;
                if ( !verbose )
                    this.session.error(t);
                reasonReturn(true, t);
                process.exit(this.session.errorDuringMatchProcessing154);
            }
        }

        if ( this.session.subsystem )
            ip = { userAgent: ejesVersion, subsystem: this.session.subsystem, columns: this.session.columns, rows: this.session.rows };
        else
            ip = { userAgent: ejesVersion, columns: this.session.columns, rows: this.session.rows };

        if ( params.arguments.logsys )
            cmdPrimary[cmdIndex] = "logsys " + params.arguments.logsys + "; log";
        else
            cmdPrimary[cmdIndex] = "log";
        // NB: Why .toString() below for a string type?  When the positional parameter is a dash (-), Zowe erroneously returns a boolean.
        if ( (params.arguments.logType && params.arguments.logType.toString().toLowerCase().startsWith("s")) || params.arguments.syslog ) {
            cmdPrimary[cmdIndex] += " syslog";
            expectingSyslog = true;
        }
        else if ( (params.arguments.logType && params.arguments.logType.toString().toLowerCase().startsWith("o")) || params.arguments.operlog )
            cmdPrimary[cmdIndex] += " operlog";
        else
            cmdPrimary[cmdIndex] += "def operact;log";

        // Refresh-rate Limit Discovery
        if ( params.arguments.follow ) {
            cmdPrimary[++cmdIndex] = "refresh 0";
            cmdPrimary[++cmdIndex] = "refresh 1 0";
        }

        // Message Filtering
        convertNextPrevToPlusMinus("windowTop");
        convertNextPrevToPlusMinus("windowBottom");
        messageFilterOptionParse("systemName", ["", "", "", ""], 8);
        messageFilterOptionParse("jobName", ["", "", "", ""], 8);
        messageFilterOptionParse("jobId", ["", "", "", ""], 8);
        messageFilterOptionParse("console", ["", "", "", ""], 8);
        messageFilterOptionParse("messageId", ["", "", "", ""], 12);
        messageFilterOptionParse("messageText", [""], 34);
        messageFilterOptionParse("routingCodes", ["ALL"], 34);
        messageFilterOptionParse("descriptorCodes", ["ALL"], 34);
        messageFilterOptionParse("windowTop", [""], 23, {isTimeArgument: true});
        messageFilterOptionParse("windowBottom", [""], 23, {isTimeArgument: true});
        messageFilterOptionParse("mpfExitFlags", ["FFFFFFFF"], 8);
        messageFilterOptionParse("resultDirective", ["NZ"], 2);
        if ( endIndexOvertypes !== undefined )
            for ( let i = 0; i <= endIndexOvertypes; i++)
                cmdPrimary[++cmdIndex] = overtypes[i];

        // Preprocessing
        if ( params.arguments.lines && params.arguments.lines[0]) {
            if ( params.arguments.lines[0].toString().startsWith("+") ) { // Conflict resolution.
                params.arguments.line = [params.arguments.lines[0].toString().substr(1)];
                params.arguments.lines[0] = "all";
            }
            // Handle suffixes like K and MB.
            else if ( params.arguments.lines[0] !== "all" && ! /^(?:[1-9]|\d\.)\d{0,2}[smhd]$/.test(params.arguments.lines[0]) )
                params.arguments.lines[0] = parseMultiplier(params.arguments.lines[0].toString());
        }

        // Positioning Requests
        cmdPrimary[++cmdIndex] = "";
        if ( params.arguments.line || params.arguments.head )
            cmdPrimary[cmdIndex] += "loc " + (params.arguments.head || params.arguments.line.length === 0 ? "1" : params.arguments.line[0]);
        if ( params.arguments.time ) {
            if ( params.arguments.time.length === 0 ||  params.arguments.time[0] !== "?" ) {
                const t = params.arguments.time[0];  // NB: Can be "undefined".
                const colon = t ? t.indexOf(":") : 2;
                if ( colon !== 2 )
                    switch (colon) {
                    case -1: // SYSLOG
                        params.arguments.time[0] = t.substr(8, 2) + ":" + t.substr(10, 2) + ":" + t.substr(12, 2) + ":" + t.substr(14) + "0-" + t.substr(0, 4) + "." + t.substr(4, 3);
                        break;
                    case 10: // OPERLOG
                        params.arguments.time[0] = t.substr(8, 8) + ":" + t.substr(17, 2) + "-"  + t.substr(0, 4) + "." + t.substr(4, 3);
                    }
                cmdPrimary[cmdIndex] += ";loc " + (params.arguments.time[0] || "00:00");
            }
        }

        if ( cmdPrimary[cmdIndex].length === 0 ) {
            cmdPrimary.pop();
            cmdIndex--;
        }

        // Find Request
        if ( params.arguments.find ) {
            cmdPrimary[findSepRequestNumber = ++cmdIndex] = "find " + params.arguments.find;
            const groups = params.arguments.find.match(/^((?:c|p|x|)'.+'(?:c|p|x|)|[^'\s]+)(?:(?:\s+(first|last|next|prev|all)){0,1}(?:(?:\s+(chars|pre|prefix|suf|suffix|word)){0,1}(?:\s+(\d*\s+\d*|\d*)){0,2}){0,1}){0,1}$/);
            findArguments = ((groups[3] || "") + " " + (groups[4] || "")).trim();
            if ( params.arguments.only !== undefined ) {
                if ( params.arguments.context ) {
                    sep = false;
                    params.arguments.context.some((val) => {
                        if ( val === "s" ||  val === "sep" || val === "separator" ) // Experimental
                            sep = true;
                        else if ( /\d+/.test(val) )
                            evContext = parseInt(val, 10);
                    });
                    evContext = Math.min(49, evContext || 5);
                }
            }
        }

        // Offset Positioning Request
        if ( params.arguments.offset ) {
            const test = (params.arguments.offset[0] || "prev4l").toString().match(/^(\+|next|prev)*(\d+[smhdl]{0,1})$/) || ["", "", "prev41"];
            if ( test[2].endsWith("l") )
                cmdPrimary[++cmdIndex] = (!test[1] || test[1].length === 0 || test[1] === "prev" ? "up " : "down ") + parseInt(test[2], 10);
            else
                cmdPrimary[++cmdIndex] = (! test[1] || test[1].length === 0 || test[1] === "prev" ? "prev " : "next ") + test[2];
        }

        if ( ! params.arguments.follow )  // --follow prevents setting default 10 line limit.
            limitLinesMax = 10;
        if ( params.arguments.lines !== undefined)
            if ( params.arguments.lines[0] === "all" )
                limitLinesMax = undefined;
            else if ( params.arguments.lines[0] ) {
                limitLinesMax = parseFloat(params.arguments.lines[0]);
                limitMinutesMax = /^.*[smhd]$/.test(params.arguments.lines[0]) ? 1 : limitMinutesMax;
            }

        // Non-following, non-positioning end-of-log output behaviors.
        if ( limitLinesMax && ! limitMinutesMax && ! params.arguments.find && ! params.arguments.offset && ! params.arguments.line && ! params.arguments.head && ! params.arguments.time ) { // Position so the last n lines are initially enumerated.
            let positioningForEnumeration = "";
            let count = this.session.initialEnumeration;
            if ( limitLinesMax && ! process.env.EJES_LOG_CLI_NO_BOTTOM ) {
                Math.max(--limitLinesMax, 0);
                noBottomOfDataIfAtLinesMax = false;
            }
            if ( params.arguments.rfj )
                params.arguments.enumValue = count = limitLinesMax;
            let factor = (expectingSyslog ? 2 : 1) + count - limitLinesMax;
            if ( factor > 0 ) { // Test for last page.  Last page position/count unknowable on OPERLOG.
                positioningForEnumeration = "bot";   // Whether on OPERLOG or SYSLOG  unknownable at this point.
                needToCountUp = true;  // Must enumerate last page then discard unneed lines to get last n lines.
            }
            else  { // We can try to enumerate precisely otherwise.
                factor = limitLinesMax - count - (expectingSyslog ? 2 : 1);
                if ( factor > 0 )
                    positioningForEnumeration = "bot;up " + factor;
            }
            cmdPrimary[++cmdIndex] = positioningForEnumeration;
        }
        else if ( params.arguments.rfj )
            params.arguments.enumValue = limitLinesMax ? limitLinesMax : 10;

        this.debugMsg(this.session.DEBUG_HOUSEKEEPING, "Initial commands", util.inspect(cmdPrimary, { depth: 2, colors: true, maxArrayLength: 10, breakLength: 80, showHidden: true}));

        const wait = (ms) => new Promise((res) => setTimeout(res, ms));
        const startAsync = async () => {
            const tock = params.arguments.refresh * 10;
            let tick = 0;
            while ( ! signal ) {
                if ( tick === 0 ) await fetchData();
                if ( signal ) break;
                if ( maxRunTime && (new Date()).valueOf() > maxRunTime ) {
                    reasonReturn(true, refreshInfoMessage);
                    await logoff();
                    process.exit(this.session.infoRefreshDurationExceeded155);
                }
                await wait(100);
                if ( tick++ >= tock ) tick = 0;
            }
        };
        await startAsync();

        /* End of process statement */
    }

    /* Class Private */

    private inspectOptions(depthValue: number = 10, maxArrayLengthValue: number = 256) : any {
        return { depth: depthValue, colors: true, maxArrayLength: maxArrayLengthValue, breakLength: 350, showHidden: true};
    }

    private debugMsg(level: number, tag: string, msg: string) {
        if ( this.params.arguments.debug & level )
            this.session.log(`*** DEBUG *** [` + (new Date()).valueOf() + `] ${tag}: ${msg}`);
    }

    private debugResponse(level: number, tag: string, resp: IEjes): void {
        if ( resp.lines ) resp.count = resp.lines.length;
        if ( resp.message && resp.message.longMessages.length > 0 ) resp.error = resp.message.longMessages[0] + " (" + resp.message.shortMessage + ")";
        if ( resp.position ) resp.isVerticalAdjustment =  resp.position.isVerticalAdjustment;
        this.debugMsg(level, tag, util.inspect(resp, this.inspectOptions(this.params.arguments.debug & this.session.DEBUG_RESPONSE_MAX ? 10 : 0, this.params.arguments.enumValue)));
    }
}
