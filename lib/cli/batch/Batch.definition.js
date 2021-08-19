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
const Cmdstack_definition_1 = require("./cmdstack/Cmdstack.definition");
const NOP_definition_1 = require("./nop/NOP.definition");
const Shell_definition_1 = require("./shell/Shell.definition");
const display_definition_1 = require("./display/display.definition");
const EjesProfile_1 = require("../EjesProfile");
const BatchDefinition = {
    children: [Cmdstack_definition_1.CmdstackDefinition, Shell_definition_1.ShellDefinition,
        display_definition_1.ActivityDefinition, display_definition_1.APFdsDefinition, display_definition_1.CLassDefinition, display_definition_1.CommandDefinition, display_definition_1.DJcDefinition, display_definition_1.DYNEXitDefinition, display_definition_1.ENClaveDefinition, display_definition_1.ENQDefinition, display_definition_1.ENQCDefinition, display_definition_1.ENQDDefinition, display_definition_1.EntryDefinition, display_definition_1.FSSDefinition, display_definition_1.GRoupDefinition, display_definition_1.HCheckDefinition, display_definition_1.HoldDefinition, display_definition_1.INITDefinition, display_definition_1.InputDefinition, display_definition_1.JESplexDefinition, display_definition_1.JGroupDefinition, display_definition_1.LIneDefinition, display_definition_1.LNKlstDefinition, display_definition_1.LPAlstDefinition, display_definition_1.LogDefinition, display_definition_1.MDsDefinition, display_definition_1.MEMUsageDefinition, display_definition_1.MenuDefinition, display_definition_1.MOuntsDefinition,
        display_definition_1.NETConnDefinition, display_definition_1.NETSERVDefinition, display_definition_1.NJEDefinition, display_definition_1.NOdeDefinition, NOP_definition_1.NOPDefinition, display_definition_1.OFFloadDefinition, display_definition_1.OutputDefinition, display_definition_1.PAGedsDefinition, display_definition_1.PARMlibDefinition, display_definition_1.PRinterDefinition, display_definition_1.PROClibDefinition, display_definition_1.PStatusDefinition, display_definition_1.QueryDefinition, display_definition_1.RESMonDefinition, display_definition_1.RESOurceDefinition, display_definition_1.SCHenvDefinition, display_definition_1.SessionDefinition, display_definition_1.SPArtDefinition, display_definition_1.SPVolDefinition,
        display_definition_1.StatusDefinition, display_definition_1.SUBSYStemDefinition, display_definition_1.SYMbolDefinition, display_definition_1.SYSClsDefinition,
        display_definition_1.SYSplexDefinition, display_definition_1.SYSReqDefinition, display_definition_1.UlogDefinition, display_definition_1.WriterDefinition, display_definition_1.ZeroDefinition
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
            ignoreNodes: [{ type: "group" }]
        },
        {
            property: "options",
            value: EjesProfile_1.EjesProfile.EJES_RM_CONNECTION_OPTIONS,
            merge: true,
            ignoreNodes: [{ type: "group" }]
        },
        //        {
        //            property: "options",
        //            value: EjesProfile.EJES_RM_RUNTIME_OPTIONS,
        //            merge: true,
        //            ignoreNodes: [ { type: "group" } ]
        //        },
        {
            property: "options",
            value: EjesProfile_1.EjesProfile.EJES_GLOBAL_OPTIONS,
            merge: true,
            ignoreNodes: [{ type: "group" }]
        }
    ]
};
module.exports = BatchDefinition;
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
//# sourceMappingURL=Batch.definition.js.map