import { homeActions } from '../../actions/homeActions';

const home = new homeActions();

describe('Scenario 1: Jumbo Home Screen Navigation and Shopping Options', () => {
  beforeEach(() => {
    cy.visitHome();
    cy.handleCookieConsent();
  });

  it('Should allow user to navigate to Producten from home screen', () => {
    home.clickProducten();

    cy.get('[data-testid="products-title"]')
      .should('be.visible')
      .and('have.text', 'Producten');

    cy.url().should('include', '/producten');
  });

  it('Should allow user to navigate to Aanbiedingen from home screen', () => {
    home.clickAanbiedingen();
    cy.get('[data-testid="promotion-page-title"]', { timeout: 10000 })
      .should('be.visible')
      .should('have.text', 'Nu in de aanbieding');
    cy.url().should('include', '/aanbiedingen');
  });

  it('Should allow user to navigate to Recepten from home screen', () => {
    home.clickRecepten();
    cy.contains('strong', 'Recepten').should('have.text', 'Recepten');
    cy.url().should('include', '/recepten');
  });

  it('Should allow user to access Mandje (Basket) from home screen', () => {
    home.clickMandje();

    cy.get('[data-testid="jum-heading"]', { timeout: 1000 })
      .should('be.visible')
      .and('contain.text', 'mandje');

    cy.url().should('include', '/mandje');
  });

  it('should display pre-defined shopping options on the home screen', () => {
    const predefinedOptions = [
      {
        text: 'paella',
        hrefPart: '/inspiratie/waardebonnen',
      },
      {
        text: 'zomerfruit',
        hrefPart: '/inspiratie/proef-de-zomer',
      },
      {
        text: 'korting',
        hrefPart: '/aanbiedingen/meloenen/3009631',
      },
    ];

    predefinedOptions.forEach(({ text, hrefPart }) => {
      cy.get('[data-testid="content-carousel-card-link"]', { timeout: 15000 })
        .contains(text)
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', hrefPart);
    });
  });
});
