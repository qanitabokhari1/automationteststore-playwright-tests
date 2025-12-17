const { defineConfig, devices } = require('@playwright/test');
const { config } = require('./config/config');
const { getBrowserConfig, getBrowserLaunchOptions } = require('./config/browser.config');

const browserConfig = getBrowserConfig();

// Map browser names to Playwright device names
const deviceMap = {
  chromium: 'Desktop Chrome',
  firefox: 'Desktop Firefox',
  webkit: 'Desktop Safari',
};

// Create projects dynamically based on config
const projects = browserConfig.enabledBrowsers.map(browser => ({
  name: browser,
  use: {
    ...devices[deviceMap[browser]],
    ...config.viewport,
    launchOptions: getBrowserLaunchOptions(browser),
  },
}));

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: config.isCI,
  retries: config.retries,
  workers: config.workers,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: config.baseUrl,
    headless: config.headless,
    viewport: config.viewport,
    actionTimeout: config.timeout.action,
    navigationTimeout: config.timeout.navigation,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: config.slowMo,
    },
  },
  projects,
  outputDir: 'test-results/',
  timeout: config.timeout.test,
  expect: {
    timeout: config.timeout.element,
  },
});
