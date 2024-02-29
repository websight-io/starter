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

// file to be run as system process, do not import in JS
// to run execute `npx ts-node content.publish.run.ts`
import { publishAllContent } from './content.publish.api';
import { CONTENT_SPACE } from './content.publish.types';

console.log('Publishing all content...');

const main = async () => {
    try {
        await Promise
            .all([
                publishAllContent(CONTENT_SPACE.LUNA),
                publishAllContent(CONTENT_SPACE.LUNA_LOW_CODE),
                publishAllContent(CONTENT_SPACE.LUNA_NO_CODE),
                publishAllContent(CONTENT_SPACE.PURESIGHT)
            ]);

        console.log('OK');
        process.exit(0);
    } catch (error) {
        console.log('ERROR', error);
        process.exit(1);
    }
}

main();
