/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
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

export interface IEjes {
    position?: IPosition;
    find?: FindInfoArray;
    lines?: [string];
    loginfo?: LogInfoArray;
    message?: IMessage;
    status?: number;
    statusMessage?: string;
    elapsed?: string;
    returnCode?: number;
    reasonCode?: number;
}
