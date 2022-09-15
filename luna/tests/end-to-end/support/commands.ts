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

import '@4tw/cypress-drag-drop';

/**
 * Adds support for '/' in testId
 */
const prepareTestId = (testId: string) => testId.replaceAll('/', '\\/');

Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid=${prepareTestId(testId)}]`);
});

Cypress.Commands.add(
    'findByTestId',
    {
      prevSubject: true
    },
    (subject, testId) => {
      return subject.find(`[data-testid=${prepareTestId(testId)}]`);
    }
);

Cypress.Commands.add('login', () => {
  const authUrl = `${
    Cypress.env('baseUrl') || ''
  }/apps/websight-authentication/j_security_check`;
  const spacesUrl = '/websight/index.html/content::spaces';

  cy.session('admin', () => {
    cy.request({
      method: 'POST',
      url: authUrl,
      form: true,
      body: {
        j_username: Cypress.env('loginUsername'),
        j_password: Cypress.env('loginPassword'),
        resource: `/apps${spacesUrl}`,
        _charset_: 'UTF-8'
      }
    });
  });
});

const hideHowliteHeaderFooterCSS = `
  .hl-header {
    visibility: hidden !important;
  }
  .hl-footer {
    visibility: hidden !important;
  }
`;

const hideWSNavbarAndSidepanelCSS = `
  [data-ds--page-layout--slot="top-navigation"] {
    visibility: hidden !important;
  }

  [data-ds--page-layout--slot="left-sidebar"] {
    visibility: hidden !important;
  }
`;

Cypress.Commands.add('percySnapshotWithAuth', (name: string, options) => {
  cy.getCookie('websight.auth').then((authCookie) => {
    cy.percySnapshot(name, {
      discovery: {
        requestHeaders: {
          cookie: `${authCookie.name}=${authCookie.value}`
        }
      },
      ...options
    });
  });
});

Cypress.Commands.add('percySnapshotPreview', (name: string, options) => {
  cy.percySnapshotWithAuth(name, {
    percyCSS: hideHowliteHeaderFooterCSS,
    ...options
  });
});

Cypress.Commands.add('percySnapshotPageEditor', (name: string, options) => {
  cy.percySnapshotWithAuth(name, {
    percyCSS: hideWSNavbarAndSidepanelCSS,
    ...options
  });
});

Cypress.Commands.add('percySnapshotDialog', (name: string, options) => {
  cy.percySnapshotWithAuth(name, {
    scope: '[data-testid^="ModalDialog_"][role="dialog"]',
    ...options
  });
});
