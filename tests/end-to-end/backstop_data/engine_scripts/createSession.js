/*
 * Copyright (C) 2023 Dynamic Solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Path = require('path');
const { exec } = require('child_process');
const { baseUrlCms } = require('../../src/baseUrl');

const createSessonScriptPath = Path.resolve('./backstop_data/engine_scripts', './createSession.sh');

/**
 * @returns {Promise<string>} session cookie value
 */
module.exports = async function createSession () {
    /**
     * @type string
     */
    const output = await new Promise((resolve, reject) => {
        if (!baseUrlCms) {
            reject('baseUrl not defined, cannot test');
        }

        exec(`BASE_URL_CMS="${baseUrlCms}" bash ${createSessonScriptPath}`, (error, stdout, stderr) => {
            if (error) throw error;
            if (stderr) throw new Error(stderr);

            resolve(stdout);
        });
    });

    return readSessionToken(output);
};

/**
 * @param sessionScriptOutput {string}
 *
 * @returns {string} authToken
 *
 * @example
 * input from sessionScriptOutput:
 * #HttpOnly_localhost\tFALSE\t/\tFALSE\t0\twebsight.auth\tYjhhMDUyNmEtNWNkMi00NWNjLWE3MjQtMGVhYWFjZDNhZWMzX2E4NTQ2ZDliZTcyNTFmYTQ=
 * output:
 * YjhhMDUyNmEtNWNkMi00NWNjLWE3MjQtMGVhYWFjZDNhZWMzX2E4NTQ2ZDliZTcyNTFmYTQ=
 */
function readSessionToken (sessionScriptOutput) {
    const data = sessionScriptOutput.split("\t");
    const tokenName = 'websight.auth';
    const authTokenIndex = data.indexOf(tokenName) + 1; // "+ 1" will read next value after `tokenName`

    const output = data[authTokenIndex];

    return output.trim();
}
