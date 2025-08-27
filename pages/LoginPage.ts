import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLogin() {
    const baseUrl = process.env.BASE_URL || 'https://automationteststore.com/';
    const loginUrl = `${baseUrl}index.php?rt=account/login`;
    await this.page.goto(loginUrl);
    await expect(this.page.locator('//form[@id="loginFrm"]')).toBeVisible({ timeout: 15000 });
  }

  async login(username: string, password: string) {
    
    const usernameField = this.page.locator('#loginFrm_loginname');
    const passwordField = this.page.locator('#loginFrm_password');
    const loginButton = this.page.getByRole('button', { name: 'Login' });
    
    await expect(usernameField).toBeVisible({ timeout: 10000 });
    await expect(passwordField).toBeVisible({ timeout: 10000 });
    await expect(loginButton).toBeVisible({ timeout: 10000 });
    
    await usernameField.fill(username);
    await passwordField.fill(password);
    
    await loginButton.click();
    
    try {
        await this.page.locator('//a[contains(text(),"Welcome back")]').waitFor({ state: 'visible', timeout: 1000 })
      console.log('✓ Login successful - user authenticated');
    } catch (error) {
      console.log('Login verification failed, checking if still on login page...');
      
      const currentUrl = this.page.url();
      if (currentUrl.includes('login')) {
        throw new Error('Login failed - still on login page');
      }
      console.log('✓ Login appears to have succeeded (redirected from login page)');
    }
  }
}
