describe('App', () => {
  it('successfully loaded', () => {
    cy.visit('/');
    cy.get('[data-cy=navbar]').should('be.visible');
    cy.get('[data-cy=menu-group]').should('be.visible');
    cy.get('[data-cy=tab-items]').should('be.visible');
    cy.get('[data-cy=tab-contents]').should('be.visible');
  });
});
