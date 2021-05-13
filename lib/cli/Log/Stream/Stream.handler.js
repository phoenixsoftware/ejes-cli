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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ejes_1 = require("../../../api/Ejes");
const EjesSession_1 = require("../../EjesSession");
const util = require("util");
class ListHandler {
    constructor() {
        this.running = false;
        this.skipCount = 0;
    }
    process(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const ejesVersion = "EJES Log Stream V1.0.0, a Zowe component of (E)JES";
            const linesDefault = 10;
            const onlyDefault = 1000;
            const last = { blockId: undefined, recordId: undefined, numberOfLines: undefined };
            const cmdPrimary = [""];
            const overtypes = [""];
            let regex;
            let ip;
            let loopCount = 0;
            let operlog;
            let signal = false;
            let outputRecordLength;
            let overtypeItemCount = 0;
            let indexOvertypes = -1;
            let countParsed = 0;
            let endIndexOvertypes;
            let limitLinesMax; // --limit
            let limitMinutesMax;
            let onlyMinutesMax;
            let onlyEnumerateMax; // --only
            let countEnumeratedLines; // --only
            let requestInitialize = 0;
            let requestLocate = 0;
            let requestMore = 0;
            let requestTerm = 0;
            let linesSuppressed = 0;
            let linesLimited = 0;
            let requestsHandled = 0;
            let linecount = 0;
            let linesReceivedFromHost = 0;
            let cmdIndex = 0;
            let reason = "";
            let elapsed = 0.0;
            let expectingSyslog = false;
            let atBottom = false;
            let verbose = true;
            let maxRunTime;
            let refreshDiganostics = "The --follow option was not specified.";
            let refreshInfoMessage;
            /* Functions */
            const logoff = () => __awaiter(this, void 0, void 0, function* () {
                if (signal)
                    return;
                requestTerm++;
                signal = true;
                try {
                    this.debugMsg(this.session.DEBUG_HOUSEKEEPING, "logoff", "Sending request.  RESTAPI may not respond before exiting.");
                    const resp = yield Ejes_1.Ejes.term(this.session, this.params.arguments.debug);
                    requestsHandled++;
                    this.debugResponse(this.session.DEBUG_HOUSEKEEPING, "logoff", resp);
                }
                catch (e) {
                    this.session.log(util.inspect(e, this.inspectOptions()));
                    reasonReturn(true, "Exception during host termination request.");
                    params.response.data.setExitCode(this.session.errorOnTerm150);
                    process.exitCode = this.session.errorOnTerm150;
                }
            });
            const convertNextPrevToPlusMinus = (option) => {
                const parm = params.arguments[option];
                if (parm && parm.length)
                    parm[0] = parm[0].replace(/^next/, "+").replace(/^prev/, "-");
            };
            const messageFilterOptionParse = (option, model, fieldLength) => {
                const parm = params.arguments[option];
                let list = "";
                let captureEndOfLastRealData = false;
                model.forEach((value, index) => {
                    countParsed++;
                    value = (parm && index < parm.length) ? parm[index] : value;
                    if (value !== model[index])
                        captureEndOfLastRealData = true;
                    list += /* (index > 0 ? "," : "" ) + */ "<" + (value ? ("'" + (value.length > fieldLength ? value.substring(0, fieldLength) : value) + "'") : "") + ">";
                });
                if (overtypes[0].length === 0 || overtypes[indexOvertypes].length + list.length >= 125) {
                    overtypes[++indexOvertypes] = "x;:" + "<>".repeat(overtypeItemCount); // Start next array with skips.
                    overtypes[indexOvertypes] += list;
                }
                else
                    overtypes[indexOvertypes] += (countParsed === 4 ? ":" : "") + list;
                overtypeItemCount += model.length;
                if (captureEndOfLastRealData) {
                    endIndexOvertypes = indexOvertypes;
                }
            };
            const findAndMark = (response, line, index, start = "[", stop = "]") => {
                if (params.arguments.hilite && response.find.length > 0 && response.find[index].length !== 0)
                    for (let i = response.find[index].length - 1; i >= 0; i--) {
                        const position = response.find[index][i].position;
                        const length = response.find[index][i].length;
                        line = line.slice(0, position - 1) + start + line.slice(position - 1, position + length - 1) + stop + line.slice(position + length - 1);
                    }
                return line;
            };
            const debugOption16Blocking = (response, index, countOfLinesOutput) => {
                let debug = "";
                if (this.params.arguments.debug & this.session.DEBUG_RECORD_INFO) {
                    debug = "[" + response.loginfo[index].blockId;
                    debug += " " + response.loginfo[index].recordId.toString().padStart(3, "0");
                    debug += " " + (response.position.currentLineNumber + countOfLinesOutput).toString().padStart(4, " ");
                    debug += " " + response.loginfo[index].timeStamp;
                    const timeStampToTimeDateString = (timestamp) => {
                        const d = new Date(timestamp);
                        return (d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0") + ":" + d.getSeconds().toString().padStart(2, "0") + ":" + d.getMilliseconds().toString().padStart(2, "0")).slice(0, 11) + "-" + d.getFullYear() + "/" + (d.getMonth() + 1).toString().padStart(2, "0") + "/" + d.getDate().toString().padStart(2, "0");
                    };
                    debug += " " + timeStampToTimeDateString(response.loginfo[index].timeStamp);
                    debug += "] ";
                }
                return debug;
            };
            const reasonReturn = (isReason, reasonText) => {
                if (isReason)
                    reason = reasonText;
                return isReason;
            };
            const requestsExceeded = () => {
                return reasonReturn(params.arguments.requests && requestLocate + requestMore >= params.arguments.requests, "--requests " + params.arguments.requests);
            };
            const lineOutputComplete = (response, index, countOfLinesOutput) => {
                if (params.arguments.find && params.arguments.only !== undefined) {
                    if (onlyMinutesMax) {
                        if (response.lines.length > 0 && onlyMinutesMax <= response.loginfo[index].timeStamp)
                            return true;
                    }
                    else if (params.arguments.only !== undefined && countEnumeratedLines > onlyEnumerateMax)
                        return true;
                    if (response.find && response.find.length > 0 && response.find[index].length === 0)
                        return true;
                }
                if (limitMinutesMax) {
                    if (response.lines.length > 0 && limitMinutesMax < response.loginfo[index].timeStamp)
                        return true;
                }
                else if (limitLinesMax && countOfLinesOutput >= limitLinesMax)
                    return true;
                return false;
            };
            const enumerationComplete = (response, countOfLinesOutput) => {
                if (limitMinutesMax && response.lines.length > 0 && limitMinutesMax <= response.loginfo[response.loginfo.length - 1].timeStamp)
                    return reasonReturn(true, "--lines " + (params.arguments.lines ? params.arguments.lines[0] : linesDefault));
                if (!limitMinutesMax && limitLinesMax && countOfLinesOutput >= limitLinesMax)
                    return reasonReturn(true, "--lines " + (params.arguments.lines ? params.arguments.lines[0] : linesDefault));
                if (onlyMinutesMax && response.lines.length > 0 && onlyMinutesMax <= response.loginfo[response.loginfo.length - 1].timeStamp)
                    return reasonReturn(true, "--only " + (params.arguments.only ? params.arguments.only[0] : onlyDefault));
                if (!onlyMinutesMax && params.arguments.only !== undefined && countEnumeratedLines >= onlyEnumerateMax)
                    return reasonReturn(true, "--only " + (params.arguments.only ? params.arguments.only[0] : onlyDefault));
                return false;
            };
            const fetchData = () => __awaiter(this, void 0, void 0, function* () {
                let begin = true;
                let cmd;
                let countOfLinesOutput = 0;
                let response;
                let beeped = false;
                let bod = false;
                let bodPad = 0;
                this.running = true;
                if (signal)
                    return; // Don't bother.
                do {
                    try {
                        if (ip) {
                            for (let index = 0; index < cmdPrimary.length; index++) {
                                const lastTransaction = index === cmdPrimary.length - 1;
                                // First enumeration of data must be < 54 to encourage host to always return no lines
                                // at the bottom of the log when requesting after the last-known line.  Since there is
                                // no guarentee on the behavior, code below tests for a suppresses previously output lines.
                                // Exception: If --request-format-json, we maximize for a one-shot data capture.
                                const ev = lastTransaction ? (params.arguments.rfj ? params.arguments.enumValue : this.session.initialEnumeration) : this.session.emptyEnumeration;
                                requestInitialize++;
                                switch (index) {
                                    case 0:
                                        response = yield Ejes_1.Ejes.init(this.session, ip, { enumValue: ev, command: cmd = cmdPrimary[index] }, this.params.arguments.debug);
                                        requestsHandled++;
                                        elapsed += response.elapsed ? parseFloat(response.elapsed) : 0;
                                        ip = undefined;
                                        this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "init", response);
                                        if (response.function.functionName === "OPERLOG" || response.function.functionName === "SYSLOG") // RE: EJES475
                                            outputRecordLength = response.function.browseInfo.recordLength;
                                        operlog = response.function.functionName === "OPERLOG";
                                        if (params.arguments.time && params.arguments.time.length !== 0 && params.arguments.time[0] === "?") {
                                            response.notice.optionNotices.forEach((value) => {
                                                if (value.startsWith("DateFmt="))
                                                    reasonReturn(true, "--time \"?\" result: Host accepts \"YYYY.DDD\" or \"" + value.slice(8) + "\ dates");
                                            });
                                            yield logoff();
                                            return;
                                        }
                                        break;
                                    default:
                                        response = yield Ejes_1.Ejes.exec(this.session, { enumValue: ev, command: cmd = cmdPrimary[index] }, this.params.arguments.debug);
                                        requestsHandled++;
                                        elapsed += response.elapsed ? parseFloat(response.elapsed) : 0;
                                        this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "exec (init continued)", response);
                                        break;
                                }
                                if (response.returnCode === this.session.resultErrorCode) {
                                    if (/^EJES20[01]/.test(response.message.longMessages[0])) {
                                        response.returnCode = 0; // Got message, but it's not an error the CLI.
                                        const match = response.message.longMessages[0].match(/(\d+)-(\d+)/);
                                        if (match != null) {
                                            const a = parseInt(match[1], 10);
                                            const b = parseInt(match[2], 10);
                                            switch (index) {
                                                case 1: // Interval
                                                    params.arguments.refresh = Math.min(Math.max(a, params.arguments.refresh), b);
                                                    refreshDiganostics = "Interval: " + a + "-" + b + " seconds. Using " + params.arguments.refresh + " second" + (params.arguments.refresh > 1 ? "s" : "") + ". ";
                                                    break;
                                                case 2: // Duration
                                                    if (!response.message.longMessages[0].startsWith("EJES201")) {
                                                        refreshDiganostics += "Duration: " + b + " minute" + (b > 1 ? "s" : "") + ".";
                                                        maxRunTime = (new Date()).valueOf() + (b * 60 * 1000);
                                                        refreshInfoMessage = "Refresh duration exceeded.  Maximum set by host credentials is " + b + " minutes.";
                                                    }
                                                    else
                                                        refreshDiganostics += "  Duration: No limit.";
                                            }
                                        }
                                    }
                                    else {
                                        reasonReturn(true, response.message.longMessages[0]);
                                        verbose = true;
                                        yield logoff();
                                    }
                                }
                                if (lastTransaction) {
                                    this.debugMsg(this.session.DEBUG_NOTIFICATIONS, "Notifications", util.inspect(response.notice));
                                    if (params.arguments.rfj) {
                                        params.response.data.setObj(params.arguments.detailedjson ? response : response.lines);
                                        break;
                                    }
                                }
                            }
                            if (params.arguments.rfj) // --rfj captures only first data.
                                break;
                        }
                        else {
                            if (begin) {
                                requestLocate++;
                                if (operlog)
                                    cmd = "LOCATE BLK=" + last.blockId + ";DOWN " + last.recordId;
                                else
                                    cmd = "LOCATE " + (last.numberOfLines + 1);
                            }
                            else
                                requestMore++;
                            response = yield Ejes_1.Ejes.exec(this.session, { enumValue: params.arguments.enumValue, command: cmd }, this.params.arguments.debug);
                            requestsHandled++;
                            elapsed += response.elapsed ? parseFloat(response.elapsed) : 0;
                            this.debugResponse(this.session.DEBUG_ANY_RESPONSE, "exec", response);
                        }
                    }
                    catch (e) {
                        if (!signal) {
                            if (params.arguments.rfj)
                                params.response.data.setObj(e, true);
                            else
                                this.session.error(util.inspect(e, this.inspectOptions()));
                            signal = true; // Terminate will likely generate the same error, so skip further requests.
                        }
                        if (!reason)
                            reasonReturn(true, "Exception during host " + (ip ? "initialization " : "execution") + " request.");
                        params.response.data.setExitCode(ip ? this.session.errorOnInit152 : this.session.errorOnExec151);
                        process.exit(ip ? this.session.errorOnInit152 : this.session.errorOnExec151); // The on.exit will send a logoff.
                    }
                    this.debugMsg(this.session.DEBUG_FETCH_METADATA, "fetchData", "Reason: " + response.reasonCode + ", RC: " + response.returnCode + ", Iterations(enumeration): " + loopCount + "(" + countOfLinesOutput + "), Lines received: " + response.loginfo.length + ", Begin? " + (begin ? "True" : "False") + ", Msg: " + (response.message.longMessages.length > 0 ? response.message.longMessages : response.message.shortMessage ? response.message.shortMessage : "\"\""));
                    linesReceivedFromHost += response.lines.length;
                    if (!atBottom && (response.returnCode === this.session.resultEnumeratedDataExhausted || response.reasonCode === this.session.reasonEndOfData))
                        bod = atBottom = true;
                    if (response.returnCode === this.session.resultErrorCode || response.returnCode === this.session.resultServiceFailureOrTeminateSuccess) {
                        break;
                    }
                    if (response.returnCode === this.session.resultEnumeratedDataExhausted && requestsExceeded()) {
                        yield logoff();
                        return;
                    }
                    if (linecount === 0) { // First enumerated line!
                        const addTime = (timestamp, time, interval) => new Date(timestamp + time * (interval === "s" ? 1000 : interval === "m" ? 60000 : interval === "h" ? 3600000 : 86400000)).valueOf();
                        limitMinutesMax = limitMinutesMax ? addTime(response.loginfo[0].timeStamp, limitLinesMax, params.arguments.lines[0].substr(-1)) : undefined;
                        onlyMinutesMax = onlyMinutesMax ? addTime(response.loginfo[0].timeStamp, onlyEnumerateMax, params.arguments.only[0].substr(-1)) : undefined;
                        if (params.arguments.find) // When FIND is progress, the first line always matches.
                            if ((response.find.length === 0 || response.find[0].length === 0)) {
                                this.session.log("EJES144 The string could not be located within the column range (if any).");
                                if (cmd.startsWith("find"))
                                    break;
                            }
                    }
                    begin = false;
                    cmd = "";
                    const HardReset = "\x1b[0m";
                    const doubleIntensityHightlightNormal = "\x1b[38;5;11m\x1b[48;5;0m";
                    const doubleIntensityHighlightFind = "\x1b[38;5;15m\x1b[48;5;0m";
                    const mcsHighlightNormal = "\x1b[38;5;1m\x1b[48;5;15m";
                    const mcsHighlightFind = "\x1b[38;5;0m\x1b[48;5;15m";
                    const findAttr = HardReset + (params.arguments.mcs && operlog ? mcsHighlightNormal : doubleIntensityHightlightNormal);
                    const ansiAllowed = params.arguments.nc === "off" && !(process.env._BPX_TERMPATH === "OMVS" || process.env.NO_COLOR || process.env.FORCE_COLOR === "0");
                    response.lines.forEach((line, index) => {
                        const emulateMCS = () => {
                            const FgBlack = "\x1b[30m";
                            const mcsConsoleAttributes = {
                                blue: { high: "45", low: "111" },
                                red: { high: "9", low: "160" },
                                pink: { high: "224", low: "217" },
                                green: { high: "10", low: "28" },
                                cyan: { high: "14", low: "43" },
                                yellow: { high: "11", low: "221" },
                                white: { high: "15", low: "252" },
                                black: { high: "255", low: "250" },
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
                        countEnumeratedLines++;
                        if (!params.arguments.rfj) { // NB: We restrict output in --rfj mode.
                            debug = debugOption16Blocking(response, index, countOfLinesOutput);
                            if (lineOutputComplete(response, index, countOfLinesOutput)) {
                                linesLimited++;
                                return;
                            }
                            if (atBottom) { // While enumerating 53 then arbitrary enumValue usu. prevents re-enumeration, API doesn't guarentee it.
                                if (response.position.isVerticalAdjustment) { // Host redisplaying previous page?
                                    linesSuppressed++;
                                    return;
                                }
                                else if (!operlog && last.numberOfLines > response.position.currentLineNumber + index) { // syslog
                                    linesSuppressed++;
                                    return;
                                }
                                else if (response.loginfo[index].blockId < last.blockId || (response.loginfo[index].blockId === last.blockId && response.loginfo[index].recordId <= last.recordId)) {
                                    linesSuppressed++;
                                    return;
                                }
                            }
                            countOfLinesOutput++;
                            if (params.arguments.mcs && operlog && ansiAllowed) {
                                logattrAnsi = emulateMCS();
                                line = line + " ".repeat(outputRecordLength - line.length + 1);
                                if (response.loginfo[index].control === "alarm" && !beeped) {
                                    beep = "\u0007";
                                    beeped = true;
                                }
                                eol = HardReset;
                            }
                            line = findAndMark(response, line, index, !ansiAllowed ? undefined : (params.arguments.mcs && operlog) ? mcsHighlightFind : doubleIntensityHighlightFind, !ansiAllowed ? undefined : (params.arguments.mcs && operlog) ? logattrAnsi : HardReset); // TODO : Convert to ANSI.
                            if (regex && ansiAllowed) {
                                eol = HardReset;
                                line = line.replace(regex, (x) => findAttr + x + (logattrAnsi || eol));
                            }
                            if (params.arguments.mcs && operlog && !ansiAllowed)
                                logattrTextOnly = response.loginfo[index].color.padEnd(4, " ").substr(0, 4) + " " + response.loginfo[index].highlight.padEnd(4, " ").substr(0, 4) + " " + response.loginfo[index].intensity.padEnd(4, " ").substr(0, 4) + " " + (response.loginfo[index].control === "alarm" ? "beep" : "    ") + " ";
                            if (!ansiAllowed) {
                                const isFind = response.find && response.find[index] && response.find[index].length > 0;
                                const isMatch = regex ? regex.test(line) : false;
                                found = (isFind ? "=" : " ") + (isMatch ? ">" : " ") + " ";
                            }
                            this.session.log(logattrTextOnly + found + debug + beep + logattrAnsi + line + eol);
                            if (bod)
                                bodPad = logattrTextOnly.length + found.length + debug.length;
                        }
                    });
                    if (bod) {
                        bod = false;
                        if (!process.env.EJES_LOG_CLI_NO_BOTTOM)
                            this.session.log(" ".repeat(bodPad) + "*".repeat((outputRecordLength - 15) / 2) + " Bottom of Data " + "*".repeat((outputRecordLength - 15) / 2));
                    }
                    if (requestsExceeded()) {
                        yield logoff();
                        return;
                    }
                    if (enumerationComplete(response, countOfLinesOutput)) {
                        yield logoff();
                        return;
                    }
                    if (response.returnCode === this.session.resultEnumeratedDataExhausted)
                        break;
                    last.blockId = response.loginfo[response.loginfo.length - 1].blockId;
                    last.recordId = response.loginfo[response.loginfo.length - 1].recordId;
                    last.numberOfLines = response.position.numberOfLines;
                    if (response.reasonCode === this.session.reasonEndOfData)
                        break;
                    loopCount++;
                } while (response.lines.length > 0);
                if (response.returnCode === this.session.resultErrorCode || response.returnCode === this.session.resultServiceFailureOrTeminateSuccess) {
                    reasonReturn(true, "Error from REST API: rc=" + response.returnCode + ", rsn=" + response.reasonCode);
                    if (!signal)
                        signal = true; // Terminate will likely generate the same error, so skip further requests.
                    if (response.message.longMessages.length > 0 && response.message.longMessages[0].startsWith("EJES158"))
                        response.message.longMessages[0] = response.message.longMessages[0].slice(0, response.message.longMessages[0].indexOf(",")) + "use the \"first\" keyword to search from the top.";
                    this.session.error("\nError from RESTAPI: " + (response.message.longMessages.length > 0 ? response.message.longMessages : response.message.shortMessage) + "." +
                        "\nReturn Code:        " + response.returnCode +
                        "\nReason Code:        " + response.reasonCode +
                        "\nLines Received:     " + response.loginfo.length +
                        "\nIteration:          " + loopCount +
                        "\nEnumeration:        " + countOfLinesOutput);
                    params.response.data.setExitCode(this.session.errorRestApiFailure153);
                    process.exit(this.session.errorRestApiFailure153); // The on.exit will send a logoff.
                }
                this.running = false;
                if (!params.arguments.follow || params.arguments.rfj) {
                    if (params.arguments.rfj)
                        reasonReturn(true, "--response-format-json");
                    yield logoff();
                }
            });
            /* Procedural Statements */
            verbose = params.arguments.verbose || verbose;
            if (params.arguments.quiet || process.env.EJES_LOG_CLI_QUIET)
                verbose = false;
            this.params = params;
            this.session = EjesSession_1.EjesSession.EjesSessionFactory(this.params);
            if (params.arguments.version || verbose)
                this.session.log("[" + ejesVersion + "]  Use the --help or --helpWeb option to display command usage documentation.\n");
            if (params.arguments.version)
                process.exit(0);
            process.on("SIGPIPE", () => { params.response.console.log("Broken Pipe"); reasonReturn(true, "Broken Pipe"); logoff(); });
            process.on("SIGHUP", () => { params.response.console.log("Hangup"); reasonReturn(true, "Hangup"); logoff(); });
            process.on("SIGINT", () => { params.response.console.log("\nInterrupt"); reasonReturn(true, "User interrupt"); logoff(); });
            process.on("exit", (code) => {
                logoff();
                if (verbose)
                    params.response.console.log("Done." +
                        "\n  Exit Code:                 " + code +
                        "\n  Reason:                    " + reason +
                        "\n  Log Type:                  " + (operlog ? "OPERLOG" : "SYSLOG") +
                        "\n  Record Length:             " + outputRecordLength +
                        "\n  Refresh host settings:     " + refreshDiganostics +
                        "\n  Lines Received from Host:  " + linesReceivedFromHost +
                        "\n  Lines Output:              " + (linecount - linesLimited - linesSuppressed) +
                        "\n  Lines Limited/Skipped:     " + linesLimited +
                        "\n  Lines Suppressed:          " + linesSuppressed +
                        "\n  Requests Handled:          " + requestsHandled +
                        "\n  Initialize Requests:       " + requestInitialize +
                        "\n  Locate Requests:           " + requestLocate +
                        "\n  Requests for More Data:    " + requestMore +
                        "\n  Terminate Requests:        " + requestTerm +
                        "\n  Elapsed Time (server)      " + elapsed.toString(10).substr(0, (elapsed.toString(10).indexOf(".") + 5)) + " seconds." +
                        "\n  Command Line:              Zowe " + process.argv.slice(2).join(" "));
            });
            if (params.arguments.match) {
                const match = params.arguments.match.match(/^\/(.+)\/([a-z]*)$/i);
                try {
                    regex = match !== null ? new RegExp(match[1], match[2]) : new RegExp(params.arguments.match, "ig");
                }
                catch (e) {
                    this.session.log(e);
                    reasonReturn(true, "Exception while while processing --match option.");
                    process.exit(this.session.errorDuringMatchProcessing154);
                }
            }
            if (this.session.subsystem)
                ip = { userAgent: ejesVersion, subsystem: this.session.subsystem, columns: this.session.columns, rows: this.session.rows };
            else
                ip = { userAgent: ejesVersion, columns: this.session.columns, rows: this.session.rows };
            if (params.arguments.logsys)
                cmdPrimary[cmdIndex] = "logsys " + params.arguments.logsys + "; log";
            else
                cmdPrimary[cmdIndex] = "log";
            if (params.arguments.syslog) {
                cmdPrimary[cmdIndex] += " SYSLOG";
                expectingSyslog = true;
            }
            else if (params.arguments.operlog)
                cmdPrimary[cmdIndex] += " OPERLOG";
            // Refresh-rate Limit Discovery
            if (params.arguments.follow) {
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
            messageFilterOptionParse("windowTop", [""], 23);
            messageFilterOptionParse("windowBottom", [""], 23);
            messageFilterOptionParse("mpfExitFlags", ["FFFFFFFF"], 8);
            messageFilterOptionParse("resultDirective", ["NZ"], 2);
            if (endIndexOvertypes !== undefined)
                for (let i = 0; i <= endIndexOvertypes; i++)
                    cmdPrimary[++cmdIndex] = overtypes[i];
            // Positioning Requests
            cmdPrimary[++cmdIndex] = "";
            if (params.arguments.line || params.arguments.head)
                cmdPrimary[cmdIndex] += ";loc " + (params.arguments.head || params.arguments.line.length === 0 ? "1" : params.arguments.line[0]);
            if (params.arguments.time) {
                if (params.arguments.time.length === 0 || params.arguments.time[0] !== "?") {
                    const t = params.arguments.time[0];
                    const colon = t ? t.indexOf(":") : 2;
                    if (colon !== 2)
                        switch (colon) {
                            case -1: // SYSLOG
                                params.arguments.time[0] = t.substr(8, 2) + ":" + t.substr(10, 2) + ":" + t.substr(12, 2) + ":" + t.substr(14) + "0-" + t.substr(0, 4) + "." + t.substr(4, 3);
                                break;
                            case 10: // OPERLOG
                                params.arguments.time[0] = t.substr(8, 8) + ":" + t.substr(17, 2) + "-" + t.substr(0, 4) + "." + t.substr(4, 3);
                        }
                    cmdPrimary[cmdIndex] += ";loc " + (params.arguments.time[0] || "00:00");
                }
            }
            if (cmdPrimary[cmdIndex].length === 0) {
                cmdPrimary.pop();
                cmdIndex--;
            }
            // Find Request
            if (params.arguments.find) {
                cmdPrimary[++cmdIndex] = "find " + params.arguments.find;
                if (params.arguments.only !== undefined) {
                    onlyEnumerateMax = 1000;
                    countEnumeratedLines = 0;
                    if (params.arguments.only[0] === "all")
                        onlyEnumerateMax = undefined;
                    else if (params.arguments.only[0]) {
                        onlyEnumerateMax = parseFloat(params.arguments.only[0]);
                        onlyMinutesMax = /^.*[smhd]$/.test(params.arguments.only[0]) ? 1 : onlyMinutesMax;
                    }
                }
            }
            // Offset Positioning Request
            if (params.arguments.offset) {
                const test = (params.arguments.offset[0] || "prev1m").match(/^(\+|next|prev)*(\d+[smhd]{0,1})$/) || ["", "", "prev1m"];
                cmdPrimary[++cmdIndex] = (test[1].length === 0 || test[1] === "prev" ? "prev " : "next ") + test[2];
            }
            if (!params.arguments.follow) // Follow removes the limit.  User must explicitly specify to override.
                limitLinesMax = 10;
            if (params.arguments.lines !== undefined)
                if (params.arguments.lines[0] === "all")
                    limitLinesMax = undefined;
                else if (params.arguments.lines[0]) {
                    limitLinesMax = parseFloat(params.arguments.lines[0]);
                    limitMinutesMax = /^.*[smhd]$/.test(params.arguments.lines[0]) ? 1 : limitMinutesMax;
                }
            if (limitLinesMax && !limitMinutesMax && !params.arguments.find && !params.arguments.offset && !params.arguments.line && !params.arguments.head && !params.arguments.time) { // Position so the last n lines are initially enumerated.
                let positioningForEnumeration = "";
                let count = this.session.initialEnumeration;
                if (params.arguments.rfj)
                    params.arguments.enumValue = count = limitLinesMax;
                let factor = (expectingSyslog ? 2 : 1) + count - limitLinesMax;
                if (factor > 0)
                    positioningForEnumeration = ";bot;down " + factor;
                else {
                    factor = limitLinesMax - count - (expectingSyslog ? 2 : 1);
                    if (factor > 0)
                        positioningForEnumeration = ";bot;up " + factor;
                }
                cmdPrimary[++cmdIndex] = positioningForEnumeration;
            }
            else if (params.arguments.rfj)
                params.arguments.enumValue = limitLinesMax ? limitLinesMax : 10;
            this.debugMsg(this.session.DEBUG_HOUSEKEEPING, "Initial commands", util.inspect(cmdPrimary, { depth: 2, colors: true, maxArrayLength: 10, breakLength: 80, showHidden: true }));
            const wait = (ms) => new Promise((res) => setTimeout(res, ms));
            const startAsync = () => __awaiter(this, void 0, void 0, function* () {
                const tock = params.arguments.refresh * 10;
                let tick = 0;
                while (!signal) {
                    if (tick === 0)
                        yield fetchData();
                    if (signal)
                        break;
                    if (maxRunTime && (new Date()).valueOf() > maxRunTime) {
                        reasonReturn(true, refreshInfoMessage);
                        yield logoff();
                        process.exit(this.session.infoRefreshDurationExceeded155);
                    }
                    yield wait(100);
                    if (tick++ >= tock)
                        tick = 0;
                }
            });
            yield startAsync();
            /* End of process statement */
        });
    }
    inspectOptions(depthValue = 10, maxArrayLengthValue = 256) {
        return { depth: depthValue, colors: true, maxArrayLength: maxArrayLengthValue, breakLength: 256, showHidden: true };
    }
    debugMsg(level, tag, msg) {
        if (this.params.arguments.debug & level)
            this.session.log(`*** DEBUG *** ${tag}: ${msg}`);
    }
    debugResponse(level, tag, resp) {
        this.debugMsg(level, tag, "response: " + util.inspect(resp, this.inspectOptions(this.params.arguments.debug & this.session.DEBUG_RESPONSE_MAX ? 10 : 0, this.params.arguments.enumValue)));
    }
}
exports.default = ListHandler;
//# sourceMappingURL=Stream.handler.js.map