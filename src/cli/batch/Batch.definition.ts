/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

import { ICommandDefinition } from "@zowe/imperative";
import { CmdstackDefinition } from "./cmdstack/Cmdstack.definition";
import { NOPDefinition } from "./nop/NOP.definition";
import { ShellDefinition } from "./shell/Shell.definition";
import { ActivityDefinition, APFdsDefinition, CLassDefinition, CommandDefinition, DJcDefinition, DYNEXitDefinition, ENClaveDefinition, ENQDefinition, ENQCDefinition, ENQDDefinition, EntryDefinition, FSSDefinition, GRoupDefinition, HCheckDefinition, HoldDefinition, INITDefinition, InputDefinition, JESplexDefinition, JGroupDefinition, LIneDefinition, LNKlstDefinition, LPAlstDefinition, LogDefinition, MDsDefinition, MEMUsageDefinition, MenuDefinition, MOuntsDefinition, NETConnDefinition, NETSERVDefinition, NJEDefinition, NOdeDefinition, OFFloadDefinition, OutputDefinition, PAGedsDefinition, PARMlibDefinition, PRinterDefinition, PROClibDefinition, PStatusDefinition, QueryDefinition, RESMonDefinition, RESOurceDefinition, SCHenvDefinition, SessionDefinition, SPArtDefinition, SPVolDefinition, StatusDefinition, SYMbolDefinition, SYSClsDefinition, SYSplexDefinition, SYSReqDefinition, UlogDefinition, WriterDefinition, ZeroDefinition
} from "./display/display.definition";
import { EjesProfile } from "../EjesProfile";

const BatchDefinition: ICommandDefinition = {
    children: [CmdstackDefinition, ShellDefinition,
        ActivityDefinition, APFdsDefinition, CLassDefinition, CommandDefinition, DJcDefinition, DYNEXitDefinition, ENClaveDefinition, ENQDefinition, ENQCDefinition, ENQDDefinition, EntryDefinition, FSSDefinition, GRoupDefinition, HCheckDefinition, HoldDefinition, INITDefinition, InputDefinition, JESplexDefinition, JGroupDefinition, LIneDefinition, LNKlstDefinition, LPAlstDefinition, LogDefinition, MDsDefinition, MEMUsageDefinition, MenuDefinition, MOuntsDefinition,
        NETConnDefinition, NETSERVDefinition, NJEDefinition, NOdeDefinition, NOPDefinition, OFFloadDefinition, OutputDefinition, PAGedsDefinition, PARMlibDefinition, PRinterDefinition, PROClibDefinition, PStatusDefinition, QueryDefinition, RESMonDefinition, RESOurceDefinition, SCHenvDefinition, SessionDefinition, SPArtDefinition, SPVolDefinition,
        StatusDefinition, SYMbolDefinition, SYSClsDefinition,
        SYSplexDefinition, SYSReqDefinition, UlogDefinition, WriterDefinition, ZeroDefinition
    ],
    name: "batch",
    aliases: ["b", "bat"],
    summary: "- A shell environment that emulates using (E)JES on the host.",
    description: "The (E)JES batch interface provides much of the power of the on-line environment to automated programs or scripts.\n\n" +
        "Using the batch interface, procedures may be created that issue commands or alter other resources based " +
        "upon the condition of jobs in the JESplex and the contents of spool information (e.g., reports, condition " +
        "codes, JES messages) produced by those jobs. System housekeeping functions containing (E)JES batch procedures " +
        "may be submitted at scheduled times, on demand, or when certain system conditions are met. Practically any " +
        "function that requires access to spool or other (E)JES-provided information can be automated.",
    type: "group",
    pluginHealthCheck: "./lib/healthCheck.handler",
    passOn: [
        {
            property: "profile",
            value: { required: ["ejes"] },
            merge: false,
            ignoreNodes: [ {type: "group"} ]
        },
        {
            property: "options",
            value: EjesProfile.EJES_RM_CONNECTION_OPTIONS,
            merge: true,
            ignoreNodes: [ { type: "group" } ]
        },
//        {
//            property: "options",
//            value: EjesProfile.EJES_RM_RUNTIME_OPTIONS,
//            merge: true,
//            ignoreNodes: [ { type: "group" } ]
//        },
        {
            property: "options",
            value: EjesProfile.EJES_GLOBAL_OPTIONS,
            merge: true,
            ignoreNodes: [ { type: "group" } ]
        }
    ]};

export = BatchDefinition;
/**
 * [action] command definition for the [action] two group. The [action] is of imperative command definition type
 * "group", which means it must have children.
 *
 * In this case, the action is "list" - which will list files, etc.
 *
 * Property Summary:
 * =================
 * "name" of the [action]. Always a verb (e.g. "copy")
 * "summary" will display when issuing the help for the [group] (e.g. zowe zos-files --help)
 * "type" is "group" which means it has children (the [objects])
 * "children" is the set of child definitions (the [objects])
 */
