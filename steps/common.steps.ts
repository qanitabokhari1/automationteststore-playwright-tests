import { Given } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

let loginPage: LoginPage;
let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;

Given('I am logged in as {string} with password {string}', async function(username: string, password: string) {
  const page = this.page;
  
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);

  // Store page objects in world context for other step files
  (this as any).loginPage = loginPage;
  (this as any).homePage = homePage;
  (this as any).productPage = productPage;
  (this as any).cartPage = cartPage;

  console.log(`🌐 Base URL: ${process.env.BASE_URL || 'https://automationteststore.com/'}`);
  console.log(`👤 Username: ${username}`);
  console.log('\n=== Step 1: Logging in to the website ===');

  await loginPage.navigateToLogin();
  await loginPage.login(username || process.env.USERNAME!, password || process.env.PASSWORD!);
  console.log('✓ Login completed successfully');
});
