const { Given, When } = require('@cucumber/cucumber');
const { SauceDemoLoginPage } = require('../pages/SauceDemoLoginPage');

let sauceDemoLoginPage;

Given('I navigate to the SauceDemo login page', async function() {
  const page = this.page;
  sauceDemoLoginPage = new SauceDemoLoginPage(page);
  this.sauceDemoLoginPage = sauceDemoLoginPage;
  
  console.log('\n=== Step 1: Navigating to SauceDemo login page ===');
  await sauceDemoLoginPage.navigateToLogin();
  console.log('✓ Navigated to SauceDemo login page');
});

When('I enter valid username {string}', async function(username) {
  console.log(`\n=== Step 2: Entering username: ${username} ===`);
  await sauceDemoLoginPage.enterUsername(username);
  console.log('✓ Username entered successfully');
});

When('I enter invalid password {string}', async function(password) {
  console.log(`\n=== Step 3: Entering invalid password ===`);
  await sauceDemoLoginPage.enterPassword(password);
  console.log('✓ Invalid password entered');
});

When('I enter valid password {string}', async function(password) {
  console.log(`\n=== Step 3: Entering valid password ===`);
  await sauceDemoLoginPage.enterPassword(password);
  console.log('✓ Valid password entered');
});

When('I click sign in', async function() {
  console.log('\n=== Step 4: Clicking sign in button ===');
  await sauceDemoLoginPage.clickSignIn();
  console.log('✓ Sign in button clicked');
});
