const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');

test.describe('SauceDemo Scenario 1: Login with Invalid Password', () => {
  test('Should display error message when login with invalid password', async ({ page }) => {
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);
    const username = 'standard_user';
    const invalidPassword = 'wrong_password';

    try {
      console.log('\n🚀 Starting SauceDemo Scenario 1: Login with Invalid Password');
      
      console.log('\n=== Step 1: Navigating to SauceDemo login page ===');
      await sauceDemoLoginPage.navigateToLogin();
      console.log('✓ Navigated to SauceDemo login page');

      console.log(`\n=== Step 2: Entering username: ${username} ===`);
      await sauceDemoLoginPage.enterUsername(username);
      console.log('✓ Username entered successfully');

      console.log('\n=== Step 3: Entering invalid password ===');
      await sauceDemoLoginPage.enterPassword(invalidPassword);
      console.log('✓ Invalid password entered');

      console.log('\n=== Step 4: Clicking sign in button ===');
      await sauceDemoLoginPage.clickSignIn();
      console.log('✓ Sign in button clicked');

      console.log('\n=== Assertion: Verifying error message ===');
      const errorMessage = await sauceDemoLoginPage.verifyErrorMessage();
      console.log(`✓ Error message displayed: ${errorMessage}`);
      
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.length).toBeGreaterThan(0);
      expect(errorMessage).toContain('Epic sadface');

      console.log('\n🎉 SCENARIO 1 COMPLETED SUCCESSFULLY! 🎉');
      console.log('All steps completed: Navigate → Enter Username → Enter Invalid Password → Click Sign In → Verify Error Message');

    } catch (error) {
      console.error('\n❌ SCENARIO 1 FAILED ❌');
      console.error('Error details:', error);
      throw error;
    }
  });
});
