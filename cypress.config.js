const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'gf336q',
  e2e: {
    specPattern: 'cypress/e2e/**/*.spec.js',
    chromeWebSecurity: false,
    baseUrl: 'https://www.jumbo.com',
    authOrigin: 'https://auth.jumbo.com',
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
});
