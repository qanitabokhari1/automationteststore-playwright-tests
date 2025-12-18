const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');

test.describe('SauceDemo Scenario 2: Login with Valid Credentials', () => {
  test('Should successfully login and land on dashboard', async ({ page }) => {
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);
    const username = 'standard_user';
    const password = 'secret_sauce';

    try {
      console.log('\n🚀 Starting SauceDemo Scenario 2: Login with Valid Credentials');
      
      console.log('\n=== Step 1: Navigating to SauceDemo login page ===');
      await sauceDemoLoginPage.navigateToLogin();
      console.log('✓ Navigated to SauceDemo login page');

      console.log(`\n=== Step 2: Entering username: ${username} ===`);
      await sauceDemoLoginPage.enterUsername(username);
      console.log('✓ Username entered successfully');

      console.log('\n=== Step 3: Entering valid password ===');
      await sauceDemoLoginPage.enterPassword(password);
      console.log('✓ Valid password entered');

      console.log('\n=== Step 4: Clicking sign in button ===');
      await sauceDemoLoginPage.clickSignIn();
      console.log('✓ Sign in button clicked');

      console.log('\n=== Assertion: Verifying user landed on dashboard ===');
      await sauceDemoLoginPage.verifyDashboard();
      console.log('✓ User successfully landed on the dashboard');

      // Additional verification - check that we're on the inventory page
      await expect(page).toHaveURL(/.*inventory\.html/);
      console.log('✓ URL verification passed');

      console.log('\n🎉 SCENARIO 2 COMPLETED SUCCESSFULLY! 🎉');
      console.log('All steps completed: Navigate → Enter Username → Enter Valid Password → Click Sign In → Verify Dashboard');

    } catch (error) {
      console.error('\n❌ SCENARIO 2 FAILED ❌');
      console.error('Error details:', error);
      throw error;
    }
  });
});
