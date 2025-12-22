const { Page, Locator } = require('@playwright/test');


//typescript extra remove

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Click on an element
   * Auto-waits for element to be ready (attached, visible, stable, enabled)
   */
  async click(locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click();
  }

  /**
   * Fill an input field
   * Auto-waits for element to be ready before filling
   */
  async fill(locator, value) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(value);
  }

  /**
   * Select an option from a dropdown
   * Auto-waits for element to be ready before selecting
   */
  async selectOption(locator, value) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption(value);
  }

  /**
   * Get text content from an element
   * Auto-waits for element to be ready before extracting text
   */
  async getText(locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.textContent();
  }

  /**
   * Check if element is visible
   * Auto-waits for element to be ready before checking visibility
   */
  async isVisible(locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isVisible();
  }

  /**
   * Scroll element into view if needed
   * Auto-waits and scrolls if element is not in viewport
   */
  async scrollIntoView(locator) {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Get a locator (useful for chaining operations)
   */
  locator(selector) {
    return this.page.locator(selector);
  }

  /**
   * Get element by role (semantic locator)
   */
  getByRole(role, options) {
    return this.page.getByRole(role, options);
  }

  /**
   * Get element by text
   */
  getByText(text, options) {
    return this.page.getByText(text, options);
  }

  /**
   * Get element by label
   */
  getByLabel(text, options) {
    return this.page.getByLabel(text, options);
  }

  /**
   * Navigation helpers
   * @param {string} url - The URL to navigate to
   * @param {object} options - Navigation options
   * @param {string} options.waitUntil - When to consider navigation successful: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'
   * @param {number} options.timeout - Maximum navigation time in milliseconds (default: 60000)
   */
  async navigateTo(url, options = {}) {
    const defaultOptions = {
      waitUntil: 'commit', // Only wait for navigation to start, not for resources
      timeout: 90000,
    };

    const mergedOptions = { ...defaultOptions, ...options };
    await this.page.goto(url, mergedOptions);
  }

  /**
   * Wait for page load state
   */
  async waitForLoadState(state = 'networkidle') {
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for selector (use sparingly - prefer auto-waiting)
   */
  async waitForSelector(selector, options) {
    await this.page.waitForSelector(selector, options);
  }

  /**
   * Get current URL
   */
  getUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle() {
    return await this.page.title();
  }
}

module.exports = { BasePage };
