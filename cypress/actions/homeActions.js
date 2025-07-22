export class homeActions {
  clickProducten() {
    cy.get('a[href="/producten/"]')
      .scrollIntoView()
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
  }

  clickRecepten() {
    cy.get('a.nav-menu-item-link[href="/recepten"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
  }

  clickAanbiedingen() {
    cy.get('a.nav-menu-item-link[href="/aanbiedingen/nu"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
  }

  clickMandje() {
    cy.get('[data-testid="basket-price-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click({ force: true });
  }

  predefinedSectionExists(text) {
    return cy.contains('[data-testid="content-carousel-card-link"]', text);
  }
}
