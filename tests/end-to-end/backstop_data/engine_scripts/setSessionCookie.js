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

const createSession = require('./createSession');

/**
 * @typedef Cookie {
 *     "domain": string,
 *     "path": string,
 *     "name": string,
 *     "value": string,
 *     "expirationDate": number,
 *     "hostOnly": boolean,
 *     "httpOnly": boolean,
 *     "secure": boolean,
 *     "session": boolean,
 *     "sameSite": string
 *   }
 */

/**
 * Add session cookie value to the session cookie
 *
 * @param cookies {Cookie[]} cookies array to inject session
 *
 * @returns {Promise<Cookie[]>} cookies with value "websight.auth" have session cookie value injected
 */
module.exports = async (cookies = []) => {
    const injectIntoCookie = 'websight.auth';
    const sessionCookieValue = await createSession();

    return cookies.map(cookie => {
        if (cookie.name === injectIntoCookie) {
            cookie.value = sessionCookieValue;
        }

        return cookie;
    });
};
