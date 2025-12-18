/**
 * Playwright Fixtures
 * Use these for Playwright tests (not Cucumber BDD tests)
 * 
 * Fixtures provide reusable test dependencies and environments.
 * They encapsulate setup and teardown logic.
 * 
 * Usage in tests:
 * ```javascript
 * const { test } = require('@playwright/test');
 * const { authenticatedPage } = require('./support/fixtures');
 * 
 * test('my test', async ({ authenticatedPage }) => {
 *   // authenticatedPage is already logged in
 * });
 * ```
 */

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

    // Use the authenticated page in the test
    await use(page);

    // Teardown (if needed) - runs after test
    // Could log out here if needed
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
