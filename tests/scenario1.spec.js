const { test } = require('@playwright/test'); // Import the 'test' function from the Playwright Test library
const { LoginPage } = require('../pages/LoginPage'); // Import the LoginPage class from the pages directory
const { HomePage } = require('../pages/HomePage'); // Import the HomePage class from the pages directory
const { ProductPage } = require('../pages/ProductPage'); // Import the ProductPage class from the pages directory
const { CartPage } = require('../pages/CartPage'); // Import the CartPage class from the pages directory
const dotenv = require('dotenv'); // Import 'dotenv' to load environment variables from a .env file

dotenv.config(); // Load environment variables from the .env file into process.env

// Group related tests into a single test suite named 'Scenario 1: Complete E-commerce Flow'
test.describe('Scenario 1: Complete E-commerce Flow', () => {

  // Define a specific test case that outlines the end-to-end shopping journey
  test('Login → Home → Select Dove Brand → Add Newest Item to Cart → Verify Cart', async ({ page }) => {
    // Initialize Page Object instances for different pages of the application
    const loginPage = new LoginPage(page); // Instance for interaction with the Login page
    const homePage = new HomePage(page); // Instance for interaction with the Home page
    const productPage = new ProductPage(page); // Instance for interaction with the Product page
    const cartPage = new CartPage(page); // Instance for interaction with the Cart page

    // Retrieve username and password from environment variables or use default values
    const username = process.env.APP_USERNAME || 'Qanita12'; // Username from .env or 'Qanita12'
    const password = process.env.APP_PASSWORD || 'Qanita123'; // Password from .env or 'Qanita123'

    try {
      // Step 1: Navigate to the login section of the application
      await loginPage.navigateToLogin();

      // Step 2: Use the login credentials to authenticate the user
      await loginPage.login(username, password);

      // Step 3: Navigate back to the home page using the primary navigation
      await homePage.clickHomeNav();

      // Step 4: Click on the 'Dove' brand link from the homepage carousel
      await homePage.clickDoveBrandFromCarousel();
      // Step 5: Add the most recently released item into the shopping cart
      await productPage.addNewestItemToCart();

      // Step 6: Verify that the cart contains exactly 1 item as expected
      await cartPage.assertItemInCart(1);

    } catch (error) {
      // If any of the above steps fail, catch the error and throw it to fail the test and show details
      throw error;
    }
  });
});

