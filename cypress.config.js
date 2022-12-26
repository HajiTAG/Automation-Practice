const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //defaultCommandTimeout: 5000, //Overloading default Timeut
    "chromeWebSecurity": false, //To allow visitng differnet web pages
    testIsolation: false, //Run all Test from teh same state and stage
    fixturesFolder: 'cypress/fixtures',
  },
});
