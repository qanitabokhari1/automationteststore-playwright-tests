const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');

test.describe('SauceDemo Scenario 2: Login with Valid Credentials', () => {
  test('Should successfully login and land on dashboard', async ({ page }) => {
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);
    const username = 'standard_user';
    const password = 'secret_sauce';

    try {
      await sauceDemoLoginPage.navigateToLogin();

      await sauceDemoLoginPage.enterUsername(username);

      await sauceDemoLoginPage.enterPassword(password);

      await sauceDemoLoginPage.clickSignIn();

      await sauceDemoLoginPage.verifyDashboard();

    } catch (error) {
      throw error;
    }
  });
});
