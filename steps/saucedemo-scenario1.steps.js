const { Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Then('I should see an error message', async function() {
  const sauceDemoLoginPage = this.sauceDemoLoginPage;
  console.log('\n=== Assertion: Verifying error message ===');
  const errorMessage = await sauceDemoLoginPage.verifyErrorMessage();
  console.log(`✓ Error message displayed: ${errorMessage}`);
  expect(errorMessage).toBeTruthy();
  expect(errorMessage.length).toBeGreaterThan(0);
});
