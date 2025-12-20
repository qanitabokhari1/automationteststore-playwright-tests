const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');

test.describe('SauceDemo Scenario 1: Login with Invalid Password', () => {
  test('Should display error message when login with invalid password', async ({ page }) => {
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);
    const username = 'standard_user';
    const invalidPassword = 'wrong_password';

    try {
      await sauceDemoLoginPage.navigateToLogin();

      await sauceDemoLoginPage.enterUsername(username);

      await sauceDemoLoginPage.enterPassword(invalidPassword);

      await sauceDemoLoginPage.clickSignIn();

      const errorMessage = await sauceDemoLoginPage.verifyErrorMessage();

      expect(errorMessage).toBeTruthy();
      expect(errorMessage.length).toBeGreaterThan(0);
      expect(errorMessage).toContain('Epic sadface');

    } catch (error) {
      throw error;
    }
  });
});
