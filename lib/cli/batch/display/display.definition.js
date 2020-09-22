"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Definition = exports.ZeroDefinition = exports.WriterDefinition = exports.UlogDefinition = exports.SYSReqDefinition = exports.SYSplexDefinition = exports.SYSClsDefinition = exports.SYMbolDefinition = exports.StatusDefinition = exports.SPVolDefinition = exports.SPArtDefinition = exports.SessionDefinition = exports.SCHenvDefinition = exports.RESOurceDefinition = exports.RESMonDefinition = exports.QueryDefinition = exports.PStatusDefinition = exports.PROClibDefinition = exports.PRinterDefinition = exports.PARMlibDefinition = exports.PAGedsDefinition = exports.OutputDefinition = exports.OFFloadDefinition = exports.NOdeDefinition = exports.NJEDefinition = exports.NETSERVDefinition = exports.NETConnDefinition = exports.MOuntsDefinition = exports.MenuDefinition = exports.MEMUsageDefinition = exports.MDsDefinition = exports.LogDefinition = exports.LPAlstDefinition = exports.LNKlstDefinition = exports.LIneDefinition = exports.JGroupDefinition = exports.JESplexDefinition = exports.InputDefinition = exports.INITDefinition = exports.HoldDefinition = exports.HCheckDefinition = exports.GRoupDefinition = exports.FSSDefinition = exports.EntryDefinition = exports.ENQDDefinition = exports.ENQCDefinition = exports.ENQDefinition = exports.ENClaveDefinition = exports.DYNEXitDefinition = exports.DJcDefinition = exports.CommandDefinition = exports.CLassDefinition = exports.APFdsDefinition = exports.ActivityDefinition = void 0;
const Shared_1 = require("../Shared");
const common = ", then enter the EJES Batch Shell.";
exports.ActivityDefinition = {
    name: "activity",
    aliases: ["ac"],
    summary: "* Display job activity.",
    description: "Display jobs in all active address spaces for the JESplex or sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.ActivityDefinition, primary: true, system: true });
exports.APFdsDefinition = {
    name: "apfds",
    aliases: ["apf"],
    summary: "* APF-authorized libraries.",
    description: "Display APF-authorized libraries defined to the systems in your sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.APFdsDefinition, parms: true, system: true });
exports.CLassDefinition = {
    name: "class",
    aliases: ["cl"],
    summary: "* Display job classes.",
    description: "Display job classes defined for the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.CLassDefinition });
exports.CommandDefinition = {
    name: "command",
    alias: ["com"],
    summary: "* Display the long command processor.",
    description: "Display the long command processor" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.CommandDefinition });
exports.DJcDefinition = {
    name: "djc",
    aliases: ["dj"],
    summary: "* Display JES3 dependent job network.",
    description: "Display a table of Dependent Job Control networks in the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.DJcDefinition });
exports.DYNEXitDefinition = {
    name: "dynexit",
    aliases: ["dynex", "dynx"],
    summary: "* Display dynamic exits.",
    description: "Display a table of MVS dynamic exits defined within the current sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.DYNEXitDefinition, parms: true, system: true });
exports.ENClaveDefinition = {
    name: "enclave",
    aliases: ["enc"],
    summary: "* Display enclaves.",
    description: "Display a table of WLM enclaves defined within the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.ENClaveDefinition, system: true });
exports.ENQDefinition = {
    name: "enq",
    summary: "* Display ENQs.",
    description: "Display a table of information about ENQs and RESERVEs in the sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.ENQDefinition, parms: true, system: true });
exports.ENQCDefinition = {
    name: "enqc",
    summary: "* Display ENQ contentions.",
    description: "Display a table of information about ENQ contention in the sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.ENQCDefinition, parms: true, system: true });
exports.ENQDDefinition = {
    name: "enqd",
    summary: "* Display ENQ SYSDSN resources.",
    description: "Display a table of information about ENQ SYSDSN resources in the sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.ENQDDefinition, parms: true, system: true });
exports.EntryDefinition = {
    name: "entry",
    aliases: ["ent"],
    summary: "* Display entry panel.",
    description: "Display the (E)JES entry panel" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.EntryDefinition });
exports.FSSDefinition = {
    name: "fss",
    summary: "* Display functional subsystems.",
    description: "Display a table of Functional Subsystems defined for the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.FSSDefinition });
exports.GRoupDefinition = {
    name: "group",
    aliases: ["gr"],
    summary: "* Display job class groups.",
    description: "Display a table of Generalized Main Scheduler parameters for job class groups in the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.GRoupDefinition, parms: true, primary: true, system: true });
exports.HCheckDefinition = {
    name: "hcheck",
    aliases: ["hchk", "hc"],
    summary: "* Display health checks.",
    description: "Display a table of the about checks registered with IBM Health Checker for z/OS" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.HCheckDefinition, parms: true });
exports.HoldDefinition = {
    name: "hold",
    aliases: ["h"],
    summary: "* Display jobs in hold status.",
    description: "Display a table of the sysout in the Hold queue" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.HoldDefinition, primary: true });
exports.INITDefinition = {
    name: "init",
    summary: "* Display JES2 initiators.",
    description: "Display a table of JES2-managed batch initiators defined for the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.INITDefinition, primary: true });
exports.InputDefinition = {
    name: "input",
    aliases: ["i"],
    summary: "* Display jobs in input status.",
    description: "Display a table of all jobs in the JESplex that are in pre-execution and execution status" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.InputDefinition, parms: true, system: true });
exports.JESplexDefinition = {
    name: "jesplex",
    aliases: ["jesp"],
    summary: "* Display JESplex table.",
    description: "Display a table of JES images in your z/OS JESplex" + common + "  A JES2 JESplex is also known as a Multi-Access SPOOL configuration or MAS.  A JES3 JESplex is also known as a JES3 complex. ",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.JESplexDefinition });
exports.JGroupDefinition = {
    name: "jgroup",
    aliases: ["jg"],
    summary: "* Display job groups.",
    description: "Display a table of the active job groups in the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.JGroupDefinition });
exports.LIneDefinition = {
    name: "line",
    aliases: ["li"],
    summary: "* Display JES3 dependent job network.",
    description: "Display a table of the lines that connect NJE nodes to your JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.LIneDefinition, parms: true, primary: true, system: true });
exports.LNKlstDefinition = {
    name: "lnklst",
    aliases: ["lnkl", "lnk"],
    summary: "* Display link list data sets.",
    description: "Display a table of data sets in the link list concatenation of the link list libraries defined to the systems in your sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.LNKlstDefinition, parms: true });
exports.LPAlstDefinition = {
    name: "lpalst",
    aliases: ["lpal", "lpa"],
    summary: "* Display link pack data sets.",
    description: "Display a table of data sets in the LPA concatenation of the link pack libraries defined to the systems in your sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.LPAlstDefinition, parms: true, system: true });
exports.LogDefinition = {
    name: "log",
    summary: "* Display the log.",
    description: "Display the log" + common + "  You may optionally specify operlog or syslog, or command stack 'logattr on' to see the operlog display in MCS Console colors.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.LogDefinition, parms: true });
exports.MDsDefinition = {
    name: "mds",
    aliases: ["md"],
    summary: "* Display JES3 MDS jobs.",
    description: "Display a table of jobs in the JESplex that are currently delayed in one of the Main Device Scheduler queues" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.MDsDefinition, primary: true });
exports.MEMUsageDefinition = {
    name: "memusage",
    aliases: ["memuse", "memu"],
    summary: "* Display memory usage tabl.",
    description: "Display a table of real and virtual memory requirements of jobs and other tasks running within your sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.MEMUsageDefinition, parms: true, primary: true, system: true });
exports.MenuDefinition = {
    name: "menu",
    summary: "* Display or control the (E)JES menu.",
    description: "Display or control the (E)JES menu" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.MenuDefinition, parms: true });
exports.MOuntsDefinition = {
    name: "mounts",
    aliases: ["mount", "mo"],
    summary: "* Display z/OS UNIX mounts.",
    description: "Display a table of mounted file systems within the sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.MOuntsDefinition, parms: true, system: true });
exports.NETConnDefinition = {
    name: "netconn",
    aliases: ["netc", "nc"],
    summary: "* Display network job entry connections.",
    description: "Display a table of NJE (Network Job Entry) connection" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.NETConnDefinition, parms: true, system: true });
exports.NETSERVDefinition = {
    name: "netserv",
    aliases: ["nets"],
    summary: "* Display network servers.",
    description: "Display a table of NJE network servers" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.NETSERVDefinition, system: true });
exports.NJEDefinition = {
    name: "nje",
    summary: "* Display JES3 NJE sysout.",
    description: "Display a table of sysout in the Bulk Data Transfer and TCP/IP NJE queues" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.NJEDefinition, primary: true });
exports.NOdeDefinition = {
    name: "node",
    aliases: ["ph"],
    summary: "* Display NJE nodes.",
    description: "Display a table of the NJE nodes defined to the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.NOdeDefinition, parms: true, system: true });
exports.OFFloadDefinition = {
    name: "offload",
    aliases: ["off"],
    summary: "* Display JES2 spool offloader devices.",
    description: "Display a table of the JES2 spool offload devices in your JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.OFFloadDefinition });
exports.OutputDefinition = {
    name: "Output",
    aliases: ["o"],
    summary: "* Display JES2 output sysout.",
    description: "Display a table of sysout in the JES2 Output queue" + common + "  The interchangeable terms Output queue and Writer queue are used by the two JESes to describe the queue from which JES-managed or FSS-managed printers can select work.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.OutputDefinition, parms: true, primary: true });
exports.PAGedsDefinition = {
    name: "pageds",
    aliases: ["pag", "page", "paged"],
    summary: "* Display page data set resources.",
    description: "Display a table of paging resources defined to the systems in your sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.PAGedsDefinition, parms: true, system: true });
exports.PARMlibDefinition = {
    name: "parmlib",
    aliases: ["parml", "parm"],
    summary: "* Display parameter library data sets.",
    description: "Display a table of information about system parameter libraries defined to the systems in your sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.PARMlibDefinition });
exports.PRinterDefinition = {
    name: "printer",
    aliases: ["pr"],
    summary: "* Display printers and punches.",
    description: "Display a table of JES writers which drive local, FSS, and signed-on/logged-on remote printer and punch devices attached to the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.PRinterDefinition, parms: true, system: true });
exports.PROClibDefinition = {
    name: "proclib",
    aliases: ["procl", "proc"],
    summary: "* Display proclib data sets.",
    description: "Display a table of information about your JES proclib concatenations" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.PROClibDefinition });
exports.PStatusDefinition = {
    name: "pstatus",
    aliases: ["pstat", "ps"],
    summary: "* Display UNIX process statuses.",
    description: "Display a table of z/OS UNIX processes running in the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.PStatusDefinition, parms: true, primary: true, system: true });
exports.QueryDefinition = {
    name: "query",
    summary: "* Display your authorization.",
    description: "Display displays or primary commands your credentials authorize" + common + "  The positional operand is required and may be 'auth' or 'auth display'.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.QueryDefinition, parms: true, parmRequired: true });
exports.RESMonDefinition = {
    name: "resmon",
    aliases: ["resm", "rmon", "rm"],
    summary: "* Display JES2 resource monitor.",
    description: "Display a table of JES resources for the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.RESMonDefinition, parms: true, system: true });
exports.RESOurceDefinition = {
    name: "resource",
    aliases: ["reso"],
    summary: "* Display WLM resources.",
    description: "Display a table of the WLM Resources defined for the current sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.RESOurceDefinition, parms: true });
exports.SCHenvDefinition = {
    name: "schenv",
    aliases: ["sch"],
    summary: "* Display WLM scheduling environments.",
    description: "Display a table of the WLM Scheduling Environments defined for the current sysplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SCHenvDefinition, parms: true });
exports.SessionDefinition = {
    name: "session",
    aliases: ["sess"],
    summary: "* Display (E)JES session activity.",
    description: "Display a table of all active (E)JES sessions" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SessionDefinition, parms: true, system: true });
exports.SPArtDefinition = {
    name: "spart",
    aliases: ["spa"],
    summary: "* Display spool partitions.",
    description: "Display a table of the SPOOL partition configuration of your JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SPArtDefinition, parms: true });
exports.SPVolDefinition = {
    name: "spvol",
    aliases: ["spv"],
    summary: "* Display spool volume extents.",
    description: "Display a table of the SPOOL volume extent configuration of your JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SPVolDefinition });
exports.StatusDefinition = {
    name: "status",
    aliases: ["st"],
    summary: "* Display job status.",
    description: "Display jobs in the JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.StatusDefinition, primary: true });
exports.SYMbolDefinition = {
    name: "symbol",
    aliases: ["sym"],
    summary: "* Display system symbols.",
    description: "Display a table of z/OS system symbols as well as JES and JCL symbols defined for the current address space" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SYMbolDefinition, parms: true, system: true });
exports.SYSClsDefinition = {
    name: "syscls",
    aliases: ["sysc"],
    summary: "* Display sysout classes.",
    description: "Display a table of the sysout class configuration for your JESplex" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SYSClsDefinition });
exports.SYSplexDefinition = {
    name: "sysplex",
    aliases: ["sysp", "sys"],
    summary: "* Display sysplex members.",
    description: "Display a table of  the connected system images in your z/OS sysplex" + common + "  In a monoplex, you manage the current system only (i.e., the image on which your (E)JES session is executing).",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SYSplexDefinition, system: true });
exports.SYSReqDefinition = {
    name: "sysreq",
    aliases: ["sysr", "sr"],
    summary: "* Display system requests.",
    description: "Display a table of outstanding replies and messages retained by the MVS Action Message Retention Facility (AMRF)" + common + "  Outstanding replies and action messages for the entire sysplex are shown.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.SYSReqDefinition, parms: true });
exports.UlogDefinition = {
    name: "ulog",
    aliases: ["ph"],
    summary: "* Display your ULOG.",
    description: "Display the user log console browser" + common + "  The optional parameter allows you to specify a console name other than that which would normally be chosen automatically.  Please refer to the CONSOLE command documentation for considerations when specifying a console name.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.UlogDefinition, parms: true });
exports.WriterDefinition = {
    name: "writer",
    aliases: ["w"],
    summary: "* Display JES3 writer sysout.",
    description: "Display a table of sysout in the JES3 Writer queue" + common + "  The interchangeable terms Output queue and Writer queue are used by the two JESes to describe the queue from which JES-managed or FSS-managed printers can select work.",
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.WriterDefinition, parms: true, primary: true });
exports.ZeroDefinition = {
    name: "zero",
    aliases: ["z"],
    summary: "* Display JES3 Job zero sysout datasets.",
    description: "Display a table of sysout data sets created by JES3 internal facilities" + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.ZeroDefinition, parms: true, primary: true });
exports.Definition = {
    name: "Placeholder",
    aliases: ["ph"],
    summary: "* Display .",
    description: "Display " + common,
    type: "command",
    handler: __dirname + "/../Batch.handler",
};
Shared_1.addShared({ obj: exports.Definition, parms: true, primary: true, system: true });
//# sourceMappingURL=display.definition.js.map