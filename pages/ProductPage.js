const { BasePage } = require('../utils/BasePage');

class ProductPage extends BasePage {

  async addNewestItemToCart() {
    try {
      await this.locator('//div[@id="maincontainer"]').waitFor({ state: 'visible', timeout: 2000 });
    } catch (error) {
    }

    const sortDropdown = this.locator('//*[@id="sort"]');

    if (await this.isVisible(sortDropdown)) {
      try {
        await this.click(sortDropdown);
        await this.selectOption(sortDropdown, { index: 7 });

        await this.waitForLoadState('networkidle');
      } catch (error) {
      }
    }

    // Wait for products to load after sorting
    await this.waitForLoadState('networkidle');

    // Find the first product's Add to Cart button (class="productcart" with title="Add to Cart")
    const addToCartButton = this.locator('//a[@class="productcart" and @title="Add to Cart"]').first();

    try {
      // Wait for the button to be visible with timeout
      await addToCartButton.waitFor({ state: 'visible', timeout: 10000 });

      await this.scrollIntoView(addToCartButton);
      await this.click(addToCartButton);
    } catch (error) {
      throw new Error('Add to Cart button not found. Please check the page structure.');
    }

    try {
      await this.locator('//div[contains(@class,"alert") and contains(text(),"success")]').waitFor({ state: 'visible', timeout: 2000 });
    } catch (error) {
    }

    const cartElement = this.locator('//*[@id="maincontainer"]/div/div/div/div/div[2]/div[1]/div[2]/div[3]/div[1]');

    if (await this.isVisible(cartElement)) {
      await this.click(cartElement);
      await this.waitForLoadState('networkidle');
    } else {
      throw new Error('Could not navigate to cart page');
    }
  }

  async sortByLowToHigh() {
    const sortDropdown = this.locator('//*[@id="sort"]');

    if (await this.isVisible(sortDropdown)) {
      try {
        await this.click(sortDropdown);
        await this.selectOption(sortDropdown, { index: 3 });

        await this.waitForLoadState('networkidle');
      } catch (error) {
      }
    }
  }

  async selectLowestTshirt() {
    await this.waitForLoadState('networkidle');

    await this.page.waitForTimeout(5000);
    const productElement = this.page.getByRole('link').filter({ hasText: /^$/ }).first();

    if (await this.isVisible(productElement)) {
      await this.click(productElement);

      await this.waitForLoadState('networkidle');

      await this.addTshirtToCart();

    } else {
      throw new Error('T-shirt product element not found. Please check the page structure.');
    }
  }

  async addTshirtToCart() {
    const addToCartButton = this.page.getByRole('link', { name: ' Add to Cart' });

    if (await this.isVisible(addToCartButton)) {
      await this.scrollIntoView(addToCartButton);
      await this.click(addToCartButton);
    } else {
      throw new Error('Could not find Add to Cart button for T-shirt');
    }

    try {
      await this.locator('//div[contains(@class,"alert") and contains(text(),"success")]').waitFor({ state: 'visible', timeout: 8000 });
    } catch (error) {
    }
  }

  async addHighestValueShoeToCart() {
    const shoesLink = this.page.getByRole('link').filter({ hasText: /^$/ }).first();

    if (await this.isVisible(shoesLink)) {
      await this.click(shoesLink);
    } else {
      const shoesAlternative = this.locator('//a[contains(text(),"Shoes")]').first();
      if (await this.isVisible(shoesAlternative)) {
        await this.click(shoesAlternative);
      } else {
        throw new Error('Shoes section not found');
      }
    }

    await this.waitForLoadState('networkidle');
    await this.sortByHighToLow();

    const productElement = this.page.getByRole('link').filter({ hasText: /^$/ }).first();

    if (await this.isVisible(productElement)) {
      await this.click(productElement);
      await this.waitForLoadState('networkidle');
      await this.setShoeQuantity(2);
      await this.addShoeToCart();
    } else {
      throw new Error('Shoe product element not found. Please check the page structure.');
    }
  }

  async sortByHighToLow() {
    const sortDropdown = this.locator('//*[@id="sort"]');

    if (await this.isVisible(sortDropdown)) {
      try {
        await this.click(sortDropdown);

        await this.selectOption(sortDropdown, { index: 4 });

        await this.waitForLoadState('networkidle');
      } catch (error) {
      }
    }
  }

  async setShoeQuantity(quantity) {
    try {
      const quantityInput = this.locator('//*[@id="product_quantity"]');
      if (await this.isVisible(quantityInput)) {
        await this.fill(quantityInput, String(quantity));
      } else {
        throw new Error('Quantity input not found at selector: //*[@id="product_quantity"]');
      }
    } catch (error) {
      throw new Error(`Failed to set quantity: ${error}`);
    }
  }

  async addShoeToCart() {
    const addToCartButton = this.page.getByRole('link', { name: ' Add to Cart' });

    try {
      await addToCartButton.waitFor({ state: 'visible', timeout: 10000 });

      await this.scrollIntoView(addToCartButton);
      await this.click(addToCartButton);

      try {
        await this.locator('//div[contains(@class,"alert") and contains(text(),"success")]').waitFor({ state: 'visible', timeout: 8000 });
      } catch (error) {
      }
    } catch (e) {
      throw new Error('Add to Cart button not found for shoe');
    }
  }
}

module.exports = { ProductPage };
