/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright (c) 2020-2021 Phoenix Software International, Inc.
*/

/**
 * Interface representing the values in the custom_properties.yaml file
 * see example_properties.yaml for descriptions and more details
 */
export interface ITestPropertiesSchema {

    /**
     * TODO: update to match your example_properties.yaml fields
     */
    myPropertiesCategory: {
        user: string,
        password: string,
        host: string,
        port?: number,
    };

    /**
     * This can be used to create zosmf profiles if you need them for testing your
     * plugin
     */
    zosmf: {
        user: string;
        password: string;
        host: string;
        port: number;
        rejectUnauthorized: boolean;
    };
}
