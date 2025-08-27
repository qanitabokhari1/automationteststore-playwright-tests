import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://automationteststore.com/',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    navigationTimeout: 20000,

    // Add some additional options for better stability
    launchOptions: {
      slowMo: 100, // Add small delay between actions for stability
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Override for Chromium
        launchOptions: {
          args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
        }
      },
    },
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     // Override for Firefox
    //     launchOptions: {
    //       args: ['--disable-web-security']
    //     }
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari'],
    //     // Override for WebKit
    //     launchOptions: {
    //       args: ['--disable-web-security']
    //     }
    //   },
    // },
  ],
  outputDir: 'test-results/',
  // Global timeout for tests
  timeout: 120000,
  // Global expect timeout
  expect: {
    timeout: 10000,
  },
});
