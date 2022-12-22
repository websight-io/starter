/*
 * Copyright (C) 2022 Dynamic Solutions
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

export const throttle: (fn: any, limit?: number) => (...args: any[]) => void = (fn, limit = 25) => {
  let isBusy = false;
  return (...args) => {
    if (!isBusy) {
      fn.apply(this, args);
      isBusy = true;
      setTimeout(() => {
        isBusy = false;
      }, limit);
    }
  };
};

export const debounce: (fn: any, timeout?: number) => (...args: any[]) => void = (fn, timeout = 50) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, timeout);
  };
};
