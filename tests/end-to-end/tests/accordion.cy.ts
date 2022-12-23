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

const paths = {
  title: 'ComponentOverlay_pagecontainer/accordion/accordionitem'
};

describe('Accordion component', function () {

  beforeEach(() => {
    cy.login();
  });

  it('renders correctly in preview mode', function () {
    cy.visit('/content/low-code-luna-test/pages/Accordion.html');

    cy.getByTestId('header_accordionitem')
    .should('have.text', 'Some awesome header')

    cy.percySnapshotPreview('Accordion preview');
  });


  it('renders correctly in edit mode', function () {
    cy.intercept(
        'POST',
        '**/pagecontainer/accordion/accordionitem.websight-dialogs-service.save-properties.action'
    ).as('saveProperties');

    cy.visit(
        '/apps/websight/index.html/content/low-code-luna-test/pages/Accordion::editor'
    );

    cy.getByTestId(paths.title)
    .click()
    .find('span.name')
    .should('contain.text', 'Accordion item');

    cy.percySnapshotPageEditor('Accordion editor');

    cy.getByTestId('ToolbarOption_Edit').click();

    cy.getByTestId('Input_Header').clear().type('Lorem ipsum');


    cy.percySnapshotDialog('Accordion dialog');

    cy.getByTestId('Action_Submit').click();
    cy.wait('@saveProperties');

    cy.request(
        '/content/low-code-luna-test/pages/Accordion/jcr:content/pagecontainer/accordion/accordionitem.json'
    )
    .its('body')
    .should('deep.eq', {
      'sling:resourceType': 'luna/components/accordion/accordionitem',
      'jcr:primaryType': 'nt:unstructured',
      header: 'Lorem ipsum'
    });
  });
});
