const { Given } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

let loginPage;
let homePage;
let productPage;
let cartPage;

Given('I am logged in as {string} with password {string}', async function(username, password) {
  const page = this.page;
  
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);

  // Store page objects in world context for other step files
  this.loginPage = loginPage;
  this.homePage = homePage;
  this.productPage = productPage;
  this.cartPage = cartPage;

  console.log(`🌐 Base URL: ${process.env.BASE_URL || 'https://automationteststore.com/'}`);
  console.log(`👤 Username: ${username}`);
  console.log('\n=== Step 1: Logging in to the website ===');

  await loginPage.navigateToLogin();
  await loginPage.login(username || process.env.USERNAME, password || process.env.PASSWORD);
  console.log('✓ Login completed successfully');
});
