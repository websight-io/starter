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
  title: 'ComponentOverlay_/content/low-code-luna-test/pages/Carousel/jcr:content/pagecontainer/container/carousel'
};

describe('Carousel component', function () {

  beforeEach(() => {
    cy.login();
  });

  it('renders correctly in preview mode', function () {
    cy.visit('/content/low-code-luna-test/pages/Carousel.html');

    cy.getByTestId('component_carousel')
    .should('not.have.class', 'is.multiline')
    .should('have.class', 'glide')

    cy.getByTestId('component_carousel')
    cy.get('#prevButton')
    .should('exist')

    cy.getByTestId('component_carousel')
    cy.get('#nextButton')
    .should('exist')

    cy.getByTestId('component_carousel')
    cy.get('.carousel-item')
    .should('have.class', 'glide__slide')

    cy.percySnapshotPreview('Carousel preview');
  });

  it('renders correctly in edit mode', function () {
    cy.intercept(
        'POST',
        '**/pagecontainer/container/carousel.websight-dialogs-service.save-properties.action'
    ).as('saveProperties');

    cy.visit(
        '/apps/websight/index.html/content/low-code-luna-test/pages/Carousel::editor'
    );

    cy.getByTestId(paths.title)
    .click({force: true})
    .find('span.name')
    .should('contain.text', 'Carousel');

    cy.percySnapshotPageEditor('Carousel editor');

    cy.get('button[data-resize-button]').click();

    cy.getByTestId('ToolbarItem_Properties').click({force: true});
    cy.getByTestId('ModalDialog_Carousel')
      .findByTestId('Input_Slidestoshow').clear().type('5');

    cy.percySnapshotDialog('Carousel dialog');

    cy.getByTestId('Action_Submit').click();
    cy.wait('@saveProperties');

    cy.request(
        '/content/low-code-luna-test/pages/Carousel/jcr:content/pagecontainer/container/carousel.json'
    )
    .its('body')
    .should('deep.eq', {
      'sling:resourceType': 'luna/components/carousel',
      'jcr:primaryType': 'nt:unstructured',
      slidesToShow: '5'
    });
  });

});
