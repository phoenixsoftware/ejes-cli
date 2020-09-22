/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020 Phoenix Software International, Inc.
*/

import { ICommandDefinition } from "@zowe/imperative";
/**
 * Command one [object] defintion. This definition is of imperative type "command" and therefore must have a
 * command handler (which performs the "work" for this command).
 *
 * In this case, "error-handler" will always fail with an "ImperativeError".
 *
 * Property Summary:
 * =================
 * "name" of the [object]. Should be a noun (e.g. data-set).
 * "aliases" normally contains a shortened form of the command
 * "summary" will display when issuing the help on this [objects] [action].
 * "type" is "command" which means a handler is required.
 * "handler" is the file path to the handler (does the work)
 */
export const SubmitDefinition: ICommandDefinition = {
    name: "submit",
    aliases: ["sub"],
    summary: "Submit a local or host file to the host.",
    description: "Submit a job from the local host with the local: prefix, or a MVS data set or z/OS UNIX path.  Responds with submission messages and a table providing a description of a successful submission.",
    options: [
      { name: "debug",  type: "number",
          aliases: ["dbg", "dv"],
          description: "Specify a numeric debugging mode." },
      { name: "recfm",  type: "string",
          allowableValues: {
              values: ["f", "v", "list", "help"],
              caseSensitive: true
          },
          description: "Record format of fixed or variable length." },
      { name: "lrecl",  type: "number",
          description: "Logical record length." },
      { name: "unit",   type: "string",
          description: "Generic or esoteric unit name where an uncataloged MVS data set resides." },
      { name: "volume", type: "string",
          description: "Volume serial where an uncataloged MVS data set resides." },
      { name: "subsys", type: "string",
          allowableValues: {
              values: ["jes2", "jes3", "list", "help"],
              caseSensitive: true
          },
          description: "Subsystem name where the job should be sent. If not speficied defaults to the subsystem under which the current (E)JES session is running." },
    ],
    examples: [{
        description: "Submit a local workstation file",
        options: "\"local:iefbr14.jcl\" --lrecl(132) --subsys(jes3)"
    }, {
        description: "Submit a clist member",
        options: "\"clist(iefbr14x)\""
    }],
    type: "command",
    positionals: [
      {
          name: "command",
          type: "string",
          description: "Any of MVS data set ame, z/OS UNIX path name, or a workstation file prefixed by 'local:'.",
          required: true
      }
    ],
    handler: __dirname + "/Submit.handler"
};
