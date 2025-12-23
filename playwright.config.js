const { defineConfig, devices } = require('@playwright/test'); // Import Playwright configuration and device utilities
const dotenv = require('dotenv'); // Import dotenv to manage environment variables

// Load environment variables from the .env file
dotenv.config();

/**
 * Read environment variables with defaults
 */
// Define the Base URL for the application under test, defaulting to automationteststore.com
const BASE_URL = process.env.BASE_URL || 'https://automationteststore.com/';

// Set timeout for user actions like click, fill, etc.
const ACTION_TIMEOUT = parseInt(process.env.ACTION_TIMEOUT || '30000');
// Set timeout for page navigation actions
const NAVIGATION_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT || '30000');
// Set the overall timeout for each test case
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '30000');

// Check if the current environment is a Continuous Integration server
const IS_CI = !!process.env.CI;

// Export the configuration object for Playwright
module.exports = defineConfig({
  // Directory where tests are looked for
  testDir: './tests',
  // Run tests in files in parallel to save time
  fullyParallel: true,
  // Prevent accidentally running only one test in CI (fails the build)
  forbidOnly: IS_CI,
  // Number of retries for failed tests (higher on CI for stability)
  retries: IS_CI ? 2 : 0,
  // Number of parallel worker processes (limited to 1 on CI)
  workers: IS_CI ? 1 : undefined,
  // Configuration for various test reporters
  reporter: [
    ['html'], // Generates a standard HTML report
    ['json', { outputFile: 'test-results/results.json' }], // Generates a JSON report for post-processing
    ['allure-playwright', { outputFolder: 'allure-results' }], // Generates results for Allure reporting
  ],
  use: {
    // The base URL used for navigations
    baseURL: BASE_URL,
    // Default size of the browser window
    viewport: { width: 1280, height: 720 },
    // Timeout for individual actions like clicking
    actionTimeout: ACTION_TIMEOUT,
    // Timeout for page navigations
    navigationTimeout: NAVIGATION_TIMEOUT,
    // Take a screenshot when a test fails for debugging
    screenshot: 'only-on-failure',
    // Record video for failed tests
    video: 'retain-on-failure',
    // Record execution trace on the first retry of a failed test
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      // Run tests in Google Chrome
      name: 'chromium',
      // Emulate the Desktop Chrome device settings
      use: { ...devices['Desktop Chrome'] },
    },
    // The following browser configurations are currently commented out:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});

