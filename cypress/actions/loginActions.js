export class loginActions {
  login() {
    cy.contains('span[data-dd-privacy="mask"]', 'Inloggen').click({
      force: true,
    });

    const email = Cypress.env('email');
    const passwordEncoded = Cypress.env('passwordEncoded');
    const password = atob(passwordEncoded);

    expect(email, 'email must be defined').to.exist;
    expect(passwordEncoded, 'password must be defined').to.exist;

    cy.origin(
      Cypress.env('authOrigin'),
      { args: { email, password } },
      ({ email, password }) => {
        cy.get('input[name="username"]').type(email);
        cy.get('input[name="password"]').type(password, {
          force: true,
          log: false,
        });

        cy.get('button[data-action-button-primary="true"]', { timeout: 10000 })
          .should('be.visible')
          .click();
      },
    );
  }
}
