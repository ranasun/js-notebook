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

  /***
   * PAGE MENU
   */
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

  /***
   * ENTRY MENU
   */
  it('adds new entry above currently focused entry', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .type('new entry should be above')
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=new-entry-above-menu-item]')
      .should('be.visible')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .last()
      .should('have.text', 'new entry should be above');
  });

  it('adds new entry below currently focused entry', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .type('new entry should be below')
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=new-entry-below-menu-item]')
      .should('be.visible')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .last()
      .should('have.text', '');
  });

  it('moves focused entry up', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .type('this entry should be above')
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=new-entry-above-menu-item]')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .last()
      .should('have.text', 'this entry should be above')
      .click()
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=move-entry-up-menu-item]')
      .click()
      .get('[data-cy=editor]')
      .first()
      .should('have.text', 'this entry should be above');
  });

  it('moves focused entry down', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .type('this entry should be below')
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=new-entry-below-menu-item]')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .first()
      .should('have.text', 'this entry should be below')
      .click()
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=move-entry-down-menu-item]')
      .click()
      .get('[data-cy=editor]')
      .last()
      .should('have.text', 'this entry should be below');
  });

  it('resets focused entry', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .type('this text should should clear out')
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=reset-entry-menu-item]')
      .click()
      .get('[data-cy=editor]')
      .should('have.text', '');
  });

  it('removes focused entry', () => {
    cy.visit('/')
      .get('[data-cy=editor]')
      .should('have.length', 1)
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=new-entry-below-menu-item]')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', 2)
      .get('[data-cy=entry-menu]')
      .click()
      .get('[data-cy=remove-entry-menu-item]')
      .click()
      .get('[data-cy=editor]')
      .should('have.length', '1');
  });
});
