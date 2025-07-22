export class ProductActions {
  clickProducten() {
    cy.get('a[href="/producten/"]')
      .scrollIntoView()
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true });
  }

  searchProducten() {
    cy.get('[data-testid="search-input-field"]:visible')
      .should('be.visible')
      .click()
      .clear()
      .focus()
      .type('unicorn{enter}', { delay: 100 })
      .should('have.value', 'unicorn');

    cy.get('[data-testid="jum-button"]:contains("Zoeken")')
      .eq(0)
      .should('not.be.disabled')
      .click();

    cy.get('h3[data-testid="jum-heading"]', { timeout: 6000 }).then(
      ($titles) => {
        const unicornTitles = [];

        [...$titles].forEach((el) => {
          const text = el.innerText.trim();
          if (text.includes('Unicorn')) {
            unicornTitles.push(text);
          }
        });

        const html = `
        <html>
          <head>
            <title>Unicorn Product Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #7b4b94; }
              ul { font-size: 16px; line-height: 1.5; }
              .timestamp { margin-top: 20px; font-size: 12px; color: #999; }
            </style>
          </head>
          <body>
            <h1>🦄 Unicorn Product Report</h1>
            <p><strong>Total found:</strong> ${unicornTitles.length}</p>
            <ul>
              ${unicornTitles.map((title) => `<li>${title}</li>`).join('')}
            </ul>
            <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>
          </body>
        </html>
      `;

        cy.writeFile('cypress/reports/unicorn-report.html', html).then(() => {
          // console.log('done .....');
          // // window.alert(
          // //   `✅ Report generated successfully!\nCheck the report at: cypress/reports/unicorn-report.html`,
          // // );
        });
      },
    );
  }

  checkPrices() {
    cy.get('div.current-price').each(($priceDiv, index) => {
      cy.wrap($priceDiv).within(() => {
        cy.get('span.whole')
          .invoke('text')
          .then((whole) => {
            cy.get('span.fractional')
              .invoke('text')
              .then((fractional) => {
                const price = `${whole}.${fractional}`;
                cy.log(`💰 Product ${index + 1} price: €${price}`);
                console.log(`💰 Product ${index + 1} price: €${price}`);

                expect(whole, `Whole part for product ${index + 1}`).to.not.be
                  .empty;
                expect(fractional, `Fractional part for product ${index + 1}`)
                  .to.not.be.empty;
              });
          });
      });
    });
  }
}
