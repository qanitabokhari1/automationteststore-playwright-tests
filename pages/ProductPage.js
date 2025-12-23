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
      }
      catch (error) {
      }
    }


    // Find the first product's Add to Cart button (class="productcart" with title="Add to Cart")
    const addToCartButton = this.locator('//a[@class="productcart" and @title="Add to Cart"]').first();

    try {
      // Wait for the button to be visible with timeout
      await addToCartButton.waitFor({ state: 'visible' });

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

      } catch (error) {
      }
    }
  }

  async selectLowestTshirt() {
    const productElement = this.page.getByRole('link').filter({ hasText: /^$/ }).first();

    try {
      await productElement.waitFor({ state: 'visible' });
      await this.click(productElement);
      await this.addTshirtToCart();
    } catch (error) {
      throw new Error('T-shirt product element not found. Please check the page structure.');
    }
  }

  async addTshirtToCart() {
    const addToCartButton = this.page.getByRole('link', { name: ' Add to Cart' });

    try {
      await addToCartButton.waitFor({ state: 'visible' });
      await this.scrollIntoView(addToCartButton);
      await this.click(addToCartButton);
    } catch (error) {
      throw new Error('Could not find Add to Cart button for T-shirt');
    }

    try {
      await this.locator('//div[contains(@class,"alert") and contains(text(),"success")]').waitFor({ state: 'visible', timeout: 8000 });
    } catch (error) {
    }
  }

  async addHighestValueShoeToCart() {
    // Navigation to Shoes section and sorting are now handled explicitly in the test
    // This method assumes we're already on the Shoes page and products are sorted

    const productElement = this.page.getByRole('link').filter({ hasText: /^$/ }).first();

    try {
      await productElement.waitFor({ state: 'visible' });
      await this.click(productElement);
      await this.setShoeQuantity(2);
      await this.addShoeToCart();
    } catch (error) {
      throw new Error('Shoe product element not found. Please check the page structure.');
    }
  }

  async sortByHighToLow() {
    const sortDropdown = this.locator('//*[@id="sort"]');

    if (await this.isVisible(sortDropdown)) {
      try {
        await this.click(sortDropdown);

        await this.selectOption(sortDropdown, { index: 4 });

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
      await addToCartButton.waitFor({ state: 'visible' });

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
