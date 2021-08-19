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
import { Idef, addShared } from "../Shared";

const common = ", then enter the EJES Batch Shell.";

export const ActivityDefinition: ICommandDefinition = {
   name:        "activity",
   aliases:     ["ac"],
   summary:     "* Display job activity.",
   description: "Display jobs in all active address spaces for the JESplex or sysplex" + common,
   type:        "command",
   handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: ActivityDefinition, primary: true, system: true});

export const APFdsDefinition: ICommandDefinition = {
  name:        "apfds",
  aliases:     ["apf"],
  summary:     "* APF-authorized libraries.",
  description: "Display APF-authorized libraries defined to the systems in your sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: APFdsDefinition, parms: true, system: true});

export const CLassDefinition: ICommandDefinition = {
  name:        "class",
  aliases:     ["cl"],
  summary:     "* Display job classes.",
  description: "Display job classes defined for the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: CLassDefinition});

export const CommandDefinition: ICommandDefinition = {
  name:        "command",
  alias:       ["com"],
  summary:     "* Display the long command processor.",
  description: "Display the long command processor" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: CommandDefinition });

export const DJcDefinition: ICommandDefinition = {
  name:        "djc",
  aliases:     ["dj"],
  summary:     "* Display JES3 dependent job network.",
  description: "Display a table of Dependent Job Control networks in the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: DJcDefinition});

export const DYNEXitDefinition: ICommandDefinition = {
  name:        "dynexit",
  aliases:     ["dynex", "dynx"],
  summary:     "* Display dynamic exits.",
  description: "Display a table of MVS dynamic exits defined within the current sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: DYNEXitDefinition, parms: true, system: true});

export const ENClaveDefinition: ICommandDefinition = {
  name:        "enclave",
  aliases:     ["enc"],
  summary:     "* Display enclaves.",
  description: "Display a table of WLM enclaves defined within the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: ENClaveDefinition, system: true});

export const ENQDefinition: ICommandDefinition = {
  name:        "enq",
  summary:     "* Display ENQs.",
  description: "Display a table of information about ENQs and RESERVEs in the sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: ENQDefinition, parms: true, system: true});

export const ENQCDefinition: ICommandDefinition = {
  name:        "enqc",
  summary:     "* Display ENQ contentions.",
  description: "Display a table of information about ENQ contention in the sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: ENQCDefinition, parms: true, system: true});

export const ENQDDefinition: ICommandDefinition = {
  name:        "enqd",
  summary:     "* Display ENQ SYSDSN resources.",
  description: "Display a table of information about ENQ SYSDSN resources in the sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: ENQDDefinition, parms: true, system: true});

export const EntryDefinition: ICommandDefinition = {
  name:        "entry",
  aliases:     ["ent"],
  summary:     "* Display entry panel.",
  description: "Display the (E)JES entry panel" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: EntryDefinition });

export const FSSDefinition: ICommandDefinition = {
  name:        "fss",
  summary:     "* Display functional subsystems.",
  description: "Display a table of Functional Subsystems defined for the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: FSSDefinition });

export const GRoupDefinition: ICommandDefinition = {
  name:        "group",
  aliases:     ["gr"],
  summary:     "* Display job class groups.",
  description: "Display a table of Generalized Main Scheduler parameters for job class groups in the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: GRoupDefinition, parms: true, primary: true, system: true});

export const HCheckDefinition: ICommandDefinition = {
  name:        "hcheck",
  aliases:     ["hchk", "hc"],
  summary:     "* Display health checks.",
  description: "Display a table of the about checks registered with IBM Health Checker for z/OS" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: HCheckDefinition, parms: true});

export const HoldDefinition: ICommandDefinition = {
  name:        "hold",
  aliases:     ["h"],
  summary:     "* Display jobs in hold status.",
  description: "Display a table of the sysout in the Hold queue" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: HoldDefinition, primary: true});

export const INITDefinition: ICommandDefinition = {
  name:        "init",
  summary:     "* Display JES2 initiators.",
  description: "Display a table of JES2-managed batch initiators defined for the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: INITDefinition, primary: true});

export const InputDefinition: ICommandDefinition = {
  name:        "input",
  aliases:     ["i"],
  summary:     "* Display jobs in input status.",
  description: "Display a table of all jobs in the JESplex that are in pre-execution and execution status" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};

addShared({ obj: InputDefinition, parms: true, system: true});

export const JESplexDefinition: ICommandDefinition = {
  name:        "jesplex",
  aliases:     ["jesp"],
  summary:     "* Display JESplex table.",
  description: "Display a table of JES images in your z/OS JESplex" + common + "  A JES2 JESplex is also known as a Multi-Access SPOOL configuration or MAS.  A JES3 JESplex is also known as a JES3 complex. ",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: JESplexDefinition});

export const JGroupDefinition: ICommandDefinition = {
  name:        "jgroup",
  aliases:     ["jg"],
  summary:     "* Display job groups.",
  description: "Display a table of the active job groups in the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: JGroupDefinition });

export const LIneDefinition: ICommandDefinition = {
  name:        "line",
  aliases:     ["li"],
  summary:     "* Display JES3 dependent job network.",
  description: "Display a table of the lines that connect NJE nodes to your JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: LIneDefinition, parms: true, primary: true, system: true});

export const LNKlstDefinition: ICommandDefinition = {
  name:        "lnklst",
  aliases:     ["lnkl", "lnk"],
  summary:     "* Display link list data sets.",
  description: "Display a table of data sets in the link list concatenation of the link list libraries defined to the systems in your sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: LNKlstDefinition, parms: true});

export const LPAlstDefinition: ICommandDefinition = {
  name:        "lpalst",
  aliases:     ["lpal", "lpa"],
  summary:     "* Display link pack data sets.",
  description: "Display a table of data sets in the LPA concatenation of the link pack libraries defined to the systems in your sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: LPAlstDefinition, parms: true, system: true});

export const LogDefinition: ICommandDefinition = {
  name:        "log",
  summary:     "* Display the log.",
  description: "Display the log" + common + "  You may optionally specify operlog or syslog, or command stack 'logattr on' to see the operlog display in MCS Console colors.",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: LogDefinition, parms: true });

export const MDsDefinition: ICommandDefinition = {
  name:        "mds",
  aliases:     ["md"],
  summary:     "* Display JES3 MDS jobs.",
  description: "Display a table of jobs in the JESplex that are currently delayed in one of the Main Device Scheduler queues" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: MDsDefinition, primary: true});

export const MEMUsageDefinition: ICommandDefinition = {
  name:        "memusage",
  aliases:     ["memuse", "memu"],
  summary:     "* Display memory usage tabl.",
  description: "Display a table of real and virtual memory requirements of jobs and other tasks running within your sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: MEMUsageDefinition, parms: true, primary: true, system: true});

export const MenuDefinition: ICommandDefinition = {
  name:        "menu",
  summary:     "* Display or control the (E)JES menu.",
  description: "Display or control the (E)JES menu" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: MenuDefinition, parms: true });

export const MOuntsDefinition: ICommandDefinition = {
  name:        "mounts",
  aliases:     ["mount", "mo"],
  summary:     "* Display z/OS UNIX mounts.",
  description: "Display a table of mounted file systems within the sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: MOuntsDefinition, parms: true, system: true});

export const NETConnDefinition: ICommandDefinition = {
  name:        "netconn",
  aliases:     ["netc", "nc"],
  summary:     "* Display network job entry connections.",
  description: "Display a table of NJE (Network Job Entry) connection" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: NETConnDefinition, parms: true, system: true});

export const NETSERVDefinition: ICommandDefinition = {
  name:        "netserv",
  aliases:     ["nets"],
  summary:     "* Display network servers.",
  description: "Display a table of NJE network servers" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: NETSERVDefinition, system: true});

export const NJEDefinition: ICommandDefinition = {
  name:        "nje",
  summary:     "* Display JES3 NJE sysout.",
  description: "Display a table of sysout in the Bulk Data Transfer and TCP/IP NJE queues" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: NJEDefinition, primary: true});

export const NOdeDefinition: ICommandDefinition = {
  name:        "node",
  aliases:     ["ph"],
  summary:     "* Display NJE nodes.",
  description: "Display a table of the NJE nodes defined to the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: NOdeDefinition, parms: true, system: true});

export const OFFloadDefinition: ICommandDefinition = {
  name:        "offload",
  aliases:     ["off"],
  summary:     "* Display JES2 spool offloader devices.",
  description: "Display a table of the JES2 spool offload devices in your JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: OFFloadDefinition });

export const OutputDefinition: ICommandDefinition = {
  name:        "Output",
  aliases:     ["o"],
  summary:     "* Display JES2 output sysout.",
  description: "Display a table of sysout in the JES2 Output queue" + common + "  The interchangeable terms Output queue and Writer queue are used by the two JESes to describe the queue from which JES-managed or FSS-managed printers can select work.",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: OutputDefinition, parms: true, primary: true });

export const PAGedsDefinition: ICommandDefinition = {
  name:        "pageds",
  aliases:     ["pag", "page", "paged"],
  summary:     "* Display page data set resources.",
  description: "Display a table of paging resources defined to the systems in your sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: PAGedsDefinition, parms: true, system: true});

export const PARMlibDefinition: ICommandDefinition = {
  name:        "parmlib",
  aliases:     ["parml", "parm"],
  summary:     "* Display parameter library data sets.",
  description: "Display a table of information about system parameter libraries defined to the systems in your sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: PARMlibDefinition });

export const PRinterDefinition: ICommandDefinition = {
  name:        "printer",
  aliases:     ["pr"],
  summary:     "* Display printers and punches.",
  description: "Display a table of JES writers which drive local, FSS, and signed-on/logged-on remote printer and punch devices attached to the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: PRinterDefinition, parms: true, system: true});

export const PROClibDefinition: ICommandDefinition = {
  name:        "proclib",
  aliases:     ["procl", "proc"],
  summary:     "* Display proclib data sets.",
  description: "Display a table of information about your JES proclib concatenations" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: PROClibDefinition });

export const PStatusDefinition: ICommandDefinition = {
  name:        "pstatus",
  aliases:     ["pstat", "ps"],
  summary:     "* Display UNIX process statuses.",
  description: "Display a table of z/OS UNIX processes running in the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: PStatusDefinition, parms: true, primary: true, system: true});

export const QueryDefinition: ICommandDefinition = {
  name:        "query",
  summary:     "* Display your authorization.",
  description: "Display displays or primary commands your credentials authorize" + common + "  The positional operand is required and may be 'auth' or 'auth display'.",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: QueryDefinition, parms: true, parmRequired: true});

export const RESMonDefinition: ICommandDefinition = {
  name:        "resmon",
  aliases:     ["resm", "rmon", "rm"],
  summary:     "* Display JES2 resource monitor.",
  description: "Display a table of JES resources for the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: RESMonDefinition, parms: true, system: true});

export const RESOurceDefinition: ICommandDefinition = {
  name:        "resource",
  aliases:     ["reso"],
  summary:     "* Display WLM resources.",
  description: "Display a table of the WLM Resources defined for the current sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: RESOurceDefinition, parms: true });

export const SCHenvDefinition: ICommandDefinition = {
  name:        "schenv",
  aliases:     ["sch"],
  summary:     "* Display WLM scheduling environments.",
  description: "Display a table of the WLM Scheduling Environments defined for the current sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SCHenvDefinition, parms: true });

export const SessionDefinition: ICommandDefinition = {
  name:        "session",
  aliases:     ["sess"],
  summary:     "* Display (E)JES session activity.",
  description: "Display a table of all active (E)JES sessions" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SessionDefinition, parms: true, system: true});

export const SPArtDefinition: ICommandDefinition = {
  name:        "spart",
  aliases:     ["spa"],
  summary:     "* Display spool partitions.",
  description: "Display a table of the SPOOL partition configuration of your JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SPArtDefinition, parms: true });

export const SPVolDefinition: ICommandDefinition = {
  name:        "spvol",
  aliases:     ["spv"],
  summary:     "* Display spool volume extents.",
  description: "Display a table of the SPOOL volume extent configuration of your JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SPVolDefinition });

export const StatusDefinition: ICommandDefinition = {
  name:        "status",
  aliases:     ["st"],
  summary:     "* Display job status.",
  description: "Display jobs in the JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: StatusDefinition, primary: true});

export const SUBSYStemDefinition: ICommandDefinition = {
  name:        "subsys",
  aliases:     ["subsy", "subs"],
  summary:     "* Display MVS subsystems.",
  description: "Display a table of all the MVS subsystems defined to the systems in your sysplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SUBSYStemDefinition, primary: true});

export const SYMbolDefinition: ICommandDefinition = {
  name:        "symbol",
  aliases:     ["sym"],
  summary:     "* Display system symbols.",
  description: "Display a table of z/OS system symbols as well as JES and JCL symbols defined for the current address space" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SYMbolDefinition, parms: true, system: true });

export const SYSClsDefinition: ICommandDefinition = {
  name:        "syscls",
  aliases:     ["sysc"],
  summary:     "* Display sysout classes.",
  description: "Display a table of the sysout class configuration for your JESplex" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SYSClsDefinition });

export const SYSplexDefinition: ICommandDefinition = {
  name:        "sysplex",
  aliases:     ["sysp", "sys"],
  summary:     "* Display sysplex members.",
  description: "Display a table of  the connected system images in your z/OS sysplex" + common + "  In a monoplex, you manage the current system only (i.e., the image on which your (E)JES session is executing).",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SYSplexDefinition, system: true });

export const SYSReqDefinition: ICommandDefinition = {
  name:        "sysreq",
  aliases:     ["sysr", "sr"],
  summary:     "* Display system requests.",
  description: "Display a table of outstanding replies and messages retained by the MVS Action Message Retention Facility (AMRF)" + common + "  Outstanding replies and action messages for the entire sysplex are shown.",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: SYSReqDefinition, parms: true });

export const UlogDefinition: ICommandDefinition = {
  name:        "ulog",
  aliases:     ["ph"],
  summary:     "* Display your ULOG.",
  description: "Display the user log console browser" + common + "  The optional parameter allows you to specify a console name other than that which would normally be chosen automatically.  Please refer to the CONSOLE command documentation for considerations when specifying a console name.",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: UlogDefinition, parms: true });

export const WriterDefinition: ICommandDefinition = {
  name:        "writer",
  aliases:     ["w"],
  summary:     "* Display JES3 writer sysout.",
  description: "Display a table of sysout in the JES3 Writer queue" + common + "  The interchangeable terms Output queue and Writer queue are used by the two JESes to describe the queue from which JES-managed or FSS-managed printers can select work.",
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: WriterDefinition, parms: true, primary: true });

export const ZeroDefinition: ICommandDefinition = {
  name:        "zero",
  aliases:     ["z"],
  summary:     "* Display JES3 Job zero sysout datasets.",
  description: "Display a table of sysout data sets created by JES3 internal facilities" + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: ZeroDefinition, parms: true, primary: true });

export const Definition: ICommandDefinition = {
  name:        "Placeholder",
  aliases:     ["ph"],
  summary:     "* Display .",
  description: "Display " + common,
  type:        "command",
  handler:     __dirname + "/../Batch.handler",
};
addShared({ obj: Definition, parms: true, primary: true, system: true});
