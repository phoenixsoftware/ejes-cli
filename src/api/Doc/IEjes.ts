/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

export interface ILogInfo {
    blockId: string;
    color: string;
    control: string;
    highlight: string;
    intensity: string;
    level: number;
    recordId: number;
    timeStamp: number;
    todClockValue: string;
}

export type LogInfoArray = ILogInfo[];

export interface IFindInfo {
    length: number;
    position: number;
}

export type FindInfoArray = IFindInfo[][];

export interface IMessage {
    isAlarm: boolean;
    shortMessage: string;
    longMessages: [string];
}

export interface IPosition {
    currentLineNumber: number;
    isVerticalAdjustment: boolean;
    logInfo: ILogInfo;
    numberOfLines: number;
}

export interface IBrowseInfo {
    type: string;
    recordLength: number;
    recordFormat: string;
    cc: string;
}

export interface IsdsbInfo {
    items: [string];
}

export interface ICurrentRowJobInfo {
    isActiveJob: boolean;
    isClientJob: boolean;
    jobId: string;
    jobName: string;
    jobNumber: number;
    jobType: string;
}

export interface INotice {
    filterNotices: [string];
    optionNotices: [string];
    viewNotices: [string];
}

export interface IFunction {
    findInfo?: FindInfoArray;
    functionName?: string;
    functionType?: string;
    lineCommands?: [string];
    browseInfo?: IBrowseInfo;
    sdsbInfo?: IsdsbInfo;
    currentLineText: string;
    currentRowColumnInfo: [string];
    map: object;
    currentRowJobInfo?: ICurrentRowJobInfo;
    currentRowKey?: string;
}


export interface IScreen {
    screenImage: [[]];
}

export interface IEjes {
    count?: number;
    elapsed?: string;
    error?: string;
    find?: FindInfoArray;
    function?: IFunction;
    isVerticalAdjustment?: boolean;
    lines?: [string];
    loginfo?: LogInfoArray;
    message?: IMessage;
    notice?: INotice;
    position?: IPosition;
    screen?: IScreen;
    status?: number;
    statusMessage?: string;
    reasonCode?: number;
    returnCode?: number;
}
