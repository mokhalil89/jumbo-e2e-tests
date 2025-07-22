import { loginActions } from '../../actions/loginActions';

const login = new loginActions();

describe('Login Flow', () => {
  before(() => {
    cy.visitHome();
    cy.handleCookieConsent();
  });

  it('should log in successfully', () => {
    login.login();

    cy.url().should('not.include', '/login');
    cy.get('[data-testid="jum-button"] span[data-dd-privacy="mask"]', {
      timeout: 10000,
    })
      .should('be.visible')
      .and('contain.text', 'Mohamed');
  });
});
