const { expect } = require('@playwright/test');
const { BasePage } = require('../utils/BasePage');

class LoginPage extends BasePage {
  async navigateToLogin() {
    const baseUrl = process.env.BASE_URL || 'https://automationteststore.com/';
    const loginUrl = `${baseUrl}index.php?rt=account/login`;
    await this.navigateTo(loginUrl);
    await expect(this.locator('//form[@id="loginFrm"]')).toBeVisible({ timeout: 15000 });
  }

  async login(username, password) {
    const usernameField = this.locator('#loginFrm_loginname');
    const passwordField = this.locator('#loginFrm_password');
    const loginButton = this.getByRole('button', { name: 'Login' });

    // Playwright auto-waits for elements to be ready
    await expect(usernameField).toBeVisible({ timeout: 10000 });
    await expect(passwordField).toBeVisible({ timeout: 10000 });
    await expect(loginButton).toBeVisible({ timeout: 10000 });

    await this.fill(usernameField, username);
    await this.fill(passwordField, password);
    await this.click(loginButton);

    try {
      await this.locator('//a[contains(text(),"Welcome back")]').waitFor({ state: 'visible', timeout: 1000 });
      console.log('✓ Login successful - user authenticated');
    } catch (error) {
      console.log('Login verification failed, checking if still on login page...');

      const currentUrl = this.getUrl();
      if (currentUrl.includes('login')) {
        throw new Error('Login failed - still on login page');
      }
      console.log('✓ Login appears to have succeeded (redirected from login page)');
    }
  }
}

module.exports = { LoginPage };
