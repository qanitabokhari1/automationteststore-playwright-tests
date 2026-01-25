const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { SkincarePage } = require('../pages/SkincarePage');
const { CartPage } = require('../pages/CartPage');
const dotenv = require('dotenv');

dotenv.config();

test.describe('Scenario 3: Skincare Section Testing with POM', () => {

  test('Home → Skincare Section → Count Sale/Out of Stock Items → Add Sale Items to Cart → Verify Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const skincarePage = new SkincarePage(page);
    const cartPage = new CartPage(page);

    const username = process.env.LOGIN_USERNAME || 'Qanita12';
    const password = process.env.LOGIN_PASSWORD || 'Qanita123';

    await loginPage.navigateToLogin();
    await loginPage.login(username, password);

    await homePage.navigateToSkincareSection();

    // Encapsulated logic for finding sale items and adding them to cart
    const stats = await skincarePage.addAvailableSaleItemsToCart();

    await page.goto(`${process.env.BASE_URL || 'https://automationteststore.com/'}index.php?rt=checkout/cart`);
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    await cartPage.assertItemInCart(stats.saleItemsAdded);
  });

});
