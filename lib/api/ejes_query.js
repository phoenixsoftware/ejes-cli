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
exports.runEjesQuery = void 0;
function runEjesQuery(params) {
    try {
        var { main } = require("@phoenixsoftware/ejes-restapi-node-clis/ejes");
    }
    catch (e) {
        let msg = 'ERROR: (E)JES npm modules not installed properly.  See chapter 11 of the Reference Manual.';
        params.response.data.setMessage(msg);
        params.response.console.error(msg);
        params.response.console.error(require('util').inspect(e, true, 2, true));
        params.response.data.setExitCode(99);
        return;
    }
    main(params);
}
exports.runEjesQuery = runEjesQuery;
//# sourceMappingURL=ejes_query.js.map