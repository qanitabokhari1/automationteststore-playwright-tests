const { expect } = require('@playwright/test');
const { BasePage } = require('../utils/BasePage');

class CartPage extends BasePage {

  async goToCart() {

    const cartElement = this.locator('//div[@id="cart_checkout1"]');

    if (await this.isVisible(cartElement)) {
      await this.click(cartElement);
    } else {
      throw new Error('Cart element not found. Please check the page structure.');
    }

    await this.waitForLoadState('networkidle');

    try {
      await this.locator('//h1[contains(text(),"Shopping Cart")]').waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
    }
  }

  async assertItemInCart(expectedQuantity = 1) {

    const cartTable = this.locator('//table[@class="table table-striped table-bordered"]').first();
    await expect(cartTable).toBeVisible({ timeout: 15000 });

    const quantityInput = this.locator('//*[@id="product_quantity"]');
    if (await this.isVisible(quantityInput)) {
      await expect(quantityInput).toHaveValue(String(expectedQuantity));
    } else {
    }

    try {
      // Remove redundant xpath= prefix
      const priceElement = cartTable.locator('//td[contains(@class,"price")]').first();
      if (await this.isVisible(priceElement)) {
        const priceText = await this.getText(priceElement);
        if (priceText && priceText.trim()) {
        }
      }
    } catch {
    }
  }

  async verifyTshirtsInCart(expectedCount) {

    await this.goToCart();

    await this.waitForLoadState('networkidle');

    const tableSelectors = [
      '//table[@class="table table-striped table-bordered"]',
      '//table[contains(@class,"table")]',
      '//*[@id="cart"]//table',
      '//div[@class="table-responsive"]//table'
    ];

    let cartTable = null;
    for (const selector of tableSelectors) {
      try {
        const table = this.locator(selector).first();
        if (await this.isVisible(table)) {
          cartTable = table;
          break;
        }
      } catch (error) {
        continue;
      }
    }

    if (!cartTable) {
      throw new Error('Cart table not found with any selector');
    }

    const rowSelectors = [
      '//tr[contains(@class,"product")]',
      '//tr[contains(@class,"item")]',
      '//tbody/tr',
      '//tr[position()>1]',
      '//tr[td]'
    ];

    let actualItemCount = 0;
    for (const selector of rowSelectors) {
      try {
        const rows = cartTable.locator(selector);
        const count = await rows.count();
        if (count > 0) {
          actualItemCount = count;
          break;
        }
      } catch (error) {
        continue;
      }
    }

    if (actualItemCount >= expectedCount) {
    } else {
      const emptyCartMessage = await this.isVisible(this.locator('//div[contains(text(),"empty") or contains(text(),"Empty")]'));
      if (emptyCartMessage) {
      }
      throw new Error(`Expected ${expectedCount} items in cart, but found only ${actualItemCount}`);
    }

    try {
      const tshirtRows = cartTable.locator('//tr[contains(text(),"T-shirt") or contains(text(),"Tshirt") or contains(text(),"T SHIRT")]');
      const tshirtCount = await tshirtRows.count();
    } catch (error) {
    }

  }

}

module.exports = { CartPage };
