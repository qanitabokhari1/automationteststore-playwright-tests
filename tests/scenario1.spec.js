const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const dotenv = require('dotenv');

dotenv.config();

test.describe('Scenario 1: Complete E-commerce Flow', () => {
  
  test('Login → Home → Select Dove Brand → Add Newest Item to Cart → Verify Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const username = process.env.USERNAME || 'Qanita12';
    const password = process.env.PASSWORD || 'Qanita123';

    try {

      await loginPage.navigateToLogin();
      
      await loginPage.login(username, password);

      await homePage.clickHomeNav();

      await homePage.clickDoveBrandFromCarousel();

      await productPage.addNewestItemToCart();

      await cartPage.assertItemInCart(1);


    } catch (error) {
      throw error;
    }
  });
});
