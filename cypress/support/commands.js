import 'cypress-wait-until';

Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
});
Cypress.on('uncaught:exception', (err, runnable) => {
  // return false to prevent Cypress from failing the test
  if (err.message.includes('AbortError')) {
    return false;
  }
  // otherwise, let Cypress handle it normally
  return true;
});

Cypress.Commands.add('handleCookieConsent', () => {
  cy.contains('button', 'Akkoord', { timeout: 20000 })
    .scrollIntoView({ force: true })
    .should('be.visible')
    .click({ force: true });
});
