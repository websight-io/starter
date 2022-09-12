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
import { testIds } from '../support/consts';

const paths = {
  title: 'ComponentOverlay_rootcontainer/maincontainer/pagesection/title'
};

describe('Title component', function () {
  beforeEach(() => {
    cy.login();
  });

  it('renders correctly in preview mode', function () {
    cy.visit('/content/luna-test/pages/Title.html');

    cy.get('section')
      .first().children().children()
      .should('have.length', 1)
      .first()
      .should('have.css', "font-size", "31.248px")
      .should('have.text', 'Add your heading here')
      .parent().parent()
      .next().children().children()
      .should('have.length', 2)
      .first()
      .should('have.css', "font-size", "20px")
      .should('have.text', 'Additional overline text filled')
      .next()
      .should('have.css', "font-size", "39.056px")
      .should('have.text', 'Heading With H3 level and L size')
      .parent().parent()
      .next().children().children()
      .should('have.length', 2)
      .first()
      .should('have.css', "font-size", "20px")
      .should('have.text', 'Resized to 6 cols on L breakpoint')
      .next()
      .should('have.css', "font-size", "95.37px")
      .should('have.text', 'Heading With H2 level and XXL size')

    cy.percySnapshotPreview('Title preview');
  });

  it('renders correctly in edit mode', function () {
    cy.intercept(
      'POST',
      '**/pagesection/title.websight-dialogs-service.save-properties.action'
    ).as('saveProperties');

    cy.visit(
      '/apps/websight/index.html/content/luna-test/pages/Title::editor'
    );

    cy.getByTestId(paths.title)
      .click()
      .find('span.name')
      .should('have.text', 'Luna Title');

    cy.percySnapshotPageEditor('Title editor');

    cy.getByTestId(testIds.editIcon).click();

    cy.getByTestId('RadioElement_h1').click();
    cy.getByTestId('RadioElement_hl-title__heading--size-2').click();
    cy.getByTestId('Input_Headingtext').clear().type('New heading');
    cy.getByTestId('Input_Addanoverline').click();
    cy.getByTestId('Input_Overlinetext').clear().type('New overline text');

    cy.percySnapshotDialog('Title dialog');

    cy.getByTestId(testIds.dialogSubmitButton).click();
    cy.wait('@saveProperties');

    cy.request(
      '/content/luna-test/pages/Title/jcr:content/rootcontainer/maincontainer/pagesection/title.json'
    )
      .its('body')
      .should('deep.eq', {
        'sling:resourceType': 'luna/components/title',
        title: 'New heading',
        showSubtitle: 'true',
        subtitle: 'New overline text',
        'jcr:primaryType': 'nt:unstructured',
        headingLevel: 'h1',
        headingSize: 'hl-title__heading--size-2'
      });
  });
});
