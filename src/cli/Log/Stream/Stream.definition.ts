/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*/

import * as path from "path";
import { ICommandDefinition } from "@zowe/imperative";


const FIND_OPTIONS = "Find options";

export const StreamDefinition: ICommandDefinition = {
    name: "stream",
    summary: "- Stream syslog/operlog to stdout.",
    description: "Stream syslog/operlog to stdout.",
    type: "command",
    handler: path.join(__dirname, "Stream.handler"),
    options: [
              {
                  name: "nonstop",
                  description: "When EOF reached on stream, wait for more data.  Ignored for --response-format-json.",
                  type: "boolean"
              },
              {
                  name: "find",
                  description: "Text to be searched for.",
                  type: "string",
                  group: FIND_OPTIONS
              },
              {
                  name: "first",
                  description: "Locate and position to first occurrance of text.",
                  type: "boolean",
                  conflictsWith: [ "last", "all" ],
                  group: FIND_OPTIONS
              },
              {
                  name: "last",
                  description: "Locate and position to last occurrance of text.",
                  type: "boolean",
                  conflictsWith: [ "first", "all" ],
                  group: FIND_OPTIONS
              },
              {
                  name: "all",
                  description: "Locate all occurrances of text.",
                  type: "boolean",
                  conflictsWith: [ "first", "last" ],
                  group: FIND_OPTIONS
              }
          ]
};
