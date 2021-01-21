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
//import { ACtivityDefinition } from "./ACtivity/ACtivity.definition";
const ACtivityDefinition = {
    name: "activity",
    aliases: ["ac"],
    summary: " - Activity table",
    description: "Select a table of all the jobs in all active address spaces for the JESplex or sysplex.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "AC. List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain invocation primary selection criteria or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { APFdsDefinition } from "./APFds/APFds.definition";
const APFdsDefinition = {
    name: "apfds",
    aliases: ["apf"],
    summary: " - APF-authorized libraries table",
    description: "Select a table of APF-authorized libraries defined to the systems in your sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { CLassDefinition } from "./CLass/CLass.definition";
const CLassDefinition = {
    name: "class",
    aliases: ["cl"],
    summary: " - Job classes table",
    description: "Select table of job classes defined for the JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler"
};
//import { DJcDefinition } from "./DJc/DJc.definition";
const DJcDefinition = {
    name: "djc",
    aliases: ["dj"],
    summary: " - JES3 dependent job network control table",
    description: "Select a table of Dependent Job Control networks in the JESplex.\n\nUse  Use General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler" /*,
    positionals: [
        {
            name: "firstpositional",
            type: "string",
            description: "The first positional parameter",
            required: false
        },
        {
            name: "secondpositional",
            type: "number",
            description: "The second positional parameter",
            required: false
        }
    ]
    */
};
// import { DYNEXitDefinition } from "./DYNEXit/DYNEXit.definition";
const DYNEXitDefinition = {
    name: "dynexit",
    aliases: ["dynex", "dynx"],
    summary: " - Dynamic exits table",
    description: "Select a table of MVS dynamic exits defined within the current sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { ENClaveDefinition } from "./ENClave/ENClave.definition";
const ENClaveDefinition = {
    name: "enclave",
    aliases: ["enc"],
    summary: " - Enclaves table",
    description: "Select a table of WLM enclaves defined within the JESplex.\n\nUse  Use General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { ENQDefinition } from "./ENQ/ENQ.definition";
const ENQDefinition = {
    name: "enq",
    summary: " - ENQ table",
    description: "Select a table of information about ENQs and RESERVEs in the sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters and/or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { ENQCDefinition } from "./ENQC/ENQC.definition";
const ENQCDefinition = {
    name: "enqc",
    summary: " - ENQ contention table",
    description: "Select a table of information about ENQ contention in the sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters and/or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
//import { ENQDDefinition } from "./ENQD/ENQD.definition";
const ENQDDefinition = {
    name: "enqd",
    summary: " - ENQ SYSDSN resources table",
    description: "Select a table of information about ENQ SYSDSN resources in the sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters and/or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { FSSDefinition } from "./FSS/FSS.definition";
const FSSDefinition = {
    name: "fss",
    summary: " - FSS (Function Subsystems) table",
    description: "Select a table of Functional Subsystems defined for the JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler" /*,
    positionals: [
        {
            name: "firstpositional",
            type: "string",
            description: "The first positional parameter",
            required: false
        },
        {
            name: "secondpositional",
            type: "number",
            description: "The second positional parameter",
            required: false
        }
    ]
    */
};
// import { GRoupDefinition } from "./GRoup/GRoup.definition";
const GRoupDefinition = {
    name: "group",
    aliases: ["gr"],
    summary: " - Job class groups table",
    description: "Select a table of Generalized Main Scheduler parameters for job class groups in the JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler" /*,
    positionals: [
        {
            name: "firstpositional",
            type: "string",
            description: "The first positional parameter",
            required: false
        },
        {
            name: "secondpositional",
            type: "number",
            description: "The second positional parameter",
            required: false
        }
    ]
    */
};
// import { HCheckDefinition } from "./HCheck/HCheck.definition";
const HCheckDefinition = {
    name: "hcheck",
    aliases: ["hchk", "hc"],
    summary: " - Health check table",
    description: "Select a table of the about checks registered with IBM Health Checker for z/OS.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { HoldDefinition } from "./Hold/Hold.definition";
const HoldDefinition = {
    name: "hold",
    aliases: ["h"],
    summary: " - Hold table",
    description: "Select a table of the sysout in the Hold queue.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { INITDefinition } from "./INIT/INIT.definition";
const INITDefinition = {
    name: "init",
    summary: " - JES2 initiators table",
    description: "Select a table of JES2-managed batch initiators defined for the JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { InputDefinition } from "./Input/Input.definition";
const InputDefinition = {
    name: "input",
    aliases: ["i"],
    summary: " - Input table",
    description: "Select a table of all jobs in the JESplex that are in pre-execution and execution status.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
//import { JESplexDefinition } from "./JESplex/JESplex.definition";
const JESplexDefinition = {
    name: "jesplex",
    aliases: ["jesp"],
    summary: " - JESplex table",
    description: "Select a table of JES images in your z/OS JESplex.\n\nA JES2 JESplex is also known as a Multi-Access SPOOL configuration or MAS.  A JES3 JESplex is also known as a JES3 complex.  Use General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler" /*,
    positionals: [
        {
            name: "firstpositional",
            type: "string",
            description: "The first positional parameter",
            required: false
        },
        {
            name: "secondpositional",
            type: "number",
            description: "The second positional parameter",
            required: false
        }
    ]
    */
};
// import { JGroupDefinition } from "./JGroup/JGroup.definition";
const JGroupDefinition = {
    name: "jgroup",
    aliases: ["jg"],
    summary: " - JES2 job groups table",
    description: "Select a table of the active job groups in the JESplex.\n\nUse  Use General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler" /*,
    positionals: [
        {
            name: "firstpositional",
            type: "string",
            description: "The first positional parameter",
            required: false
        },
        {
            name: "secondpositional",
            type: "number",
            description: "The second positional parameter",
            required: false
        }
    ]
    */
};
// import { LIneDefinition } from "./LIne/LIne.definition";
const LIneDefinition = {
    name: "line",
    aliases: ["li"],
    summary: " - JES3 dependent job network control table",
    description: "Select a table of the lines that connect NJE nodes to your JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { ListDefinition } from "./List/List.definition";
const ListDefinition = {
    name: "list",
    summary: " - List primary tables you are authorized to use.",
    description: "Display a list of all the primary display tables you are authorized to query on the host.",
    type: "command",
    handler: __dirname + "/generic.handler"
};
// import { LNKlstDefinition } from "./LNKlst/LNKlst.definition";
const LNKlstDefinition = {
    name: "lnklst",
    aliases: ["lnkl", "lnk"],
    summary: " - Link list data sets table",
    description: "Select a table of data sets in the link list concatenation of the link list libraries defined to the systems in your sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { LPAlstDefinition } from "./LPAlst/LPAlst.definition";
const LPAlstDefinition = {
    name: "lpalst",
    aliases: ["lpal", "lpa"],
    summary: " - Link pack data sets table",
    description: "Select a table of data sets in the LPA concatenation of the link pack libraries defined to the systems in your sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { MDsDefinition } from "./MDs/MDs.definition";
const MDsDefinition = {
    name: "mds",
    aliases: ["md"],
    summary: " - JES3 MDS table",
    description: "Select a table of jobs in the JESplex that are currently delayed in one of the Main Device Scheduler queues.\n\nUse  Use General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { MEMUsageDefinition } from "./MEMUsage/MEMUsage.definition";
const MEMUsageDefinition = {
    name: "memusage",
    aliases: ["memuse", "memu"],
    summary: " - Memory usage table",
    description: "Select a table of real and virtual memory requirements of jobs and other tasks running within your sysplex.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters, invocation primary selection criteria, or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { MOuntsDefinition } from "./MOunts/MOunts.definition";
const MOuntsDefinition = {
    name: "mounts",
    aliases: ["mount", "mo"],
    summary: " - z/OS UNIX mounts table",
    description: "Select a table of mounted file systems within the sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { NETConnDefinition } from "./NETConn/NETConn.definition";
const NETConnDefinition = {
    name: "netconn",
    aliases: ["netc", "nc"],
    summary: " - Network connections table",
    description: "Select a table of NJE (Network Job Entry) connections.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { NETSERVDefinition } from "./NETSERV/NETSERV.definition";
const NETSERVDefinition = {
    name: "netserv",
    aliases: ["nets"],
    summary: " - Network servers table",
    description: "Select a table of NJE network servers.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { NJEDefinition } from "./NJE/NJE.definition";
const NJEDefinition = {
    name: "nje",
    summary: " - JES3 NJE sysout table",
    description: "Select a table of sysout in the Bulk Data Transfer and TCP/IP NJE queues.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { NOdeDefinition } from "./NOde/NOde.definition";
const NOdeDefinition = {
    name: "node",
    aliases: ["node", "no"],
    summary: " - Node table",
    description: "Select a table of the NJE nodes defined to the JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { OFFloadDefinition } from "./OFFload/OFFload.definition";
const OFFloadDefinition = {
    name: "offload",
    aliases: ["off"],
    summary: " - JES2 spool offloader device table",
    description: "Select a table of the JES2 spool offload devices in your JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler"
};
// import { PAGedsDefinition } from "./PAGeds/PAGeds.definition";
const PAGedsDefinition = {
    name: "pageds",
    aliases: ["pag", "page", "paged"],
    summary: " - Page data set resources table",
    description: "Select a table of paging resources defined to the systems in your sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { PARMlibDefinition } from "./PARMlib/PARMlib.definition";
const PARMlibDefinition = {
    name: "parmlib",
    aliases: ["parml", "parm"],
    summary: " - Parameter library data sets table",
    description: "Select a table of information about system parameter libraries defined to the systems in your sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler"
};
// import { PRinterDefinition } from "./PRinter/PRinter.definition";
const PRinterDefinition = {
    name: "printer",
    aliases: ["pr"],
    summary: " - Printer and punch table",
    description: "Select a table of JES writers which drive local, FSS, and signed-on/logged-on remote printer and punch devices attached to the JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { PROClibDefinition } from "./PROClib/PROClib.definition";
const PROClibDefinition = {
    name: "proclib",
    aliases: ["procl", "proc"],
    summary: " - Proclib data sets table",
    description: "Select a table of information about your JES proclib concatenations.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler"
};
// import { PStatusDefinition } from "./PStatus/PStatus.definition";
const PStatusDefinition = {
    name: "pstatus",
    aliases: ["pstat", "ps"],
    summary: " - UNIX process status table",
    description: "Select a table of z/OS UNIX processes running in the JESplex.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters, invocation primary selection criteria, or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { RESMonDefinition } from "./RESMon/RESMon.definition";
const RESMonDefinition = {
    name: "resmon",
    aliases: ["resm", "rmon", "rm"],
    summary: " - JES2 resource monitor table",
    description: "Select a table of JES resources for the JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { RESOurceDefinition } from "./RESOurce/RESOurce.definition";
const RESOurceDefinition = {
    name: "resource",
    aliases: ["reso"],
    summary: " - Workload manager resource table",
    description: "Select a table of the WLM Resources defined for the current sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { SCHenvDefinition } from "./SCHenv/SCHenv.definition";
const SCHenvDefinition = {
    name: "schenv",
    aliases: ["sch"],
    summary: " - Workload manager scheduling environments table",
    description: "Select a table of the WLM Scheduling Environments defined for the current sysplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { SessionDefinition } from "./Session/Session.definition";
const SessionDefinition = {
    name: "session",
    aliases: ["ses"],
    summary: " - (E)JES session table",
    description: "Select a table of all active (E)JES sessions.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { SPArtDefinition } from "./SPArt/SPArt.definition";
const SPArtDefinition = {
    name: "spart",
    aliases: ["spa"],
    summary: " - Spool partitions table",
    description: "Select a table of the SPOOL partition configuration of your JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { SPVolDefinition } from "./SPVol/SPVol.definition";
const SPVolDefinition = {
    name: "spvol",
    aliases: ["spv"],
    summary: " - Spool volume extents table",
    description: "Select a table of the SPOOL volume extent configuration of your JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler"
};
// import { StatusDefinition } from "./Status/Status.definition";
const StatusDefinition = {
    name: "status",
    aliases: ["st"],
    summary: " - Job status table",
    description: "Select a table of all jobs in the JESplex.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { SYMbolDefinition } from "./SYMbol/SYMbol.definition";
const SYMbolDefinition = {
    name: "symbol",
    aliases: ["sym"],
    summary: " - System symbols table",
    description: "Select a table of z/OS system symbols as well as JES and JCL symbols defined for the current address space.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { SYSClsDefinition } from "./SYSCLs/SYSCls.definition";
const SYSClsDefinition = {
    name: "syscls",
    aliases: ["sysc"],
    summary: " - Sysout classes table",
    description: "Select a table of the sysout class configuration for your JESplex.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    handler: __dirname + "/generic.handler"
};
// import { SYSplexDefinition } from "./SYSplex/SYSplex.definition";
const SYSplexDefinition = {
    name: "sysplex",
    aliases: ["sysp", "sys"],
    summary: " - Sysplex members table",
    description: "Select a table of  the connected system images in your z/OS sysplex. In a monoplex, you manage the current system only (i.e., the image on which your (E)JES session is executing).\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain an invocation system selection override.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { SYSReqDefinition } from "./SYSReq/SYSReq.definition";
const SYSReqDefinition = {
    name: "sysreq",
    aliases: ["sysr", "sr"],
    summary: " - System requests table",
    description: "Select a table of outstanding replies and messages retained by the MVS Action Message Retention Facility (AMRF). Outstanding replies and action messages for the entire sysplex are shown.\n\nUse General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other wor`k will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { WriterDefinition } from "./Writer/Writer.definition";
const WriterDefinition = {
    name: "writer",
    aliases: ["w", "output", "o"],
    summary: " - Writer (Output) table",
    description: "Select a table of sysout in the Output queue (JES2) or Writer queue (JES3). The interchangeable terms Output queue and Writer queue are used by the two JESes to describe the queue from which JES-managed or FSS-managed printers can select work.\n\nUse  Primary Selection options to modify which rows are included in a table (for example, --jobname sys* includes only jobs starting with \"sys\").  Use General Use options to narrow your selected rows further.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
// import { ZeroDefinition } from "./Zero/Zero.definition";
const ZeroDefinition = {
    name: "zero",
    aliases: ["z"],
    summary: " - JES3 Job zero table",
    description: "Select a table of sysout data sets created by JES3 internal facilities.\n\nUse  Use General Use options like --select and --metafilter to modify which rows are included in your table.  Use --table to drill down to a child table and --report to output the contents of a spool data set, a MVS data set, or report instead of the table.  Use --command to issue commands against the rows included in the table.",
    type: "command",
    examples: [{
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "--table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "--metafilter help"
        }],
    positionals: [
        {
            name: "parameter-list",
            type: "string",
            description: "Optional list enclosed in double-quotes.  May contain optional parameters or invocation primary selection criteria.  See the (E)JES Reference Manual for information for the corresponding command for details about content and the list's internal order.",
            required: false
        }
    ],
    handler: __dirname + "/generic.handler"
};
const EjesProfile_1 = require("../EjesProfile");
/**
 * [action] command definition for the [action] two group. The [action] is of imperative command definition type
 * "group", which means it must have children.
 *
 * In this case, the action is "query" - which will query commands
 *
 * Property Summary:
 * =================
 * "name" of the [action]. Always a verb (e.g. "copy")
 * "summary" will display when issuing the help for the [group] (e.g. zowe zos-files --help)
 * "type" is "group" which means it has children (the [objects])
 * "children" is the set of child definitions (the [objects])
 */
// Labels that show up as catagories of options.
const QUERY_OPTIONS = "Query options";
const GENERAL_OPTIONS = "General Use Options";
const QUERY_OPTIONS_ADVANCED = "Advanced Use Options";
const CMD_OPTIONS = "Command Processing Options";
const PSEL_OPTIONS = "General Primary Selection Options";
const PSEL_OPTIONS_ADVANCED = "Advanced Use Primary Selection Options";
const TEST_OPTIONS = "Debug and Test Options";
const SUBMIT_OPTIONS = "Job Submission Options";
const QueryDefinition = {
    name: "query",
    aliases: ["q"],
    summary: "- Query the host using (E)JES",
    description: "Query the host using (E)JES.  Return host spool, dataset, and library tables.  " +
        "Return browsable data as reports.  Query commands specify which primary table to query.  " +
        "Each primary table may also have child tables or child reports you can query using the " +
        "--table and/or --report options.  You can access only those primary tables you are authorized to use.",
    type: "group",
    children: [ACtivityDefinition,
        APFdsDefinition,
        CLassDefinition,
        DJcDefinition,
        DYNEXitDefinition,
        ENClaveDefinition,
        ENQDefinition,
        ENQCDefinition,
        ENQDDefinition,
        FSSDefinition,
        GRoupDefinition,
        HCheckDefinition,
        HoldDefinition,
        INITDefinition,
        InputDefinition,
        JESplexDefinition,
        JGroupDefinition,
        LIneDefinition,
        ListDefinition,
        LNKlstDefinition,
        LPAlstDefinition,
        MDsDefinition,
        MEMUsageDefinition,
        MOuntsDefinition,
        NETConnDefinition,
        NETSERVDefinition,
        NJEDefinition,
        NOdeDefinition,
        OFFloadDefinition,
        PAGedsDefinition,
        PARMlibDefinition,
        PRinterDefinition,
        PROClibDefinition,
        PStatusDefinition,
        RESMonDefinition,
        RESOurceDefinition,
        SCHenvDefinition,
        SessionDefinition,
        SPArtDefinition,
        SPVolDefinition,
        StatusDefinition,
        SYMbolDefinition,
        SYSClsDefinition,
        SYSplexDefinition,
        SYSReqDefinition,
        WriterDefinition,
        ZeroDefinition,
    ],
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
        },
        {
            property: "options",
            value: [
                { name: "metafilter", group: GENERAL_OPTIONS,
                    aliases: ["m"],
                    type: "array",
                    description: "Specify row filtering in a table.  Use \"-m help\" for detailed information.   Use \"-m list\" to show available columns.\n\nAllowed value: off, metafilter_construct, list, help" },
                { name: "dest", group: PSEL_OPTIONS,
                    type: "string",
                    description: "Establish up to 8 destination filters.  Filters these tables: hold, hold datasets, writer (output), writer " +
                        "datasets, job status, job status datasets, and job zero.\n\nAllowed values: off, destination-mask(s), list, help" },
                { name: "header", group: QUERY_OPTIONS,
                    type: "string",
                    description: "Specify whether to include headers for tables.",
                    allowableValues: {
                        values: ["on", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "actpurge", group: CMD_OPTIONS,
                    type: "string",
                    description: "Enable cancel/purge commands for executing jobs on job-oriented tables.",
                    allowableValues: {
                        values: ["on", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "submit", group: SUBMIT_OPTIONS,
                    aliases: ["submit", "sub"],
                    type: "string",
                    description: "Submit a local or host file to the host.  Searches the current working directory for the file or the path on the EJES_SUBMIT_PATH environment variable.\n\nAllowed values: local:path, MVS data set, z/OS UNIX path",
                },
                { name: "debug", group: TEST_OPTIONS,
                    aliases: ["dbg", "debug-value", "dv"],
                    type: "string",
                    description: "Specify a numeric debugging mode.\n\nAllowed values: number, list, help",
                    allowableValues: {
                        values: ["\\d+", "list", "help"], caseSensitive: true
                    } },
                { name: "atx", group: PSEL_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Disable selecting APPC/MVS transaction jobs for applicable tables by specifying \"no\".",
                    allowableValues: {
                        values: ["yes", "no", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "acplex", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Set the data gathering scope for the Activity display.",
                    allowableValues: {
                        values: ["jes", "sys", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "cc", group: QUERY_OPTIONS,
                    type: "string",
                    description: "Establish carriage control handling for downloaded reports.",
                    allowableValues: {
                        values: ["discard", "interpret", "keep", "list", "help"],
                        caseSensitive: false
                    } },
                { name: "codepage", group: QUERY_OPTIONS_ADVANCED,
                    aliases: ["--cp"],
                    type: "string",
                    description: "Change the code page set for your installation for output as UTF-8.",
                    allowableValues: {
                        values: ["list", "help", "0", "273", "277", "280", "284", "297", "297", "424", "833", "870", "875", "1026", "1047", "1122", "1141", "1143", "1145", "1147", "1149", "1159",
                            "37", "275", "278", "281", "285", "420", "500", "836", "871", "1025", "1027", "1112", "1140", "1140", "1142", "1144", "1146", "1148", "1153"],
                        caseSensitive: true
                    } },
                { name: "command", group: CMD_OPTIONS,
                    aliases: ["c"],
                    type: "string",
                    description: "Specify a line command.   Use \"-c list\" to show available commands.\n\nAllowed values: command[ argument], list, help" },
                { name: "confirm", group: CMD_OPTIONS,
                    type: "string",
                    description: "Confirm previously queued commands.  Use \"--confirm help\" for detailed information.",
                    allowableValues: {
                        values: ["on", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "countOnly", group: QUERY_OPTIONS,
                    aliases: ["count"],
                    type: "string",
                    description: "When a table or report is selected for output, only output the \"Rows available\" line.",
                    allowableValues: {
                        values: ["on", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "curstep", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Enable extra columns on JES2 Input and Job Status.",
                    allowableValues: {
                        values: ["on", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "datefmt", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Customize date formatting.",
                    allowableValues: {
                        values: ["yyyyddd .", "yyyyddd -", "yyyyddd",
                            "YYYYMMDD /", "YYYYMMDD -", "YYYYMMDD",
                            "YYYYDDMM /", "YYYYDDMM -", "YYYYDDMM",
                            "MMDDYYYY /", "MMDDYYYY -", "MMDDYYYY",
                            "DDMMYYYY /", "DDMMYYYY -", "DDMMYYYY"],
                        caseSensitive: false
                    } },
                { name: "deltxt", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Possibly show canceled or printed data sets in the JES spool.",
                    allowableValues: {
                        values: ["on", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "recfm", group: SUBMIT_OPTIONS,
                    type: "array", description: "Record format." },
                { name: "lrecl", group: SUBMIT_OPTIONS,
                    type: "array", description: "Logical record length." },
                { name: "unit", group: SUBMIT_OPTIONS,
                    type: "array", description: "Generic or esoteric unit name where an uncataloged MVS data set resides." },
                { name: "volume", group: SUBMIT_OPTIONS,
                    type: "array", description: "Volume serial where an uncataloged MVS data set resides." },
                { name: "subsys", group: SUBMIT_OPTIONS,
                    type: "array", description: "Subsystem name where the job should be sent. If not speficied defaults to the subsystem under which the current (E)JES session is running.",
                    allowableValues: {
                        values: ["jes2", "jes3", "list", "help"],
                        caseSensitive: false
                    } },
                { name: "dry-run", group: TEST_OPTIONS,
                    aliases: ["n"],
                    type: "array",
                    description: "Run under dry-run protocols.",
                    allowableValues: {
                        values: ["syntax", "check", "all", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "hidecols", group: QUERY_OPTIONS,
                    type: "string",
                    description: "Specify columns to hide in a table.   Use \"--hidecols list\" to show available columns.\n\nAllowed values: column-key..., list, help]" },
                { name: "immediate", group: CMD_OPTIONS,
                    aliases: ["i"],
                    type: "string",
                    description: "Run line commands without confirmation.",
                    implies: ["command"],
                    allowableValues: {
                        values: ["fast", "slow", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "inptxt", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Show in-stream SYSIN data sets.",
                    allowableValues: {
                        values: ["on", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "jes2", group: QUERY_OPTIONS_ADVANCED,
                    aliases: ["2"],
                    type: "boolean",
                    description: "Use the JES2 spooler instead of the default spooler." },
                { name: "jes3", group: QUERY_OPTIONS_ADVANCED,
                    aliases: ["3"],
                    type: "boolean",
                    description: "Use the JES3 or JES3plus spooler instead of the default spooler." },
                { name: "job", group: PSEL_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Disable selecting batch jobs for applicable tables by specifying \"no\".",
                    allowableValues: {
                        values: ["yes", "no", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "jobclass", group: PSEL_OPTIONS,
                    type: "string",
                    description: "Establish up to 4 job class filter masks.  Filters these tables: activity, input, hold, writer (output), job " +
                        "status, mds, and nje.\n\nAllowed values: off, jobclass-mask(s), list, help" },
                { name: "jobname", group: PSEL_OPTIONS,
                    aliases: ["j"],
                    type: "string",
                    description: "Establish up to 8 job name filter masks.  Filters these tables: activity, input, hold, writer (output), " +
                        "nje, status, and mds.\n\nAllowed values: off, jobname-mask(s), list, help" },
                { name: "lines", group: QUERY_OPTIONS,
                    aliases: ["y"],
                    type: "string",
                    description: "Specify lines in a table or report.\n\nDefault value: &nbspTable: Terminal rows - 6, Report: 1000\nAllowed values: 1000, number, all, list, help" },
                { name: "max", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Change level of detail to show maximum number of columns.  Filters these tables: activity, djc, hold, input, " +
                        "job status, nje, and writer.",
                    allowableValues: {
                        values: ["on", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "numchar", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Establish the numeric magnitude and decimal separator character to be used when formatting numeric values.\n\nAllowed values: 'MD', 'M ' where M is a magnitude character, D is a decimal character, and either can be blank." },
                { name: "pdf", group: QUERY_OPTIONS,
                    type: "array",
                    description: "Output a report in PDF format to a host provided file name corresponding to the data set.  Optionally provide a file name or path.  The EJES_DOWNLOAD_PATH environment variable value is prepended if a path is not provided." },
                { name: "text", group: QUERY_OPTIONS,
                    aliases: ["txt"],
                    type: "array",
                    description: "Output a report in text format to a host provided file name corresponding to the data set.  Optionally provide a file name or path.  The EJES_DOWNLOAD_PATH environment variable value is prepended if a path is not provided." },
                { name: "origin", group: PSEL_OPTIONS,
                    type: "string",
                    description: "Establish up to 4 job origin filters.  Filters these tables: activity, input, hold, writer (output), job " +
                        "status, mds, and nje.\n\nAllowed values: off, origin-mask(s), list, help" },
                { name: "owner", group: PSEL_OPTIONS,
                    aliases: ["o"],
                    type: "string",
                    description: "Specify up to 8 owner masks.\n\nAllowed values: off, name-mask(s), list, help" },
                { name: "report", group: GENERAL_OPTIONS,
                    aliases: ["r"],
                    type: "array",
                    description: "Specify a child report to output.  Only the first row of the table is selected for the report.  You may want to use --sort, --select, or --metafilter to position the desired report as the first row.  Use \"-r list\" to show available reports.\n\nDefault value: &nbspb\nAllowed values: browse-linecommand, list, help" },
                { name: "select", group: GENERAL_OPTIONS,
                    aliases: ["s"],
                    type: "array",
                    description: "Specify column selections (TSELECT).  Use \"-s help\" for detailed information.  Use \"-s list\" to show available arguments for the table.\n\nAllowed values: off, select_construct, list, help" },
                { name: "setup", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "On Printer/Punch table, show required attributes of devices in setup status (on) or show current attributes of devices in setup status(off).",
                    allowableValues: {
                        values: ["on", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "showcols", group: GENERAL_OPTIONS,
                    aliases: ["w"],
                    type: "string",
                    description: "Specify the only columns to show in a table being output, and their order.  It does not apply to the parent tables of the output table.  Use \"-w list\" to show available columns.\n\nAllowed values: column-key..., list, help" },
                { name: "sort", group: GENERAL_OPTIONS,
                    aliases: ["z"],
                    type: "array",
                    description: "Specify column sorting.   Use \"-z list\" to show available columns.\n\nAllowed values: off, sort_construct, list, help" },
                { name: "start", group: QUERY_OPTIONS,
                    type: "string",
                    description: "Specify the beginning line number for a report.\n\nAllowed values: number, 1, list, help" },
                { name: "stc", group: PSEL_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Disable selecting started tasks for applicable tables by specifying \"no\".",
                    allowableValues: {
                        values: ["yes", "no", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "sysclass", group: PSEL_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Establish up to 8 1-character sysclasses without spaces.  Filters these tables: hold, hold datasets, writer (output), " +
                        "writer datasets, job status, job status datasets and job zero.\n\nAllowed values: off, sysclass(es), list, help" },
                { name: "sysname", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Set the server system name filter. This filter limits the systems from which peer-to-peer remote server data " +
                        "is gathered.\n\nAllowed values: system-mask, '', *, list, help" },
                { name: "systxt", group: QUERY_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Show internal JES data sets.",
                    allowableValues: {
                        values: ["on", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "table", group: GENERAL_OPTIONS,
                    aliases: ["t"],
                    type: "array",
                    description: "Specify a child table.  Use \"-t list\" to show available tables.\n\nDefault value: &nbsps\nAllowed values: tabular-linecommand, list, help" },
                { name: "tsu", group: PSEL_OPTIONS_ADVANCED,
                    type: "string",
                    description: "Disable selecting TSO user output for applicable tables by specifying \"no\".",
                    allowableValues: {
                        values: ["yes", "no", "off", "list", "help"],
                        caseSensitive: true
                    } },
                { name: "usr", group: PSEL_OPTIONS_ADVANCED,
                    aliases: ["userid"],
                    type: "string",
                    description: "Establish up to 8 submitter user filters. Filters these tables: activity, input, hold, writer (output), job " +
                        "status, mds, and nje.\n\nAllowed values: off, user-mask(s), list, help" },
                { name: "width", group: QUERY_OPTIONS,
                    aliases: ["x"],
                    type: "string",
                    description: "Specify maximum characters per line or row.\n\nDefault value: &nbsptty default character width\nAllowed values: number, all, list, help" },
            ],
            merge: true,
            ignoreNodes: [{
                    type: "group"
                }]
        }
    ],
    examples: [{
            description: "Customize status table output.\n\n" +
                "(1) Limit to owners beginning with \"rb\".  If not specified, the owner will be the same as " +
                "your logon id.  To specify all, use an asterisk(*).  " +
                "(2) Filter rows to display only abends.  " +
                "(3) Show only relevant columns and arrange in the order desired.  " +
                "(4) Limit the number of lines, including headers, to 10.  " +
                "(5) Remove header lines." +
                "\n\n  Example",
            options: "st --owner rb* --metafilter \"maxcomp eq ab*\" \n         --showcols \"jobname maxcomp status jobid rec\" --lines 10 --header off"
        }, {
            description: "Display a table of data sets for a specific job on the spool by job id.\n\n" +
                "(1) Select job 0437107.  The asterisk causes the positional job name to be ignored.  " +
                "(2) Display a child table by table type.  Data sets status is \"s\" on the status table." +
                "\n\n  Example",
            options: "st --select \"* j0437107\" --table s"
        }, {
            description: "List the available table types for the child table.\n\n" +
                "The \"list\" argument may be used on any option.  A table for that " +
                "option will be displayed and any other work will stop.  The table " +
                "may display available tables, reports, columns, for positional " +
                "input fields depending on the option." +
                "\n\n  Example",
            options: "st --table list"
        }, {
            description: "Provide detailed help for the metafilter option.\n\n" +
                "  The \"help\" argument may be used on any option.  " +
                "  Help for the option will be displayed and any other work will stop." +
                "\n\n  Example",
            options: "hchk --metafilter help"
        }
    ]
};
module.exports = QueryDefinition;
//# sourceMappingURL=query.definition.js.map