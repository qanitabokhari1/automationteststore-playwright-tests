const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');
const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ override: true });

test.describe('Scenario 3: Skincare Section Testing with XPath Selectors', () => {

  test('Home → Skincare Section → Count Sale/Out of Stock Items → Add Sale Items to Cart → Verify Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    const username = process.env.USERNAME || 'Qanita12';
    const password = process.env.PASSWORD || 'Qanita123';

    try {
      await loginPage.navigateToLogin();
      await loginPage.login(username, password);

      const skincareLink = page.locator('//*[@id="categorymenu"]/nav/ul/li[4]');
      await expect(skincareLink).toBeVisible({ timeout: 10000 });
      await skincareLink.click();

      await page.waitForTimeout(2000);

      await page.waitForTimeout(2000);

      const productContainers = page.locator('//*[@id="maincontainer"]/div/div/div/div/div[3]/div');
      const totalProducts = await productContainers.count() - 1;

      let saleItemsCount = 0;
      let outOfStockCount = 0;
      let saleItemsAdded = 0;

      //From all products, add available sale items to the cart and collect statistics

      for (let i = 0; i < totalProducts; i++) {
        try {
          const saleIndicator = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/span`);
          const isOnSale = await saleIndicator.isVisible();

          if (isOnSale) {
            saleItemsCount++;

            const outOfStockIndicator = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/div[3]/span`);
            const isOutOfStock = await outOfStockIndicator.isVisible();

            if (isOutOfStock) {
              outOfStockCount++;
            } else {
              try {
                const addToCartButton = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/div[3]/a`);
                if (await addToCartButton.isVisible()) {
                  await addToCartButton.click();
                  saleItemsAdded++;

                  await page.waitForTimeout(1000);
                }
              } catch (addToCartError) {
                // Continue if cannot add to cart
              }
            }
          }
        } catch (error) {
          // Continue on error
        }
      }

      await page.goto(`${process.env.BASE_URL || 'https://automationteststore.com/'}index.php?rt=checkout/cart`);
      await page.waitForLoadState('networkidle', { timeout: 15000 });

      await cartPage.assertItemInCart(saleItemsAdded);

    } catch (error) {
      throw error;
    }
  });

});
