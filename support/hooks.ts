import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function() {
  console.log('🚀 Starting test execution...');
  
  // Launch browser
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  // Create new context
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  // Create new page
  page = await context.newPage();
  
  // Set page timeout
  page.setDefaultTimeout(30000);
  
  // Store page in world context for step definitions
  (this as any).page = page;
  (this as any).browser = browser;
  (this as any).context = context;
  
  console.log('✅ Browser setup completed');
});

After(async function() {
  console.log('🧹 Cleaning up test environment...');
  
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
