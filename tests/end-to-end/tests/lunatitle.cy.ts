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
  title: 'ComponentOverlay_/content/starter-test/pages/LunaTitle/jcr:content/rootcontainer/maincontainer/pagesection/title'
};

describe('Luna Title component', function () {

  beforeEach(() => {
    cy.login();
  });

  it('renders correctly in preview mode', function () {
    cy.visit('/content/starter-test/pages/LunaTitle.html');

    cy.getByTestId('component_title')
      .findByTestId('title')
      .should('have.css', 'font-size', '31.248px')
      .should('have.text', 'Add your heading here')

    cy.getByTestId('component_title')
      .findByTestId('overline')
      .should('not.exist')

    cy.getByTestId('component_title1')
      .findByTestId('title')
      .should('have.css', "font-size", "39.056px")
      .should('have.text', 'Heading With H3 level and L size')

    cy.getByTestId('component_title1')
      .findByTestId('overline')
      .should('have.css', "font-size", "20px")
      .should('have.text', 'Additional overline text filled')

    cy.getByTestId('component_title2')
      .findByTestId('title')
      .should('have.css', "font-size", "95.37px")
      .should('have.text', 'Heading With H2 level and XXL size')

    cy.getByTestId('component_title2')
      .findByTestId('overline')
      .should('have.css', "font-size", "20px")
      .should('have.text', 'Resized to 6 cols on L breakpoint')

    cy.percySnapshotPreview('Title preview');
  });

  it('renders correctly in edit mode', function () {
    cy.intercept(
      'POST',
      '**/pagesection/title.websight-dialogs-service.save-properties.action'
    ).as('saveProperties');

    cy.visit(
      '/apps/websight/index.html/content/starter-test/pages/LunaTitle::editor'
    );

    cy.getByTestId(paths.title)
      .click()
      .find('span.name')
      .should('contain.text', 'Luna Title');

    cy.percySnapshotPageEditor('Title editor');

    cy.getByTestId('ToolbarItem_Properties').click({force: true});

    cy.getByTestId('ModalDialog_LunaTitle')
      .findByTestId('RadioElement_h1').click();
    cy.getByTestId('ModalDialog_LunaTitle')
      .findByTestId('RadioElement_hl-title__heading--size-2').click();
    cy.getByTestId('ModalDialog_LunaTitle')
      .findByTestId('Input_Headingtext').clear().type('New heading');
    cy.getByTestId('ModalDialog_LunaTitle')
      .findByTestId('Input_Addanoverline').click();
    cy.getByTestId('ModalDialog_LunaTitle')
      .findByTestId('Input_Overlinetext').clear().type('New overline text');

    cy.percySnapshotDialog('Title dialog');

    cy.getByTestId('Action_Submit').click();
    cy.wait('@saveProperties');

    cy.request(
      '/content/starter-test/pages/LunaTitle/jcr:content/rootcontainer/maincontainer/pagesection/title.json'
    )
      .its('body')
      .should('deep.eq', {
        mdOffset: '',
        smColSize: '12',
        classes: '',
        smOffset: '',
        'sling:resourceType': 'luna/components/lunatitle',
        title: 'New heading',
        anchorId: '',
        showSubtitle: 'true',
        lgOffset: '',
        subtitle: 'New overline text',
        mdColSize: '12',
        'jcr:primaryType': 'nt:unstructured',
        lgColSize: '12',
        headingLevel: 'h1',
        headingSize: 'hl-title__heading--size-2'
      });
  });
});
