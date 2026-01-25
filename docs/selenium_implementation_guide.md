# Selenium Implementation Guide

## 📋 Table of Contents
1. [Setup & Installation](#setup--installation)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Configuration](#configuration)
5. [Reporting Setup](#reporting-setup)
6. [Complete Code Examples](#complete-code-examples)

---

## Setup & Installation

### Prerequisites
```bash
# Node.js (v16 or higher)
node --version

# npm
npm --version
```

### Installation Steps

```bash
# 1. Initialize project
npm init -y

# 2. Install Selenium WebDriver
npm install selenium-webdriver

# 3. Install browser drivers
npm install chromedriver geckodriver

# 4. Install test framework (Mocha)
npm install --save-dev mocha chai

# 5. Install Cucumber for BDD
npm install @cucumber/cucumber

# 6. Install reporting tools
npm install --save-dev mochawesome allure-commandline

# 7. Install utilities
npm install dotenv
```

### package.json

```json
{
  "name": "automationteststore-selenium-tests",
  "version": "1.0.0",
  "description": "Selenium test automation framework",
  "scripts": {
    "test": "mocha tests/**/*.spec.js --timeout 60000",
    "test:scenario1": "mocha tests/scenario1.spec.js --timeout 60000",
    "test:report": "mocha tests/**/*.spec.js --reporter mochawesome --timeout 60000",
    "test:bdd": "cucumber-js",
    "report:allure": "allure generate allure-results --clean && allure open"
  },
  "dependencies": {
    "selenium-webdriver": "^4.15.0",
    "@cucumber/cucumber": "^10.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "mocha": "^10.2.0",
    "chai": "^4.3.10",
    "mochawesome": "^7.1.3",
    "allure-commandline": "^2.25.0",
    "chromedriver": "^119.0.0",
    "geckodriver": "^4.3.0"
  }
}
```

---

## Project Structure

```
automationteststore-selenium-tests/
│
├── config/
│   └── config.js                # Configuration management
│
├── utils/
│   ├── BasePage.js              # Base class with common methods
│   ├── DriverFactory.js         # WebDriver initialization
│   └── WaitHelper.js            # Custom wait utilities
│
├── pages/
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── ProductPage.js
│   └── CartPage.js
│
├── tests/
│   ├── scenario1.spec.js
│   ├── scenario2.spec.js
│   ├── scenario3.spec.js
│   └── scenario4.spec.js
│
├── features/                     # BDD feature files
│   ├── scenario1.feature
│   ├── scenario2.feature
│   ├── scenario3.feature
│   └── scenario4.feature
│
├── steps/                        # Cucumber step definitions
│   ├── common.steps.js
│   ├── scenario1.steps.js
│   ├── scenario2.steps.js
│   ├── scenario3.steps.js
│   └── scenario4.steps.js
│
├── support/
│   ├── hooks.js                 # Before/After hooks
│   └── world.js                 # Custom World (context)
│
├── test-results/
│   └── failure-screenshots/
│
├── allure-results/
├── mochawesome-report/
│
├── .env
├── .mocharc.json                # Mocha configuration
├── cucumber.js                  # Cucumber configuration
└── package.json
```

---

## Core Components

### 1. DriverFactory (WebDriver Initialization)

**File**: `utils/DriverFactory.js`

```javascript
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

class DriverFactory {
  static async createDriver(browserName = 'chrome') {
    let driver;
    
    switch (browserName.toLowerCase()) {
      case 'chrome':
        const chromeOptions = new chrome.Options();
        if (process.env.HEADLESS === 'true') {
          chromeOptions.addArguments('--headless');
        }
        chromeOptions.addArguments('--disable-gpu');
        chromeOptions.addArguments('--no-sandbox');
        chromeOptions.addArguments('--window-size=1280,720');
        
        driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(chromeOptions)
          .build();
        break;
        
      case 'firefox':
        const firefoxOptions = new firefox.Options();
        if (process.env.HEADLESS === 'true') {
          firefoxOptions.addArguments('--headless');
        }
        firefoxOptions.addArguments('--width=1280');
        firefoxOptions.addArguments('--height=720');
        
        driver = await new Builder()
          .forBrowser('firefox')
          .setFirefoxOptions(firefoxOptions)
          .build();
        break;
        
      default:
        throw new Error(`Unsupported browser: ${browserName}`);
    }
    
    // Set timeouts
    await driver.manage().setTimeouts({
      implicit: parseInt(process.env.ACTION_TIMEOUT || '10000', 10),
      pageLoad: parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10),
      script: 30000
    });
    
    return driver;
  }
}

module.exports = { DriverFactory };
```

---

## Configuration

### 1. Environment Variables (.env)

```env
# Application
BASE_URL=https://automationteststore.com/

# Credentials
USERNAME=Qanita12
PASSWORD=Qanita123

# Browser Settings
BROWSER=chrome              # chrome, firefox
HEADLESS=false              # true for headless mode

# Timeouts (milliseconds)
ACTION_TIMEOUT=10000
NAVIGATION_TIMEOUT=30000
```

---

## Reporting Setup

### 1. Mocha Configuration (.mocharc.json)

```json
{
  "timeout": 60000,
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "mochawesome-report",
    "reportFilename": "test-report",
    "html": true,
    "json": true,
    "overwrite": false,
    "timestamp": "longDate"
  },
  "spec": "tests/**/*.spec.js"
}
```

---

## Summary

This guide provides a comprehensive path to implementing a Selenium-based test automation framework that mirrors the structure and capabilities of the existing Playwright framework. While Selenium requires more manual effort for waiting and reporting, it remains a powerful and widely-used tool for cross-browser automation.
