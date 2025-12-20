const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const dotenv = require('dotenv');

dotenv.config();
setDefaultTimeout(60 * 1000);

let browser;
let context;
let page;

Before(async function () {

  // Get browser from environment or default to chromium
  const browserName = process.env.BROWSER || 'chromium';

  // Launch browser
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

  const headless = process.env.HEADLESS !== 'false';
  const slowMo = parseInt(process.env.SLOW_MO || '100', 10);

  browser = await browserType.launch({
    headless: headless,
    slowMo: slowMo,
    args: ['--disable-web-security']
  });

  // Create new context
  context = await browser.newContext({
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1280', 10),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '720', 10)
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  // Create new page
  page = await context.newPage();

  // Set page timeout from config
  const actionTimeout = parseInt(process.env.ACTION_TIMEOUT || '15000', 10);
  page.setDefaultTimeout(actionTimeout);

  // Store page in world context for step definitions
  this.page = page;
  this.browser = browser;
  this.context = context;

});

After(async function (scenario) {

  // Capture screenshot on failure
  if (scenario.result?.status === 'FAILED' && page) {
    try {
      const screenshotPath = `test-results/screenshots/failure-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch (error) {
      // Failed to capture screenshot
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

});
