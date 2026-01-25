// Import Page and Locator types from Playwright Test
// These are mainly useful for documentation, IntelliSense, and type clarity
const { Page, Locator } = require('@playwright/test');

// BasePage class
// This acts as a parent class for all page objects in your framework
// It contains reusable helper methods for common page actions
class BasePage {

  // Constructor runs when a new instance of BasePage (or child class) is created
  // It receives the Playwright 'page' object from the test
  constructor(page) {
    // Store the page instance so it can be used across all methods
    this.page = page;
  }

  /**
   * Click on an element
   * Playwright automatically waits for:
   * - element to be attached to DOM
   * - visible
   * - enabled
   * - stable (not moving)
   */
  async click(locator) {
    // If locator is a string (CSS/XPath), convert it into a Playwright locator
    // Otherwise, assume it is already a Locator object
    const element =
      typeof locator === 'string'
        ? this.page.locator(locator)
        : locator;

    // Perform the click action
    await element.click();
  }

  /**
   * Fill an input field
   * Automatically clears the field before typing
   * Auto-waits for the element to be ready
   */
  async fill(locator, value) {
    // Convert string selector into locator if needed
    const element =
      typeof locator === 'string'
        ? this.page.locator(locator)
        : locator;

    // Fill the input with the provided value
    await element.fill(value);
  }

  /**
   * Select an option from a dropdown (<select>)
   * Auto-waits until the dropdown is ready
   */
  async selectOption(locator, value) {
    // Resolve locator whether string or Locator object
    const element =
      typeof locator === 'string'
        ? this.page.locator(locator)
        : locator;

    // Select the option by value, label, or index
    await element.selectOption(value);
  }

  /**
   * Get text content from an element
   * Returns the raw text inside the element
   */
  async getText(locator) {
    // Resolve locator
    const element =
      typeof locator === 'string'
        ? this.page.locator(locator)
        : locator;

    // Extract and return the text content
    return await element.textContent();
  }

  /**
   * Check whether an element is visible on the page
   * Returns true or false
   */
  async isVisible(locator) {
    // Resolve locator
    const element =
      typeof locator === 'string'
        ? this.page.locator(locator)
        : locator;

    // Check visibility
    return await element.isVisible();
  }

  /**
   * Scroll element into the viewport if it is not already visible
   * Useful for elements below the fold
   */
  async scrollIntoView(locator) {
    // Resolve locator
    const element =
      typeof locator === 'string'
        ? this.page.locator(locator)
        : locator;

    // Scroll the element into view if needed
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Return a Playwright locator
   * Useful when chaining actions in page objects
   */
  locator(selector) {
    // Create and return a locator using the provided selector
    return this.page.locator(selector);
  }

  /**
   * Get element using ARIA role
   * Recommended by Playwright for stable and accessible selectors
   */
  getByRole(role, options) {
    // Example: getByRole('button', { name: 'Save' })
    return this.page.getByRole(role, options);
  }

  /**
   * Get element by visible text
   */
  getByText(text, options) {
    // Example: getByText('Submit')
    return this.page.getByText(text, options);
  }

  /**
   * Get element by associated label text
   * Commonly used for form inputs
   */
  getByLabel(text, options) {
    // Example: getByLabel('Email')
    return this.page.getByLabel(text, options);
  }

  /**
   * Navigate to a specific URL
   * Supports custom navigation options
   *
   * @param {string} url - URL to navigate to
   * @param {object} options - Optional navigation settings
   */
  async navigateTo(url, options = {}) {
    // Default navigation behavior
    const defaultOptions = {
      // 'commit' waits only until navigation starts
      // This makes navigation faster and avoids waiting for all resources
      waitUntil: 'commit',

      // Maximum wait time for navigation
      timeout: 30000,
    };

    // Merge default options with user-provided options
    const mergedOptions = { ...defaultOptions, ...options };

    // Navigate to the given URL
    await this.page.goto(url, mergedOptions);
  }

  /**
   * Wait for the page to reach a specific load state
   * Default is 'networkidle' (no network requests for 500ms)
   */
  async waitForLoadState(state = 'networkidle') {
    // Pause execution until the desired load state is reached
    await this.page.waitForLoadState(state);
  }

  /**
   * Explicitly wait for a selector
   * Should be used sparingly since Playwright auto-waits by default
   */
  async waitForSelector(selector, options) {
    // Wait until the selector meets the provided conditions
    await this.page.waitForSelector(selector, options);
  }

  /**
   * Get the current page URL
   */
  getUrl() {
    // Return the current browser URL
    return this.page.url();
  }

  /**
   * Get the page title
   */
  async getTitle() {
    // Return the page title text
    return await this.page.title();
  }
}

// Export BasePage so it can be extended by other page classes
module.exports = { BasePage };
