describe('Page', () => {
  it('shows initial page', () => {
    cy.visit('/')
      .get('[data-cy=tab]')
      .should('have.length', 1)
      .contains('Page-1')
      .get('[data-cy=tab-panel]')
      .should('have.length', 1)
      .should('be.visible');
  });

  it('can add a page', () => {
    cy.visit('/')
      .get('[data-cy=add-page]')
      .should('exist')
      .click()
      .click()
      .get('[data-cy=tab]')
      .should('have.length', 3)
      .get('[data-cy=tab-panel]')
      .should('have.length', 3)
      .get('[data-cy=tab-panel]')
      .first()
      .should('not.be.visible')
      .get('[data-cy=tab-panel]')
      .last()
      .should('be.visible');
  });

  it('can switch pages', () => {
    cy.visit('/')
      .get('[data-cy=add-page]')
      .should('exist')
      .click()
      .get('[data-cy=tab]')
      .should('have.length', 2)
      .get('[data-cy=tab-panel]')
      .last()
      .should('be.visible')
      .get('[data-cy=tab]')
      .first()
      .click()
      .get('[data-cy=tab-panel]')
      .first()
      .should('be.visible');
  });

  it('can remove a page', () => {
    cy.visit('/')
      .get('[data-cy=remove-page]')
      .first()
      .click()
      .get('[data-cy=tab]')
      .should('not.exist');
  });

  it('can rename a page', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('MyPage');
      },
    })
      .get('[data-cy=tab]')
      .first()
      .dblclick()
      .get('[data-cy=tab]')
      .should('have.text', 'MyPage');
  });
});
