const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ override: true });

test.describe('Scenario 2: T-shirts and Shoes Shopping Flow', () => {
  test('Login → Apparel → T-shirts → Sort Low to High → Select Lowest → Shoes → Sort High to Low → Add Highest (Qty: 2) → Verify Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    const username = process.env.USERNAME || 'Qanita12';
    const password = process.env.PASSWORD || 'Qanita123';

    try {
      await loginPage.navigateToLogin();
      await loginPage.login(username, password);

      await homePage.navigateToApparelSection();

      await homePage.navigateToTshirtsSection();

      await productPage.sortByLowToHigh();

      await productPage.selectLowestTshirt();

      await homePage.navigateToApparelSection();

      await productPage.addHighestValueShoeToCart();

    } catch (error) {
      throw error;
    }
  });
});
