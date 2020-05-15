/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import {IImperativeConfig} from "@zowe/imperative";
import { EjesSession } from "./cli/EjesSession";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    pluginSummary: "Zowe CLI (E)JES plug-in",
    pluginAliases: ["ej"],
    rootCommandDescription: "Welcome to the (E)JES plug-in for Zowe CLI!\n\n The (E)JES plug-in " +
        "(& CLI) follows the Zowe CLI command syntax 'zowe [group] [action] [object] [options]'. " +
        "Where, in the case of the plugin, " +
        "the [group] is the package.json name, " +
        "the [actions] are defined in the project under 'src/cli/', " +
        "& the [objects] (definitions & handler) are defined in the project under 'src/cli/'.",
    productDisplayName: "Zowe (E)JES Sample Plug-in",
    name: "ejes",

    profiles: [
    {
        type: "ejes",
        schema: {
            type: "object",
            title: "(E)JES Profile",
            description: "(E)JES Profile",
            properties: {
                protocol: {
                    type: "string",
                    optionDefinition: EjesSession.EJES_OPTION_PROTOCOL,
                },
                host: {
                    type: "string",
                    optionDefinition: EjesSession.EJES_OPTION_HOST,
                },
                port: {
                    type: "number",
                    optionDefinition: EjesSession.EJES_OPTION_PORT,
                },
                user: {
                    type: "string",
                    secure: true,
                    optionDefinition: EjesSession.EJES_OPTION_USER,
                },
                password: {
                    type: "string",
                    secure: true,
                    optionDefinition: EjesSession.EJES_OPTION_PASSWORD,
                },
                rejectUnauthorized: {
                    type: "boolean",
                    optionDefinition: EjesSession.EJES_OPTION_REJECT_UNAUTHORIZED,
                },
                basePath: {
                    type: "string",
                    optionDefinition: EjesSession.EJES_OPTION_BASE_PATH,
                },
            },
            required: ["host"],
        },
        createProfileExamples: [
            {
                options: "zos123 --host zos123 --port 1443 --user ibmuser --password myp4ss",
                description: "Create a zosmf profile called 'zos123' to connect to (E)JES at host zos123 and port 1443"
            },
            {
                options: "zos124 --host zos124 --user ibmuser --password myp4ss --reject-unauthorized false",
                description: "Create a zosmf profile called 'zos124' to connect to (E)JES at the host zos124 (default port - 443) " +
                "and allow self-signed certificates"
            },
            {
                options: "zosAPIML --host zosAPIML --port 2020 --user ibmuser --password myp4ss --reject-unauthorized false --base-path basePath",
                description: "Create a zosmf profile called 'zos124' to connect to (E)JES at the host zos124 (default port - 443) " +
                "and allow self-signed certificates"
            }
        ],
        updateProfileExamples: [
            {
                options: "zos123 --user newuser --password newp4ss",
                description: "Update a zosmf profile named 'zos123' with a new username and password"
            }
        ]
    }]
};

export = config;
