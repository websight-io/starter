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
  title: 'ComponentOverlay_pagecontainer/quote'
};

describe('Quote component', function () {

  beforeEach(() => {
    cy.login();
  });

  it('renders correctly in preview mode', function () {
    cy.visit('/content/low-code-luna-test/pages/Quote.html');

    cy.getByTestId('component_quote')
    .findByTestId('text')
    .should('have.text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel dictum eros.')

    cy.getByTestId('component_quote_1')
    .findByTestId('text')
    .should('have.text', 'Text')

    cy.getByTestId('component_quote_1')
    .get('.quote__author-name')
    .should('have.text', 'Author name')

    cy.getByTestId('component_quote_1')
    .get('.quote__author-description')
    .should('have.text', 'Author description')

    cy.getByTestId('component_quote_1')
    .get('img')
    .should('have.attr', 'alt', 'Alt text')
    .should('have.attr', 'src', '/content/low-code-luna-test/assets/images/quote/Janet.png/jcr:content/renditions/original.png')

    cy.percySnapshotPreview('Quote preview');
  });

  it('renders correctly in edit mode', function () {
    cy.intercept(
        'POST',
        '**/pagecontainer/quote.websight-dialogs-service.save-properties.action'
    ).as('saveProperties');

    cy.visit(
        '/apps/websight/index.html/content/low-code-luna-test/pages/Quote::editor'
    );

    cy.getByTestId(paths.title)
    .click()
    .find('span.name')
    .should('contain.text', 'Quote');

    cy.percySnapshotPageEditor('Quote editor');

    cy.getByTestId('ToolbarItem_Properties').click();

    cy.getByTestId('Input_Text').clear().type('Lorem ipsum');
    cy.getByTestId('Input_Author’sname').clear().type('Author name');
    cy.getByTestId('Input_Author’sdescription').clear().type('Author description');
    cy.getByTestId('Input_Showauthor’simage').click();
    cy.getByTestId('SidebarElement_Assets').click();
    cy.getByTestId('AssetItem_Janet_png').trigger('dragstart');
    cy.getByTestId('Input_Author’simage').trigger('drop');
    cy.getByTestId('Input_Alttext').clear().type('Alt text');

    cy.percySnapshotDialog('Quote dialog');

    cy.getByTestId('Action_Submit').click();
    cy.wait('@saveProperties');

    cy.request(
        '/content/low-code-luna-test/pages/Quote/jcr:content/pagecontainer/quote.json'
    )
    .its('body')
    .should('deep.eq', {
      'sling:resourceType': 'luna/components/quote',
      'jcr:primaryType': 'nt:unstructured',
      text: '<p>Lorem ipsum</p>',
      authorName: 'Author name',
      authorDescription: 'Author description',
      showImage: 'true',
      authorImage: '/content/low-code-luna-test/assets/images/quote/Janet.png',
      imageAlt: 'Alt text'
    });
  });

});
