const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const dotenv = require('dotenv');

dotenv.config();

// Extend base test with custom fixtures
const test = base.extend({
  // Authenticated page fixture - automatically logs in before test
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    const username = process.env.USERNAME || 'Qanita12';
    const password = process.env.PASSWORD || 'Qanita123';
    await loginPage.login(username, password);

    await use(page);
  },

  // Login page fixture - provides LoginPage instance
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

const { expect } = require('@playwright/test');

module.exports = {
  test,
  expect,
};
