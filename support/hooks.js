const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const dotenv = require('dotenv');
const { config } = require('../config/config');
const { getBrowserConfig, getBrowserLaunchOptions } = require('../config/browser.config');

dotenv.config();
setDefaultTimeout(60 * 1000);

let browser;
let context;
let page;

Before(async function() {
  console.log('🚀 Starting test execution...');
  
  // Get browser configuration
  const browserConfig = getBrowserConfig();
  const browserName = browserConfig.defaultBrowser;
  const launchOptions = getBrowserLaunchOptions(browserName);
  
  // Launch browser based on config
  let browserType;
  switch (browserName) {
    case 'firefox':
      browserType = firefox;
      break;
    case 'webkit':
      browserType = webkit;
      break;
    default:
      browserType = chromium;
  }
  
  browser = await browserType.launch({ 
    headless: config.headless,
    slowMo: config.slowMo,
    ...launchOptions,
  });
  
  // Create new context
  context = await browser.newContext({
    viewport: config.viewport,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  // Create new page
  page = await context.newPage();
  
  // Set page timeout from config
  page.setDefaultTimeout(config.timeout.action);
  
  // Store page in world context for step definitions
  this.page = page;
  this.browser = browser;
  this.context = context;
  
  console.log(`✅ Browser setup completed (${browserName})`);
});

After(async function(scenario) {
  console.log('🧹 Cleaning up test environment...');
  
  // Capture screenshot on failure
  if (scenario.result?.status === 'FAILED' && page) {
    try {
      const screenshotPath = `test-results/screenshots/failure-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Screenshot captured: ${screenshotPath}`);
    } catch (error) {
      console.log('⚠️ Failed to capture screenshot:', error);
    }
  }
  
  if (page) {
    await page.close();
  }
  
  if (context) {
    await context.close();
  }
  
  if (browser) {
    await browser.close();
  }
  
  console.log('✅ Cleanup completed');
});
