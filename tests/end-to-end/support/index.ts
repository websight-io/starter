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

import './commands';
import '@percy/cypress';
import { SnapshotOptions } from '@percy/core';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      findByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      login(): void;
      percySnapshotWithAuth(name: string, options?: SnapshotOptions): void;
      percySnapshotPreview(name: string, options?: SnapshotOptions): void;
      percySnapshotPageEditor(name: string, options?: SnapshotOptions): void;
      percySnapshotDialog(name?: string, options?: SnapshotOptions): void;
    }
  }
}

// ignore resizeObserver error occuring only in cypress
// https://github.com/cypress-io/cypress/issues/20341
// https://github.com/quasarframework/quasar/issues/2233
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on('uncaught:exception', (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});
