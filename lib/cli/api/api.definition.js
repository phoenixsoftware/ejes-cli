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
const CancelDownloadDefinition = {
    name: "cancel-download",
    aliases: ["canceldownload", "cancel", "c"],
    summary: " - Issue a cancel-download request",
    description: "Cancels a streaming download of PDF or Text data.  " +
        "A download is initiated via the -d option on an Exec request.  " +
        "Refer to the (E)JES REST API swagger documentation for further details.",
    type: "command",
    examples: [{
            description: "Cancel a long running job.  Show the status in returned JSON." +
                "\n\n   Example",
            options: "--rfj --cookie \n" +
                "                  \"EJESWEB_54761=DB856A...;path=/EjesWeb;Secure;HttpOnly\","
        }],
    handler: __dirname + "/generic.api.handler"
};
const InitDefinition = {
    name: "init",
    aliases: ["i"],
    summary: " - Issue an init request",
    description: "Creates an API session and optionally issues an API command.  " +
        "Returns items as requested by the q and c parameters.  " +
        "A Set-Cookie header is included in the response. The value of the returned cookie " +
        "identifies the session and should be used in a Cookie header on subsequent " +
        "API Data, Exec, and Term calls.  " +
        "Be sure to close the session with an API Term request when it is no longer needed. " +
        "Sessions that are idle for more than two minutes will be closed.  " +
        "See the (E)JES REST API swagger documentation for more details.  Note that you should " +
        "enclose all option arguments in double quotes if they include spaces, semicolons, or symbols " +
        "that are reserved in your terminal shell.",
    type: "command",
    examples: [{
            description: "Initalize a session by using --command to display the status screen, then display the JCL of " +
                "the first job.  Request up to 5 lines from the job with --enumvalue 5.  The user agent displayed " +
                "on the (E)JES session display will be '007'.  The query parameter -q is requesting the " +
                "message array, lines of output, and the function array.  The column parameter -c is requesting " +
                "column return be limited to jobname, jobid, and maxcomp.  Though browsed output is requested, " +
                "if the first job does not have JCL, the status screen will be displayed to show use the job " +
                "that did not meet the criteria.  The --rfj option visualizes the output as JSON.  Withoout  " +
                "it, the CLI returns only the cookie." +
                "\n\n   Example",
            options: "--command \"status o=rb*;1 j\" --enumvalue 5 \n" +
                "             --useragent 007 -q message,lines,function -c jobname,jobid,maxcomp --rfj"
        }],
    handler: __dirname + "/generic.api.handler"
};
const ExecDefinition = {
    name: "exec",
    aliases: ["e"],
    summary: " - Issue an exec request",
    description: "Executes an API command in an existing (stateful) or new transient (stateless) session.\n\n" +
        "Returns items as requested by the query parameters.  An existing session is used when a valid Cookie " +
        "header is provided. This is the preferred scenario when multiple transactions are expected since it " +
        "provides significant performance benefits. It requires server affinity for sessions in a clustered " +
        "server environment.\n\n" +
        "A new transient session will be created if a valid Authorization header is provided without a Cookie " +
        "header. A transient session exists only for the current transaction and meets the goal of statelessness " +
        "as defined by ROA and REST. However, it is much less efficient than using an existing session across " +
        "multiple transactions, and does not preserve the state of the underlying (E)JES API. Nevertheless, " +
        "it is the prefered scenario where a single transaction and statelessness suffice.\n\n" +
        "See the (E)JES REST API swagger documentation for more details.  Note that you should " +
        "enclose all option arguments in double quotes if they include spaces, semicolons, or symbols " +
        "that are reserved in your terminal shell.",
    type: "command",
    examples: [{
            description: "Perform a stateless transaction that on the --command option submits a job, then shows the " +
                "status of jobs with the" +
                "the same name, sorting so the most recent is shown first.  Request up to 5 lines from" +
                "the job with --enumvalue 5.  The user agent displayed " +
                "on the (E)JES session display will be 'Submit and status stateless example'.  " +
                "The query parameter -q is requesting the " +
                "message array, lines of output, and the array of jobs submitted in this session.  " +
                "The column parameter -c is requesting column return be limited to jobname, jobid, and maxcomp." +
                "The debug level of 7 shows the commands and options parsed, the request sent to the server, " +
                "and the response from the server.  The --commandData is the JCL to submit with the text " +
                "\"\\n\" between lines.  --rfj is not required as --debug forces JSON output." +
                "\n\n  Example",
            options: "--command \"submit api-array;st iefbr14;sort time d;upd\" \n" +
                "                  --enumvalue 5 --useragent \"Submit and status stateless example\" -q message,lines,submittedJobs \n" +
                "                  -c jobname,jobid,maxcomp --debug 7 --commandData \n" +
                "                  \"//IEFBR14  JOB IEFBR14,'IEFBR14',CLASS=A,MSGCLASS=H\\n\n" +
                "                  //EXEC     EXEC PGM=IEFBR14\\n//\""
        }, {
            description: "Perform a stateful request.  In this case, a previous request positioned the (E)JES api " +
                "in a job browser.  This example downloads the file as PDF using the -d option.  It causes " +
                "the carriage control symbols to be interpretted with the --cc option.  Then specifies " +
                "stateful session with the cookie it generated specified on the --cookie option.  The " +
                "sysout is download to a file with the name consistent with the browsed data set or browser.  " +
                "If EJES_DOWNLOAD_PATH exists in the environment, the path is used for the download.  Otherwise, " +
                "the file is created in the current working directory." +
                "\n\n  Example",
            options: "-d text --cc interpret \n" +
                "                  --cookie \"EJESWEB_54761=B6910D...;path=/EjesWeb;Secure;HttpOnly\""
        }],
    handler: __dirname + "/generic.api.handler"
};
const TermDefinition = {
    name: "term",
    aliases: ["t"],
    summary: " - Issue a term request",
    description: "Terminates the API session.",
    type: "command",
    examples: [{
            description: "Terminate an existing session by specifying the session on the --cookie option.  " +
                "No output is returned if the transaction completes without error." +
                "\n\n  Example",
            options: "--cookie \"EJESWEB_54761=0F6E5A...;path=/EjesWeb;Secure;HttpOnly\""
        }],
    handler: __dirname + "/generic.api.handler"
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
const QUERY_OPTIONS = "Query Item Options";
const PDF_TEXT_OPTIONS = "PDF and TEXT Common Options";
const PDF_SECURITY_OPTIONS = "PDF Security Property Options";
const INIT_OPTIONS = "Init Request Options";
const EXEC_OPTIONS = "Exec Request Options";
const PDF_OPTIONS = "PDF Download Options";
const TEXT_OPTIONS = "TEXT Download Options";
const MAIL_OPTIONS = "Mail Options";
const DEBUG_OPTIONS = "Debug Visualization Options";
const PLATFORM_ENCODING_OPTIONS = "Platform-encoding Options";
const ApiDefinition = {
    name: "api",
    aliases: ["a"],
    summary: "- Make requests with the (E)JES REST API",
    description: "Make requests with the (E)JES REST API to the (E)JES API using options that correspond to " +
        "object models in the (E)JES REST API swagger documentation.  You should refer to that document, " +
        "refer to chapter 11 of the (E)JES Reference, and issue the --helpApp option further details.\n\n" +
        "All responses are returned in JSON format.\n\n" +
        "All downloads are saved to a file in the current working directory, or to the path " +
        "specified on the EJES_DOWNLOAD_PATH environment variable.\n\n" +
        "The CLI generates exit codes.  0 indicates the transaction completed, but you should " +
        "check the output for (E)JES errors.  A non-zero exit code below 100 indicates a " +
        "problem coding an options or a download file filesystem issue.  An exit code above " +
        "100 is a response code from the host through the API.  If use the host host \"return\" command " +
        "in the --command option, you will receive a 500 exit code.  Use a stateless init request or" +
        "issue a term request to avoid this result.",
    type: "group",
    children: [CancelDownloadDefinition, InitDefinition, ExecDefinition, TermDefinition],
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
        {
            property: "options",
            value: EjesProfile_1.EjesProfile.EJES_GLOBAL_OPTIONS,
            merge: true,
            ignoreNodes: [{ type: "group" }]
        },
        {
            property: "options",
            value: [
                { name: "authorization", group: QUERY_OPTIONS,
                    type: "string", description: "If you do not specify the --cookie option, you must include --user and --password or this option.  The base64 encoded authentication string can be of the form " +
                        "userid:password or userid:group:password.  If supplied, it overrides the profile user and password settings." },
                { name: "casKey", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "command", group: EXEC_OPTIONS,
                    type: "string", description: "See the execParms model in the Swagger documentation." },
                { name: "amount", group: PDF_TEXT_OPTIONS,
                    type: "number", description: "See the pdf or text model in the Swagger documentation." },
                { name: "decorate", group: PDF_OPTIONS,
                    type: "string", description: "See the pdf model in the Swagger documentation." },
                { name: "allowassembly", group: PDF_SECURITY_OPTIONS,
                    type: "boolean", description: "See the pdf model in the Swagger documentation." },
                { name: "bcc", group: MAIL_OPTIONS,
                    type: "string", description: "See the mail model in the Swagger documentation." },
                { name: "platformencoding", group: PLATFORM_ENCODING_OPTIONS,
                    type: "number", description: "See the platformEncoding model in the Swagger documentation.  Defaults to 1047 if not specified." },
                { name: "debug", group: DEBUG_OPTIONS,
                    type: "number", description: "An additive flag for tech support use.\n\n" +
                        "  1 - Command discovered and compiled options object\n" +
                        "  2 - Request object\n" +
                        "  4 - Response headers" },
                { name: "blockid", group: PDF_TEXT_OPTIONS,
                    type: "number", description: "See the pdf or text model in the Swagger documentation." },
                { name: "cc", group: PDF_TEXT_OPTIONS,
                    type: "string", description: "See the pdf or text model in the Swagger documentation." },
                { name: "count", group: PDF_TEXT_OPTIONS,
                    type: "number", description: "See the pdf or text model in the Swagger documentation." },
                { name: "recordid", group: PDF_TEXT_OPTIONS,
                    type: "number", description: "See the pdf or text model in the Swagger documentation." },
                { name: "start", group: PDF_TEXT_OPTIONS,
                    type: "number", description: "See the pdf or text model in the Swagger documentation." },
                { name: "todend", group: PDF_TEXT_OPTIONS,
                    type: "number", description: "See the pdf or text model in the Swagger documentation." },
                { name: "todstart", group: PDF_TEXT_OPTIONS,
                    type: "number", description: "See the pdf or text model in the Swagger documentation." },
                { name: "font", group: PDF_OPTIONS,
                    type: "string", description: "See the pdf model in the Swagger documentation." },
                { name: "orientation", group: PDF_OPTIONS,
                    type: "string", description: "See the pdf model in the Swagger documentation." },
                { name: "overflow", group: PDF_OPTIONS,
                    type: "string", description: "See the pdf model in the Swagger documentation." },
                { name: "pagesize", group: PDF_OPTIONS,
                    type: "string", description: "See the pdf model in the Swagger documentation." },
                { name: "allowcopying", group: PDF_SECURITY_OPTIONS,
                    type: "boolean", description: "See the pdf model in the Swagger documentation." },
                { name: "allowmodification", group: PDF_SECURITY_OPTIONS,
                    type: "boolean", description: "See the pdf model in the Swagger documentation." },
                { name: "allowprinting", group: PDF_SECURITY_OPTIONS,
                    type: "boolean", description: "See the pdf model in the Swagger documentation." },
                { name: "masterpassword", group: PDF_SECURITY_OPTIONS,
                    type: "string", description: "See the pdf model in the Swagger documentation." },
                { name: "openpassword", group: PDF_SECURITY_OPTIONS,
                    type: "string", description: "See the pdf model in the Swagger documentation." },
                { name: "body", group: MAIL_OPTIONS,
                    type: "string", description: "See the mail model in the Swagger documentation.  Insert \"\\n\" in the string to indicate line breaks." },
                { name: "bodyfile", group: MAIL_OPTIONS,
                    type: "string", description: "See the mail model in the Swagger documentation.  " +
                        "The contents of the file are read and escaped properly for " +
                        "--body.  Uses EJES_SUBMIT_PATH for the path if it exists in the environment." },
                { name: "carboncopy", group: MAIL_OPTIONS,
                    type: "string", description: "See the cc property the mail model in the Swagger documentation." },
                { name: "from", group: MAIL_OPTIONS,
                    type: "string", description: "See the mail model in the Swagger documentation." },
                { name: "html", group: MAIL_OPTIONS,
                    type: "string", description: "See the mail model in the Swagger documentation." },
                { name: "subject", group: MAIL_OPTIONS,
                    type: "string", description: "See the mail model in the Swagger documentation." },
                { name: "to", group: MAIL_OPTIONS,
                    type: "string", description: "See the mail model in the Swagger documentation." },
                { name: "columns", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "extractdd", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "ipaddress", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "luName", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "patterndd", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "rows", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "subsystem", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation.",
                    allowableValues: { values: ["jes2", "jes3"], caseSensitive: false } },
                { name: "useragent", group: INIT_OPTIONS,
                    type: "string", description: "See the initParms model in the Swagger documentation." },
                { name: "cookie", group: QUERY_OPTIONS,
                    type: "string", description: "Supply the cookie output by a stateful request." },
                { name: "c", group: QUERY_OPTIONS,
                    type: "string", description: "A list of comma separated, case-insensitive names of columns to include in the response. If omitted, all columns for the current tabular display are included.\n" +
                        "\n" +
                        "This parameter only applies to enumerated data containing columns, specifically, the columns and rows items of the q parameter.\n" +
                        "\n" +
                        "Limiting the included columns to only those you need can dramatically improve the resonse time of the request and significantly reduce system resources." },
                { name: "q", group: QUERY_OPTIONS,
                    type: "string", description: "A list of comma separated, case-insensitive items to include in the response. If omitted, no items are included.\n" +
                        "\n" +
                        "Limiting the included items to only those you need can improve response time.\n" +
                        "\n" +
                        "The following items are supported: columns, environment, execParms, find, function, initParms, jobs, keys, lines, loginfo, rows, lineCommands, " +
                        "message, notice, platformEncoding, position, screen, submittedJobs, userLog, and version. These represent the response properties as described in " +
                        "the models section of this help. The value all can be used to include all of the above items, but generally you should only request the items you need." },
                { name: "d", group: QUERY_OPTIONS,
                    type: "string", description: "A download type, either pdf or text.\n" +
                        "\n" +
                        "When specified, all other query parameters are ignored. The Content-Type response header will report either " +
                        "application/pdf or text/plain (charset utf-8) if no error occurred, and application/json if an error occurred. " +
                        "If no error occurred, a Content-Disposition response header will supply a suggested filename.\n" +
                        "\n" +
                        "A pdf or text property may be included in the POST data to override default pdf and text formatting options.\n" +
                        "\n" +
                        "This parameter provides pdf or text data in the output stream and does not require enumeration.\n" +
                        "\n" +
                        "The API must be positioned on a browser type display to download data. Afterwards, the positioning may have " +
                        "changed depending on the amount specified.\n" +
                        "\n" +
                        "You can use CancelDownload to cancel a long running download." },
                { name: "m", group: QUERY_OPTIONS,
                    type: "string", description: "A mail attachment type, either pdf or text.\n" +
                        "\n" +
                        "At a minimum, a mail property is required in the POST data to specify one or more recipients. A pdf or text " +
                        "property may also be included to override default pdf and text formatting options.\n" +
                        "\n" +
                        "The API must be positioned on a browser type display to send a mail attachment. Afterwards, the positioning " +
                        "may have changed depending on the amount specified.\n" +
                        "\n" +
                        "Note that you cannot use CancelDownload to cancel a long running mail attachement request because the response \n" +
                        "containing the needed Cookie is not sent until after mail has been sent." },
                { name: "commanddata", group: EXEC_OPTIONS,
                    type: "string", description: "See the execParms model in the Swagger documentation.  Insert \"\\n\" in the string to indicate line breaks." },
                { name: "commanddatafile", group: EXEC_OPTIONS,
                    type: "string", description: "See the execParms model in the Swagger documentation.  " +
                        "The contents of the file are read and escaped properly for " +
                        "--commanddata.  Uses EJES_SUBMIT_PATH for the path if it exists in the environment." },
                { name: "enumtime", group: EXEC_OPTIONS,
                    type: "number", description: "See the execParms model in the Swagger documentation." },
                { name: "enumvalue", group: EXEC_OPTIONS,
                    type: "number", description: "See the execParms model in the Swagger documentation." },
                { name: "showhiddencolumns", group: EXEC_OPTIONS,
                    type: "boolean", description: "See the execParms model in the Swagger documentation." },
                { name: "translatescreen", group: EXEC_OPTIONS,
                    type: "boolean", description: "See the execParms model in the Swagger documentation." },
                { name: "waitforresponse", group: EXEC_OPTIONS,
                    type: "boolean", description: "See the execParms model in the Swagger documentation." },
            ],
            merge: true,
            ignoreNodes: [{
                    type: "group"
                }]
        }
    ],
    examples: [
        {
            description: "Cancel a long running job.  Show the status in returned JSON." +
                "\n\n  Example",
            options: "cancel-download --rfj --cookie\n" +
                "             \"EJESWEB_54761=DB856A...;path=/EjesWeb;Secure;HttpOnly\","
        }, {
            description: "Initalize a session by using --command to display the status screen, then display the JCL of " +
                "the first job.  Request up to 5 lines from the job with --enumvalue 5.  The user agent displayed " +
                "on the (E)JES session display will be \"Joe User's API test\".  The query parameter -q is requesting the " +
                "message array, lines of output, and the function array.  The column parameter -c is requesting " +
                "column return be limited to jobname, jobid, and maxcomp.  Though browsed output is requested, " +
                "if the first job does not have JCL, the status screen will be displayed to show use the job " +
                "that did not meet the criteria.  The --rfj option visualizes the output as JSON.  " +
                "Without it, the CLI returns only the cookie." +
                "\n\n   Example",
            options: "init --command \"status o=rb*;1 j\" --enumvalue 5 \n" +
                "             --useragent \"Joe User's API test\" -q message,lines,function -c jobname,jobid,maxcomp --rfj"
        }, {
            description: "Perform a stateless transaction that on the --command option submits a job, then shows the " +
                "status of jobs with the" +
                "the same name, sorting so the most recent is shown first.  Request up to 5 lines from" +
                "the job with --enumvalue 5.  The user agent displayed " +
                "on the (E)JES session display will be 'testapi'.  The query parameter -q is requesting the " +
                "message array, lines of output, and the array of jobs submitted in this session.  " +
                "The column parameter -c is requesting column return be limited to jobname, jobid, and maxcomp." +
                "The debug level of 7 shows the commands and options parsed, the request sent to the server, " +
                "and the response from the server.  The --commandData is the JCL to submit with the text " +
                "\"\\n\" between lines." +
                "\n\n  Example",
            options: "exec --command \"submit api-array;st iefbr14;sort time d;upd\" \n" +
                "             --enumvalue 5 --useragent \"Submit and status stateless example\" -q message,lines,submittedJobs \n" +
                "             -c jobname,jobid,maxcomp --debug 7 --commandData \n" +
                "             \"//IEFBR14  JOB IEFBR14,'IEFBR14',CLASS=A,MSGCLASS=H\\n\n" +
                "             //EXEC     EXEC PGM=IEFBR14\\n//\""
        }, {
            description: "Perform a stateful request.  In this case, a previous request positioned the (E)JES api " +
                "in a job browser.  This example downloads the file as PDF using the -d option.  It causes " +
                "the carriage control symbols to be interpretted with the --cc option.  Then specifies " +
                "stateful session with the cookie it generated specified on the --cookie option.  The " +
                "sysout is download to a file with the name consistent with the browsed data set or browser.  " +
                "If EJES_DOWNLOAD_PATH exists in the environment, the path is used for the download.  Otherwise, " +
                "the file is created in the current working directory." +
                "\n\n  Example",
            options: "exec -d text --cc interpret \n" +
                "                    --cookie \"EJESWEB_54761=B6910D...;path=/EjesWeb;Secure;HttpOnly\""
        }, {
            description: "Terminate an existing session by specifying the session on the --cookie option.  " +
                "No output is returned if the transaction completes without error." +
                "\n\n  Example",
            options: "term \n" +
                "             --cookie \"EJESWEB_54761=0F6E5A...;path=/EjesWeb;Secure;HttpOnly\""
        }
    ]
};
module.exports = ApiDefinition;
//# sourceMappingURL=api.definition.js.map