const { Then } = require('@cucumber/cucumber');

Then('I should land on the dashboard', async function() {
  const sauceDemoLoginPage = this.sauceDemoLoginPage;
  console.log('\n=== Assertion: Verifying user landed on dashboard ===');
  await sauceDemoLoginPage.verifyDashboard();
  console.log('✓ User successfully landed on the dashboard');
});
