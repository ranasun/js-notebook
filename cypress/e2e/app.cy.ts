// import { inRange } from 'cypress/types/lodash';

import { wrap } from 'cypress/types/lodash';

describe('Entry', () => {
  it('shows initial entry', () => {
    cy.visit('/');
    cy.get('[data-cy=entry]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-cy=editor]').should('be.visible').should('have.text', '');
        cy.get('[data-cy=code-preview]').should('not.exist');
        cy.get('[data-cy=text-preview]').should('not.exist');
      });
  });

  it('can use import statements', () => {
    cy.intercept({ method: 'GET' }).as('esbuild');

    cy.get('[data-cy=entry]').within(() => {
      cy.get('[data-cy=editor]')
        .should('be.visible')
        .type('import React from "react"{shift}{enter}');
      // .type('console.log("It works"){shift}{enter}');
    });

    cy.wait('@esbuild').then((a) => {
      cy.wrap(a.response).should('have.property', 'statusCode', 200);
      // cy.get('iframe').get('#root').should('contain', '"It works');
    });
  });

  it('creates a new entry on submit', () => {
    cy.get('[data-cy=entry]')
      .last()
      .within(() => {
        cy.get('[data-cy=editor]').should('be.visible').should('have.text', '');
      });
  });

  it('displays markdown', () => {
    cy.get('[data-cy=entry]')
      .last()
      .within(() => {
        cy.get('[data-cy="toggle-entry-type"]').click();
      });

    cy.get('[data-cy=entry] [data-cy=editor]')
      .last()
      .type('### Title{shift}{enter}')
      .then(() => {
        cy.get('[data-cy=text-preview').contains('Title');
      });
  });

  it('can move entry up', () => {
    cy.get('[data-cy=entry]')
      .last()
      .within(() => {
        cy.get('[data-cy=editor]').type('test entry move');
        cy.get('[data-cy=move-entry-up]').click().click().click();
      });
    cy.get('[data-cy=editor]').first().should('have.text', 'test entry move');
  });

  it('can move entry down', () => {
    cy.get('[data-cy=entry]')
      .first()
      .within(() => {
        cy.get('[data-cy=move-entry-down]').click().click().click();
      });
    cy.get('[data-cy=editor]').last().should('have.text', 'test entry move');
  });

  it('can add new entry above', () => {
    cy.get('[data-cy=entry]')
      .first()
      .within(() => {
        cy.get('[data-cy=editor]')
          .should('have.text', 'import React from "react"')
          .click();
        cy.get('[data-cy=add-entry-above]').click();
      });
    cy.get('[data-cy=editor]').first().should('have.text', '');
  });

  it('can add new entry below', () => {
    cy.get('[data-cy=entry]')
      .last()
      .within(() => {
        cy.get('[data-cy=editor]')
          .should('have.text', 'test entry move')
          .click();
        cy.get('[data-cy=add-entry-below]').click();
      });
    cy.get('[data-cy=editor]').last().should('have.text', '');
  });

  it('can remove an entry', () => {
    cy.get('[data-cy=entry]').should('have.length', 5);
    cy.get('[data-cy=entry]')
      .first()
      .within(() => {
        cy.get('[data-cy=editor]').click();
        cy.get('[data-cy=remove-entry]').click();
      });
    cy.get('[data-cy=entry]')
      .last()
      .within(() => {
        cy.get('[data-cy=editor]').click();
        cy.get('[data-cy=remove-entry]').click();
      });

    cy.get('[data-cy=entry]').should('have.length', 3);
  });
});
