/**
 * Main configuration file for the test framework
 * Reads from environment variables with sensible defaults
 */

const config = {
  // Browser configuration
  browser: process.env.BROWSER || 'chromium', // chromium, firefox, webkit, or 'all'
  
  // Application configuration
  baseUrl: process.env.BASE_URL || 'https://automationteststore.com/',
  
  // Test execution configuration
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOW_MO || '100', 10),
  
  // Timeout configuration
  timeout: {
    action: parseInt(process.env.ACTION_TIMEOUT || '15000', 10),
    navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '20000', 10),
    element: parseInt(process.env.ELEMENT_TIMEOUT || '10000', 10),
    test: parseInt(process.env.TEST_TIMEOUT || '120000', 10),
  },
  
  // Retry configuration
  retries: process.env.CI ? 2 : 0,
  
  // Viewport configuration
  viewport: {
    width: parseInt(process.env.VIEWPORT_WIDTH || '1280', 10),
    height: parseInt(process.env.VIEWPORT_HEIGHT || '720', 10),
  },
  
  // Test credentials (should be in .env file)
  credentials: {
    username: process.env.USERNAME || 'Qanita12',
    password: process.env.PASSWORD || 'Qanita123',
  },
  
  // CI/CD configuration
  isCI: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
};

module.exports = { config };
