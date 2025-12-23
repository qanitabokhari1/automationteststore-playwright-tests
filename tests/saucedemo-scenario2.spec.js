const { test, expect } = require('@playwright/test'); // Import test and expect modules from Playwright test package
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage'); // Import the SauceDemoLoginPage class from the pages directory

// Define a test suite for SauceDemo Scenario 2: Successful login with valid credentials
test.describe('SauceDemo Scenario 2: Login with Valid Credentials', () => {
  // Define a test case to verify successful login and landing on the dashboard
  test('Should successfully login and land on dashboard', async ({ page }) => {
    // Create a new instance of SauceDemoLoginPage and pass the page object to it
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);
    // Define the valid username for testing
    const username = 'standard_user';
    // Define the valid password for testing
    const password = 'secret_sauce';

    try {
      // Step 1: Navigate to the SauceDemo login page
      await sauceDemoLoginPage.navigateToLogin();

      // Step 2: Enter the valid username into the username input field
      await sauceDemoLoginPage.enterUsername(username);

      // Step 3: Enter the valid password into the password input field
      await sauceDemoLoginPage.enterPassword(password);

      // Step 4: Click the 'Sign In' button to proceed with login
      await sauceDemoLoginPage.clickSignIn();

      // Step 5: Verify that the user has successfully landed on the dashboard
      await sauceDemoLoginPage.verifyDashboard();

    } catch (error) {
      // If any error occurs during the test, throw it to ensure the test fails and the error is reported
      throw error;
    }
  });
});

