const { test, expect } = require('@playwright/test'); // Import test and expect functions from Playwright for testing and assertions
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage'); // Import the SauceDemoLoginPage class for interacting with the login page

// Define a test suite for SauceDemo Scenario 1 focused on login failures
test.describe('SauceDemo Scenario 1: Login with Invalid Password', () => {

  // Define an individual test case for verifying illegal login attempts
  test('Should display error message when login with invalid password', async ({ page }) => {
    // Instantiate the Login Page Object with the current page
    const sauceDemoLoginPage = new SauceDemoLoginPage(page);

    // Define the test data: a valid username and an invalid password
    const username = 'standard_user';
    const invalidPassword = 'wrong_password';

    try {
      // Step 1: Navigate to the SauceDemo login website
      await sauceDemoLoginPage.navigateToLogin();

      // Step 2: Input the username into the login field
      await sauceDemoLoginPage.enterUsername(username);

      // Step 3: Input the invalid password into the password field
      await sauceDemoLoginPage.enterPassword(invalidPassword);

      // Step 4: Click the login button to submit the form
      await sauceDemoLoginPage.clickSignIn();

      // Step 5: Capture the displayed error message from the UI
      const errorMessage = await sauceDemoLoginPage.verifyErrorMessage();

      // Assertion: Verify that the error message contains the expected "Epic sadface" text
      expect(errorMessage).toContain('Epic sadface');

    } catch (error) {
      // If any step fails, catch the exception and throw it to mark the test as failed
      throw error;
    }
  });
});

