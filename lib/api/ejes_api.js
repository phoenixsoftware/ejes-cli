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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runEjesApi = void 0;
function runEjesApi(params) {
    try {
        var { main } = require("@phoenixsoftware/ejes-restapi-node-clis/api");
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
exports.runEjesApi = runEjesApi;
//# sourceMappingURL=ejes_api.js.map