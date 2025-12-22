const { Page, Locator } = require('@playwright/test');

class ElementHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Click element with optional retry
   * Note: Playwright already has built-in retry, this is for additional retry logic if needed
   */
  async clickElement(locator, options) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click(options);
  }

  /**
   * Fill input with validation
   * Clears field first, then fills with value
   */
  async fillInput(locator, value, options) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.clear();
    await element.fill(value, options);
  }

  /**
   * Select dropdown option
   * Supports value, label, or index selection
   */
  async selectDropdown(locator, value, options) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption(value, options);
  }

  /**
   * Get text content
   */
  async getText(locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.textContent();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isVisible();
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for element to be visible (use sparingly - prefer auto-waiting)
   */
  async waitForElementVisible(selector, timeout) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Get all matching elements
   */
  getAll(selector) {
    return this.page.locator(selector);
  }

  /**
   * Get first matching element
   */
  getFirst(selector) {
    return this.page.locator(selector).first();
  }

  /**
   * Get last matching element
   */
  getLast(selector) {
    return this.page.locator(selector).last();
  }

  /**
   * Get element by index
   */
  getByIndex(selector, index) {
    return this.page.locator(selector).nth(index);
  }

  /**
   * Count matching elements
   */
  async count(selector) {
    return await this.page.locator(selector).count();
  }
}

module.exports = { ElementHelper };
