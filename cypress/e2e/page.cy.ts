describe('Page', () => {
  it('shows initial page', () => {
    cy.visit('/');
  });

  it('can add a page', () => {
    cy.get('[data-cy=add-page]').should('exist').click();
    cy.get('[data-cy=add-page]').should('exist').click();
    cy.get('[data-cy=tab]').should('have.length', 3);
    cy.get('[data-cy=tab-panel]').should('have.length', 3);
    cy.get('[data-cy=tab-panel]').first().should('not.be.visible');
    cy.get('[data-cy=tab-panel]').last().should('be.visible');
  });

  it('can switch pages', () => {
    cy.get('[data-cy=tab]').first().click();
    cy.get('[data-cy=tab-panel]').first().should('be.visible');
  });

  it('can remove a page', () => {
    cy.get('[data-cy=tab]').first().click();
    cy.get('[data-cy=remove-page]').first().click();
    cy.get('[data-cy=tab]').first().click();
    cy.get('[data-cy=remove-page]').first().click();
    cy.get('[data-cy=tab]').should('have.text', 'Page-3');
    cy.get('[data-cy=tab]').should('have.length', 1);
    cy.get('[data-cy=tab-panel]').should('have.length', 1);
  });
});
