const { expect } = require('@playwright/test');
const { BasePage } = require('../utils/BasePage');

class SauceDemoLoginPage extends BasePage {
  async navigateToLogin() {
    const baseUrl = 'https://www.saucedemo.com/';
    await this.navigateTo(baseUrl);
    await expect(this.locator('#user-name')).toBeVisible();
  }

  async enterUsername(username) {
    const usernameField = this.locator('#user-name');
    await expect(usernameField).toBeVisible();
    await this.fill(usernameField, username);
  }

  async enterPassword(password) {
    const passwordField = this.locator('#password');
    await expect(passwordField).toBeVisible();
    await this.fill(passwordField, password);
  }

  async clickSignIn() {
    const loginButton = this.locator('#login-button');
    await expect(loginButton).toBeVisible();
    await this.click(loginButton);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async verifyErrorMessage() {
    // SauceDemo shows error message in a div with data-test="error"
    const errorMessage = this.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    return await this.getText(errorMessage);
  }

  async verifyDashboard() {
    // After successful login, user should be on inventory page
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    // Verify dashboard elements are visible
    await expect(this.locator('.inventory_list')).toBeVisible();
  }
}

module.exports = { SauceDemoLoginPage };
