const { test } = require('@playwright/test'); // Import the 'test' function from Playwright's testing library
const { LoginPage } = require('../pages/LoginPage'); // Import the LoginPage class to interact with login elements
const { HomePage } = require('../pages/HomePage'); // Import the HomePage class to interact with navigation and home elements
const { ProductPage } = require('../pages/ProductPage'); // Import the ProductPage class to interact with product listings and sorting
const dotenv = require('dotenv'); // Import the 'dotenv' package to manage environment variables

dotenv.config(); // Load environment variables from the .env file for configuration

// Start a test suite for Scenario 2, focusing on T-shirts and Shoes shopping
test.describe('Scenario 2: T-shirts and Shoes Shopping Flow', () => {

  // Define a comprehensive test case for logging in and selecting specific products
  test('Login → Apparel → T-shirts → Sort Low to High → Select Lowest → Shoes → Sort High to Low → Add Highest (Qty: 2) → Verify Cart', async ({ page }) => {
    // Instantiate Page Objects with the current 'page' instance provided by Playwright
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Define credentials, prioritizing environment variables or using hardcoded defaults
    const username = process.env.APP_USERNAME || 'Qanita12'; // Use APP_USERNAME from .env or default 'Qanita12'
    const password = process.env.APP_PASSWORD || 'Qanita123'; // Use APP_PASSWORD from .env or default 'Qanita123'

    try {
      // Step 1: Open the login page in the browser
      await loginPage.navigateToLogin();

      // Step 2: Perform the login operation using the provided credentials
      await loginPage.login(username, password);

      // Step 3: Navigate to the main "Apparel & Accessories" section from the menu
      await homePage.navigateToApparelSection();

      // Step 4: Specifically navigate into the "T-shirts" sub-category
      await homePage.navigateToTshirtsSection();

      // Step 5: Sort the listed T-shirts by price in ascending order (Low to High)
      await productPage.sortByLowToHigh();

      // Step 6: Identify and select the T-shirt with the lowest price
      await productPage.selectLowestTshirt();

      // Step 7: Navigate back to the "Apparel & Accessories" section
      await homePage.navigateToApparelSection();

      // Step 8: Specifically navigate into the "Shoes" sub-category
      await homePage.navigateToShoesSection();

      // Step 9: Sort the shoes by price in descending order (High to Low)
      await productPage.sortByHighToLow();

      // Step 10: Add the shoe with the highest price to the shopping cart
      await productPage.addHighestValueShoeToCart();

    } catch (error) {
      // Catch any unexpected errors that occur during the test flow and re-throw them
      throw error;
    }
  });
});

