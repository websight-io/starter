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

require('dotenv').config();

const getBaseUrlCms = (space = 'luna-visual-tests') => {
    const devDefault = 'http://localhost:8080';

    return process.env.BACKSTOPJS_baseUrlCms
        || process.env.CYPRESS_baseUrlCms
        || process.env.baseUrlCms
        || devDefault;
};

const getBaseUrlPublish = (space = 'luna-visual-tests') => {
    // naive usage of publishers as `${baseUrlsPublish[space]}/published/${space}/pages/${page}.html`;
    // function left out as facade for future upgrade using real publishers (not /published/ CMS url)
    return getBaseUrlCms(space);
};

module.exports = {
    baseUrlCms: getBaseUrlCms(),
    baseUrlsPublish: {
        'luna-visual-tests': getBaseUrlPublish('luna-visual-tests'),
    },
}
