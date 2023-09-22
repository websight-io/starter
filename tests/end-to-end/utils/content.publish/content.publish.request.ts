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

import axios from 'axios';
import { CONTENT_SPACE } from './content.publish.types';
import { baseUrlCms } from '../../src/baseUrl';

export const http = axios.create({
  baseURL: baseUrlCms,
  auth: {
    username: 'wsadmin',
    password: 'wsadmin'
  },
  headers: {
    Accept: 'application/json'
  }
});

export const pathContent = (space: CONTENT_SPACE): string =>
  `/content/${space}/`;

export const buildUrl = (space: CONTENT_SPACE, action: string): string =>
  `${pathContent(space)}${action}`;
