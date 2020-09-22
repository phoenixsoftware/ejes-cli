/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*/

import {IImperativeConfig} from "@zowe/imperative";
import { EjesProfile } from "./cli/EjesProfile";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    overrides: {
        CredentialManager: "./overrides/CredentialManager.override"
    },
    pluginHealthCheck: __dirname + "/healthCheck.Handler",
    pluginSummary: "Zowe CLI EJES RESTapi Manager plug-in",
    pluginAliases: ["ejes"],
    rootCommandDescription: "Welcome to the EJES RESTapi Manager\n\n" +
                            "This plug-in  allows you to interact with EJES on the host to " +
                            "emulate EJES Batch under TSO and to query the EJES monitored" +
                            "spool and host libraries to retreive tabular and report information",
    productDisplayName: "Zowe CLI EJES RESTapi Manager Plug-in",
    name: "ejes",
    profiles: [{
        type: "ejes",
        schema: {
           type: "object",
           title: "(E)JES RESTapi Manager Profile",
           description: "(E)JES RESTapi Manager Profile",
           properties: {
               protocol: {
                   type: "string",
                   optionDefinition: EjesProfile.EJES_OPTION_PROTOCOL,
               },
               host: {
                   type: "string",
                   optionDefinition: EjesProfile.EJES_OPTION_HOST,
               },
               port: {
                   type: "number",
                   optionDefinition: EjesProfile.EJES_OPTION_PORT,
               },
               user: {
                   type: "string",
                   secure: true,
                   optionDefinition: EjesProfile.EJES_OPTION_USER,
               },
               password: {
                   type: "string",
                   secure: true,
                   optionDefinition: EjesProfile.EJES_OPTION_PASSWORD,
               },
               rejectUnauthorized: {
                   type: "boolean",
                   optionDefinition: EjesProfile.EJES_OPTION_REJECT_UNAUTHORIZED,
               },
               basePath: {
                   type: "string",
                   optionDefinition: EjesProfile.EJES_OPTION_BASE_PATH,
               },
               colorScheme: {
                   type: "string",
                   optionDefinition: EjesProfile.EJES_OPTION_COLOR_SCHEME,
               },
               noColor: {
                   type: "string",
                   optionDefinition: EjesProfile.EJES_OPTION_NO_COLOR,
               },
           },
           required: ["host"],
        },
        createProfileExamples: [
            {
                options: "myLogin --host zos123 --port 1443 --user ibmuser --password myp4ss",
                description: "Create an (E)JES RESTapi Manager profile called 'myLogin' to connect to (E)JES at host zos123 and port 1443"
            },
            {
                options: "myAcct --host zos124 --user ibmuser --password myp4ss --reject-unauthorized false",
                description: "Create an (E)JES RESTapi Manager profile called 'myAcct' to connect to (E)JES at the host zos124 (default port - 443) " +
                "and allow self-signed certificates"
            },
            {
                options: "myTest --host zosAPIML --port 2020 --user ibmuser --password myp4ss --reject-unauthorized false --base-path basePath",
                description: "Create an (E)JES RESTapi Manager profile called 'myTest' to connect to (E)JES at the host zosAPIML (default port - 2020) " +
                "and allow self-signed certificates and to use a test api mediation layer"
            }
        ],
        updateProfileExamples: [
            {
                options: "myLogin --user newuser --password newp4ss",
                description: "Update an (E)JES RESTapi Manager profile named 'myLogin' with a new username and password"
                }
            ]
    }]

};

export = config;
