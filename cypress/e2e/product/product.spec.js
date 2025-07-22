import { ProductActions } from '../../actions/productActions';

const product = new ProductActions();

describe('Scenario 1: Jumbo Home Screen Navigation and Shopping Options', () => {
  beforeEach(() => {
    cy.visitHome();
    cy.handleCookieConsent();
  });

  it('should validate basket quantity after update', () => {
    product.clickProducten();
    product.searchProducten();
    product.checkPrices();
  });
});
