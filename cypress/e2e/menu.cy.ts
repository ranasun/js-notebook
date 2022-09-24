describe('Menu', () => {
  it('shows menu', () => {
    cy.visit('/').get('[data-cy=menu-group]').should('be.visible');
  });

  it('shows menu items on click', () => {
    cy.visit('/')
      .get('[data-cy=file-menu]')
      .click()
      .within(() => {
        cy.get('[data-cy=menu-items]').should('be.visible');
      });
  });

  it('hides menu items on blur', () => {
    cy.visit('/')
      .get('[data-cy=file-menu')
      .click()
      .get('[data-cy=menu-items]')
      .should('be.visible')
      .get('[data-cy=navbar]')
      .click()
      .get('[data-cy=menu-items]')
      .should('not.be.visible');
  });

  it('adds new page', () => {
    cy.visit('/')
      .get('[data-cy=page-menu]')
      .click()
      .get('[data-cy=new-page-menu-item]')
      .should('be.visible')
      .click()
      .get('[data-cy=tab]')
      .should('have.length', 2);
  });

  it('removes page', () => {
    cy.visit('/')
      .get('[data-cy=page-menu]')
      .click()
      .get('[data-cy=remove-page-menu-item]')
      .should('be.visible')
      .click()
      .get('[data-cy=tab]')
      .should('not.exist');
  });

  it('rename page', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('MyPage');
      },
    })
      .get('[data-cy=tab]')
      .should('have.text', 'Page-1')
      .get('[data-cy=page-menu]')
      .click()
      .get('[data-cy=rename-page-menu-item]')
      .should('be.visible')
      .click()
      .get('[data-cy=tab]')
      .should('have.text', 'MyPage');
  });
});
