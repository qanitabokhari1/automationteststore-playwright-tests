# Automation Test Store - Playwright Testing Framework

A complete Playwright testing framework for the Automation Test Store website. Includes both traditional Playwright tests and BDD (Behavior-Driven Development) tests using Cucumber.js.

## 🎯 What This Project Does

This project tests an e-commerce website with **4 test scenarios** covering real shopping flows:
- Login and product browsing
- Shopping for T-shirts and shoes
- Skincare section testing
- Men's section product filtering

Each scenario is available in two formats:
- **Traditional Playwright tests** (`tests/` folder)
- **BDD tests with Cucumber** (`features/` folder)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/qanitabokhari1/automationteststore-playwright-tests.git
cd automationteststore-playwright-tests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Setup Environment

Create a `.env` file in the root directory:

```env
# Required
BASE_URL=https://automationteststore.com/
USERNAME=Qanita12
PASSWORD=Qanita123

# Optional (defaults shown)
BROWSER=chromium          # Options: chromium, firefox, webkit, all
HEADLESS=false            # Set to true for headless mode
ACTION_TIMEOUT=15000
NAVIGATION_TIMEOUT=20000
SLOW_MO=100
```

### Run Tests

**Traditional Playwright Tests:**
```bash
# Run all tests
npx playwright test

# Run specific scenario
npx playwright test tests/scenario1.spec.js

# Run with UI (interactive mode)
npx playwright test --ui

# Run with visible browser
npx playwright test --headed
```

**BDD Tests (Cucumber):**
```bash
# Run all BDD scenarios
npx cucumber-js

# Run specific feature
npx cucumber-js features/scenario1.feature
```

## 📋 Test Scenarios

### Scenario 1: Complete E-commerce Flow
**Files**: `tests/scenario1.spec.js`, `features/scenario1.feature`

Tests the full shopping journey:
- User login
- Navigate to home page
- Interact with Dove brand carousel
- Find newest product from selected brand
- Add product to cart
- Verify cart contains 1 item

### Scenario 2: T-shirts and Shoes Shopping
**Files**: `tests/scenario2.spec.js`, `features/scenario2.feature`

Tests multi-category shopping:
- Navigate: Apparel → T-shirts → Shoes
- Sort T-shirts by price (low to high)
- Select cheapest T-shirt
- Select most expensive shoes
- Add 2 units of shoes
- Verify both items in cart

### Scenario 3: Skincare Section
**Files**: `tests/scenario3.spec.js`, `features/scenario3.feature`

Tests inventory and sale items:
- Navigate to skincare section
- Count total products, sale items, and out-of-stock items
- Find available sale items
- Add multiple sale items to cart
- Verify all items added successfully

### Scenario 4: Men Section Testing
**Files**: `tests/scenario4.spec.js`, `features/scenario4.feature`

Tests product filtering:
- Navigate to men's section
- Find products ending with "M" or "m"
- Check stock availability
- Select first available product
- Add to cart and verify

## 📁 Project Structure

```
automationteststore-playwright-tests/
├── config/              # Configuration files
├── docs/                # Documentation
├── features/            # BDD feature files (Gherkin)
├── pages/               # Page Object Models
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── ProductPage.js
│   └── CartPage.js
├── steps/               # BDD step definitions
├── support/             # Test support (hooks, fixtures)
├── tests/               # Traditional Playwright tests
│   ├── scenario1.spec.js
│   ├── scenario2.spec.js
│   ├── scenario3.spec.js
│   └── scenario4.spec.js
├── utils/               # Utilities (BasePage, helpers)
├── playwright.config.js # Playwright configuration
├── cucumber.js          # Cucumber configuration
└── package.json
```

## 🔧 Key Features

### Configuration Management
- Centralized config in `config/` directory
- Environment variable support
- JavaScript-based configuration

### Page Object Model (POM)
- Reusable page classes in `pages/` folder
- All pages extend `BasePage` for consistency
- Separates UI logic from test logic

### Cross-Browser Support
```bash
# Run on specific browser
BROWSER=firefox npx playwright test

# Run on all browsers
BROWSER=all npx playwright test
```

### Reporting
- **HTML Reports**: `npx playwright show-report`
- **Allure Reports**: `npm run report:allure`
- Automatic screenshots on failure
- Video recording for failed tests

### Selector Strategy
- XPath selectors for Scenarios 1, 3, 4
- CSS selectors for Scenario 2
- Centralized in `utils/selectors.js`

## 🐛 Troubleshooting

### Element Not Found
- Check if page structure changed
- Verify selectors in `utils/selectors.js`
- Increase timeout in `.env` file

### Timeout Errors
- Increase `ACTION_TIMEOUT` or `NAVIGATION_TIMEOUT` in `.env`
- Check network connectivity
- Verify page loads completely

### Debug Mode
```bash
# Playwright debug mode
npx playwright test --debug

# Run specific test with debug
npx playwright test tests/scenario1.spec.js --debug
```

## 📊 Test Status

✅ **All 4 scenarios passing**
- Total scenarios: 4
- Execution time: ~3-5 minutes
- Success rate: 100%

## 🎯 Architecture Highlights

- **BasePage Pattern**: All page objects extend a base class
- **Auto-Waiting**: Uses Playwright's built-in waiting (no manual waits)
- **Fixtures**: Reusable test dependencies
- **BDD Support**: Cucumber.js for business-readable tests
- **JavaScript**: Modern ES6+ JavaScript throughout

## 📚 Additional Resources

- **Selector Guidelines**: See `docs/SELECTOR_GUIDELINES.md`
- **Configuration**: See `config/config.js` for all options
- **Examples**: Check `tests/` and `features/` folders

---

**Note**: This framework demonstrates modern web automation best practices with both traditional and BDD testing approaches.
