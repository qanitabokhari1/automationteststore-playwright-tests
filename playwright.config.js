const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Read environment variables with defaults
 */
const BASE_URL = process.env.BASE_URL || 'https://automationteststore.com/';
const HEADLESS = process.env.HEADLESS !== 'false'; // Default to true if not specified
const SLOW_MO = parseInt(process.env.SLOW_MO || '100', 10);
const ACTION_TIMEOUT = parseInt(process.env.ACTION_TIMEOUT || '15000', 10);
const NAVIGATION_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT || '20000', 10);
const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '120000', 10);
const IS_CI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: IS_CI ? 2 : 0,
  workers: IS_CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: BASE_URL,
    headless: HEADLESS,
    viewport: { width: 1280, height: 720 },
    actionTimeout: ACTION_TIMEOUT,
    navigationTimeout: NAVIGATION_TIMEOUT,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: SLOW_MO,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=VizDisplayCompositor'],
        },
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
