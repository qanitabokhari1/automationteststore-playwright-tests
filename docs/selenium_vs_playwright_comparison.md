# Selenium vs Playwright Implementation Comparison

## 📋 Table of Contents
1. [Framework Setup Comparison](#framework-setup-comparison)
2. [Locator Strategies Comparison](#locator-strategies-comparison)
3. [Code Implementation Examples](#code-implementation-examples)
4. [Key Differences](#key-differences)
5. [Reporting Comparison](#reporting-comparison)
6. [Migration Considerations](#migration-considerations)

---

## Framework Setup Comparison

### Installation & Dependencies

#### Playwright
```bash
# Install Playwright
npm install @playwright/test

# Install browsers (automatic)
npx playwright install

# Dependencies in package.json
{
  "dependencies": {
    "@playwright/test": "^1.40.0",
    "@cucumber/cucumber": "^10.0.0",
    "dotenv": "^16.0.0"
  }
}
```

#### Selenium
```bash
# Install Selenium WebDriver
npm install selenium-webdriver

# Install WebDriver Manager (for driver management)
npm install webdriver-manager

# Update drivers
npx webdriver-manager update

# Dependencies in package.json
{
  "dependencies": {
    "selenium-webdriver": "^4.15.0",
    "@cucumber/cucumber": "^10.0.0",
    "chromedriver": "^119.0.0",
    "geckodriver": "^4.3.0",
    "dotenv": "^16.0.0"
  }
}
```

### Browser Driver Management

| Aspect | Playwright | Selenium |
|--------|-----------|----------|
| **Driver Installation** | Automatic (`npx playwright install`) | Manual or via webdriver-manager |
| **Browser Versions** | Bundled with Playwright | Must match browser version |
| **Updates** | Update Playwright package | Update driver separately |
| **Cross-browser** | Built-in (Chromium, Firefox, WebKit) | Requires separate drivers |

---

## Locator Strategies Comparison

### 1. Role-Based Locators

#### Playwright (Native Support)
```javascript
// Built-in role-based locators
await page.getByRole('button', { name: 'Login' });
await page.getByRole('link', { name: 'Home' });
await page.getByRole('textbox', { name: 'Username' });
await page.getByRole('heading', { name: 'Welcome' });
```

**Advantages**:
- ✅ Native API support
- ✅ Accessibility-friendly
- ✅ Resilient to DOM changes
- ✅ Self-documenting code

#### Selenium (No Native Support)
```javascript
// Must use XPath or CSS with ARIA roles
await driver.findElement(By.css('button[role="button"]'));
await driver.findElement(By.xpath('//button[@role="button" and contains(text(), "Login")]'));

// Or use accessibility attributes
await driver.findElement(By.css('[aria-label="Login button"]'));
```

**Disadvantages**:
- ❌ No built-in role-based API
- ❌ Requires manual ARIA attribute checking
- ❌ More verbose syntax

---

### 2. Test ID Locators (data-testid)

#### Playwright
```javascript
// Native test ID support
await page.getByTestId('submit-button');
await page.getByTestId('username-input');

// Configure custom test ID attribute
// In playwright.config.js
use: {
  testIdAttribute: 'data-test-id' // or 'data-qa', etc.
}
```

**HTML**:
```html
<button data-testid="submit-button">Submit</button>
```

#### Selenium
```javascript
// Must use CSS or XPath
await driver.findElement(By.css('[data-testid="submit-button"]'));
await driver.findElement(By.xpath('//*[@data-testid="submit-button"]'));

// No native test ID method
```

**Comparison**:

| Feature | Playwright | Selenium |
|---------|-----------|----------|
| **Native API** | ✅ `getByTestId()` | ❌ Must use CSS/XPath |
| **Configurable Attribute** | ✅ Yes | ❌ No |
| **Readability** | ✅ High | ⚠️ Medium |

---

### 3. XPath Locators

#### Playwright
```javascript
// XPath support
await page.locator('//button[@type="submit"]');
await page.locator('//div[@class="product"][1]');
await page.locator('//a[contains(text(), "Welcome")]');

// Can chain with other methods
await page.locator('//form[@id="loginFrm"]').getByRole('button');
```

#### Selenium
```javascript
// XPath support
await driver.findElement(By.xpath('//button[@type="submit"]'));
await driver.findElement(By.xpath('//div[@class="product"][1]'));
await driver.findElement(By.xpath('//a[contains(text(), "Welcome")]'));

// Cannot chain easily
```

**Both frameworks support XPath equally**, but Playwright allows chaining.

---

### 4. CSS Selectors

#### Playwright
```javascript
await page.locator('#loginFrm_loginname');
await page.locator('.product-card');
await page.locator('[data-testid="submit"]');
await page.locator('button.primary');
```

#### Selenium
```javascript
await driver.findElement(By.css('#loginFrm_loginname'));
await driver.findElement(By.css('.product-card'));
await driver.findElement(By.css('[data-testid="submit"]'));
await driver.findElement(By.css('button.primary'));
```

**Both frameworks support CSS selectors equally.**

---

### 5. Text-Based Locators

#### Playwright
```javascript
// Native text-based locators
await page.getByText('Add to Cart');
await page.getByText(/Add to/i); // Regex support
await page.getByText('login', { exact: false }); // Partial match

// Label-based
await page.getByLabel('Username');
await page.getByLabel(/user/i);

// Placeholder-based
await page.getByPlaceholder('Enter username');
```

**Advantages**:
- ✅ Multiple text-based methods
- ✅ Regex support
- ✅ Exact/partial matching
- ✅ Very readable

#### Selenium
```javascript
// Must use XPath for text-based locators
await driver.findElement(By.xpath('//button[text()="Add to Cart"]'));
await driver.findElement(By.xpath('//button[contains(text(), "Add to")]'));

// Label-based (via XPath)
await driver.findElement(By.xpath('//label[text()="Username"]/following-sibling::input'));

// No native placeholder method
await driver.findElement(By.css('[placeholder="Enter username"]'));
```

**Disadvantages**:
- ❌ No native text-based API
- ❌ Requires XPath knowledge
- ❌ More verbose

---

## Code Implementation Examples

### BasePage Class Comparison

#### Playwright BasePage

```javascript
const { Page } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Auto-waiting built-in
  async click(locator) {
    const element = typeof locator === 'string' 
      ? this.page.locator(locator) 
      : locator;
    await element.click(); // Auto-waits
  }

  async fill(locator, value) {
    const element = typeof locator === 'string' 
      ? this.page.locator(locator) 
      : locator;
    await element.fill(value); // Auto-waits
  }

  async getText(locator) {
    const element = typeof locator === 'string' 
      ? this.page.locator(locator) 
      : locator;
    return await element.textContent(); // Auto-waits
  }

  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Multiple locator strategies
  getByRole(role, options) {
    return this.page.getByRole(role, options);
  }

  getByText(text) {
    return this.page.getByText(text);
  }

  getByTestId(testId) {
    return this.page.getByTestId(testId);
  }
}

module.exports = { BasePage };
```

#### Selenium BasePage

```javascript
const { By, until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.timeout = 10000;
  }

  // Manual waiting required
  async click(locator) {
    const element = await this.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), this.timeout);
    await this.driver.wait(until.elementIsEnabled(element), this.timeout);
    await element.click();
  }

  async fill(locator, value) {
    const element = await this.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), this.timeout);
    await element.clear();
    await element.sendKeys(value);
  }

  async getText(locator) {
    const element = await this.findElement(locator);
    await this.driver.wait(until.elementIsVisible(element), this.timeout);
    return await element.getText();
  }

  async navigateTo(url) {
    await this.driver.get(url);
    await this.driver.wait(
      until.elementLocated(By.css('body')), 
      this.timeout
    );
  }

  // Helper to find element
  async findElement(locator) {
    if (typeof locator === 'string') {
      // Assume CSS selector
      return await this.driver.findElement(By.css(locator));
    }
    return await this.driver.findElement(locator);
  }

  // No native role-based methods
  // Must implement manually
  async getByRole(role, name) {
    return await this.driver.findElement(
      By.xpath(`//*[@role="${role}" and contains(text(), "${name}")]`)
    );
  }

  async getByText(text) {
    return await this.driver.findElement(
      By.xpath(`//*[text()="${text}"]`)
    );
  }

  async getByTestId(testId) {
    return await this.driver.findElement(
      By.css(`[data-testid="${testId}"]`)
    );
  }
}

module.exports = { BasePage };
```

---

## Key Differences

### 1. Auto-Waiting

| Feature | Playwright | Selenium |
|---------|-----------|----------|
| **Auto-wait for visibility** | ✅ Yes | ❌ No (manual) |
| **Auto-wait for enabled** | ✅ Yes | ❌ No (manual) |
| **Auto-wait for stable** | ✅ Yes | ❌ No |
| **Auto-retry** | ✅ Yes | ❌ No |

**Playwright Example**:
```javascript
// Automatically waits for element to be ready
await page.click('button');
```

**Selenium Example**:
```javascript
// Must manually wait
const button = await driver.findElement(By.css('button'));
await driver.wait(until.elementIsVisible(button), 10000);
await driver.wait(until.elementIsEnabled(button), 10000);
await button.click();
```

---

### 2. Locator API

| Locator Type | Playwright | Selenium |
|--------------|-----------|----------|
| **Role-based** | `getByRole('button')` | ❌ Not available |
| **Test ID** | `getByTestId('id')` | ❌ Not available |
| **Text** | `getByText('text')` | ❌ Not available |
| **Label** | `getByLabel('label')` | ❌ Not available |
| **Placeholder** | `getByPlaceholder('text')` | ❌ Not available |
| **CSS** | `locator('.class')` | `By.css('.class')` |
| **XPath** | `locator('//div')` | `By.xpath('//div')` |
| **ID** | `locator('#id')` | `By.id('id')` |

---

### 3. Browser Context & Isolation

#### Playwright
```javascript
// Browser contexts for isolation
const browser = await chromium.launch();
const context1 = await browser.newContext(); // Isolated session
const context2 = await browser.newContext(); // Another isolated session

const page1 = await context1.newPage();
const page2 = await context2.newPage();
```

**Benefits**:
- ✅ Parallel test execution
- ✅ Isolated cookies/storage
- ✅ Different user sessions

#### Selenium
```javascript
// No native context isolation
const driver1 = await new Builder().forBrowser('chrome').build();
const driver2 = await new Builder().forBrowser('chrome').build();

// Each driver is a separate browser instance (heavier)
```

**Limitations**:
- ❌ No lightweight isolation
- ❌ Each instance is a full browser

---

### 4. Network Interception

#### Playwright
```javascript
// Native network interception
await page.route('**/api/products', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ products: [] })
  });
});

// Wait for specific request
await page.waitForRequest('**/api/login');
await page.waitForResponse('**/api/products');
```

#### Selenium
```javascript
// No native network interception
// Must use browser DevTools Protocol (complex)
// Or use third-party tools like BrowserMob Proxy
```

---

### 5. Assertions

#### Playwright
```javascript
const { expect } = require('@playwright/test');

// Web-first assertions (auto-retry)
await expect(page.locator('button')).toBeVisible();
await expect(page.locator('button')).toBeEnabled();
await expect(page).toHaveURL(/dashboard/);
await expect(page.locator('h1')).toHaveText('Welcome');
await expect(page.locator('.item')).toHaveCount(5);
```

#### Selenium
```javascript
const assert = require('assert');

// Manual assertions (no auto-retry)
const button = await driver.findElement(By.css('button'));
const isVisible = await button.isDisplayed();
assert.strictEqual(isVisible, true);

const url = await driver.getCurrentUrl();
assert(url.includes('dashboard'));

const heading = await driver.findElement(By.css('h1'));
const text = await heading.getText();
assert.strictEqual(text, 'Welcome');
```

---

## Reporting Comparison

### Playwright Reporting

| Reporter | Built-in | Features |
|----------|----------|----------|
| **HTML** | ✅ Yes | Interactive, screenshots, videos, traces |
| **JSON** | ✅ Yes | Machine-readable results |
| **Allure** | ⚠️ Plugin | Rich visualizations, trends |
| **Cucumber** | ⚠️ Plugin | BDD reports |

**Configuration**:
```javascript
// playwright.config.js
reporter: [
  ['html'],
  ['json', { outputFile: 'results.json' }],
  ['allure-playwright'],
],
```

**Features**:
- ✅ Screenshots on failure (automatic)
- ✅ Video recording (automatic)
- ✅ Trace viewer (time-travel debugging)
- ✅ Network logs
- ✅ Console logs

---

### Selenium Reporting

| Reporter | Built-in | Features |
|----------|----------|----------|
| **HTML** | ❌ No | Requires third-party (mochawesome, etc.) |
| **JSON** | ⚠️ Via test framework | Mocha/Jest reporters |
| **Allure** | ⚠️ Plugin | Rich visualizations |
| **Cucumber** | ⚠️ Plugin | BDD reports |

**Configuration** (with Mocha):
```javascript
// .mocharc.json
{
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "test-results",
    "reportFilename": "report",
    "html": true,
    "json": true
  }
}
```

**Features**:
- ⚠️ Screenshots (manual implementation)
- ❌ No video recording (requires third-party)
- ❌ No trace viewer
- ⚠️ Network logs (via DevTools Protocol)
- ⚠️ Console logs (manual capture)

---

## Migration Considerations

### From Selenium to Playwright

#### Advantages
1. **Auto-waiting**: Eliminates most explicit waits
2. **Better locators**: Role-based, text-based, test ID support
3. **Built-in assertions**: Web-first assertions with auto-retry
4. **Better reporting**: Screenshots, videos, traces out-of-the-box
5. **Faster execution**: Browser contexts vs full browser instances
6. **Network interception**: Native API support
7. **Modern API**: Cleaner, more intuitive syntax

#### Challenges
1. **Learning curve**: New API to learn
2. **Migration effort**: Rewrite existing tests
3. **Locator changes**: Update from `By.css()` to `page.locator()`
4. **Different patterns**: Page object implementation differs

---

### Migration Example

#### Selenium Code
```javascript
const element = await driver.findElement(By.css('#submit'));
await driver.wait(until.elementIsVisible(element), 10000);
await driver.wait(until.elementIsEnabled(element), 10000);
await element.click();

const text = await element.getText();
assert.strictEqual(text, 'Submit');
```

#### Playwright Equivalent
```javascript
const element = page.locator('#submit');
await element.click(); // Auto-waits

await expect(element).toHaveText('Submit'); // Auto-retry assertion
```

**Lines of code**: 6 → 2 (67% reduction)

---

## Summary Table

| Aspect | Playwright | Selenium |
|--------|-----------|----------|
| **Auto-waiting** | ✅ Built-in | ❌ Manual |
| **Role-based locators** | ✅ Native | ❌ Not available |
| **Test ID support** | ✅ Native | ❌ CSS/XPath only |
| **Text-based locators** | ✅ Multiple methods | ❌ XPath only |
| **Browser contexts** | ✅ Lightweight | ❌ Full instances |
| **Network interception** | ✅ Native | ❌ Complex |
| **Assertions** | ✅ Web-first | ⚠️ Manual |
| **Reporting** | ✅ Rich built-in | ⚠️ Third-party |
| **Screenshots** | ✅ Automatic | ⚠️ Manual |
| **Videos** | ✅ Automatic | ❌ Not available |
| **Trace viewer** | ✅ Yes | ❌ No |
| **Learning curve** | ⚠️ Moderate | ✅ Established |
| **Community** | ⚠️ Growing | ✅ Large |
| **Browser support** | ✅ Chromium, Firefox, WebKit | ✅ All major browsers |

---

## Recommendation

**Choose Playwright if**:
- ✅ Starting a new project
- ✅ Need modern locator strategies
- ✅ Want auto-waiting and auto-retry
- ✅ Need rich reporting out-of-the-box
- ✅ Want faster test execution
- ✅ Need network interception

**Choose Selenium if**:
- ✅ Large existing test suite
- ✅ Team expertise in Selenium
- ✅ Need support for older browsers
- ✅ Integration with existing tools
- ✅ Migration cost is prohibitive

**For this project**: Playwright is the better choice due to modern API, better locators, and superior developer experience.
