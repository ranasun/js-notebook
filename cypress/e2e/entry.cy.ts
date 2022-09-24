describe('Entry', () => {
  it('shows initial entry', () => {
    cy.visit('/')
      .get('[data-cy=entry]')
      .should('be.visible')
      .should('have.length', 1)
      .within(() => {
        cy.get('[data-cy=editor]')
          .should('be.visible')
          .should('have.text', '')
          .get('[data-cy=code-preview]')
          .should('not.exist')
          .get('[data-cy=text-preview]')
          .should('not.exist');
      });
  });

  it('creates a new entry on submit', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('be.visible')
      .type('console.log("It works"){shift}{enter}')
      .get('[data-cy=editor]')
      .should('have.length', 2);
  });

  it('can use import statements', () => {
    cy.visit('/')
      .intercept('*esbuild*')
      .as('esbuild')
      .get('[data-cy=entry]')
      .within(() => {
        cy.get('[data-cy=editor]')
          .should('be.visible')
          .type('import React from "react"{shift}{enter}');
      })
      .wait('@esbuild')
      .then((a) => {
        cy.wrap(a.response).should('have.property', 'statusCode', 200);
      })
      .get('[data-cy=entry]')
      .should('have.length', 2);
  });

  it('displays markdown', () => {
    cy.visit('/')
      .get('[data-cy=entry]')
      .should('have.length', 1)
      .get('[data-cy="toggle-entry-type"]')
      .click()
      .get('[data-cy=editor]')
      .type('### Title{shift}{enter}')
      .get('[data-cy=text-preview')
      .should('have.html', '<h3 id="title">Title</h3>');
  });

  it('can move entry up', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .type('1{shift}{enter}')
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .get('[data-cy=move-entry-up]')
      .last()
      .click()
      .get('[data-cy=editor]')
      .first()
      .should('have.text', '')
      .get('[data-cy=editor]')
      .last()
      .should('have.text', '1');
  });

  it('can move entry down', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .type('1{shift}{enter}')
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .get('[data-cy=editor]')
      .first()
      .click()
      .get('[data-cy=move-entry-down]')
      .first()
      .click()
      .get('[data-cy=editor]')
      .first()
      .should('have.text', '')
      .get('[data-cy=editor]')
      .last()
      .should('have.text', '1');
  });

  it('can add new entry above', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .type('First entry')
      .get('[data-cy=add-entry-above]')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .first()
      .should('have.text', '');
  });

  it('can add new entry below', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .type('First entry')
      .get('[data-cy=add-entry-below]')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .last()
      .should('have.text', '');
  });

  it('can remove an entry', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .type('{shift}{enter}')
      .get('[data-cy=remove-entry]')
      .should('have.length', 2)
      .last()
      .click()
      .get('[data-cy=remove-entry]')
      .should('have.length', 1);
  });
});
