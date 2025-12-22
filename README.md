

# Automation Test Store - Playwright Testing Framework

---

### Key Functions/Patterns Referenced
- `page.locator(selector)`, `getByRole`, and indexed XPath for element selection
- `expect(locator).toBeVisible()`, `expect(page).toHaveURL()`, etc. for assertions
- `waitForSelector`, `waitForLoadState`, and Playwright's auto-waiting for synchronization
- Page Object Model for encapsulating UI logic
- Step definitions for mapping Gherkin steps to code

For a full breakdown, see [`docs/project_structure_explained.md`](docs/project_structure_explained.md).

---

---

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

# Database Configuration (Optional - for database connectivity)
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=PalywrightTestDb
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### Database Setup

If you want to use database connectivity features:

1. **Install PostgreSQL** (if not already installed)

2. **Create the database and table:**
   ```bash
   # Option 1: Using psql command line
   psql -U postgres -f schema.sql
   
   # Option 2: Manual setup
   psql -U postgres
   CREATE DATABASE "SeleniumTestDb";
   \c SeleniumTestDb
   # Then run the CREATE TABLE statements from schema.sql
   ```

3. **Update `.env` file** with your database credentials (see above)

4. **The database utility is available** in `utils/Database.js` for use in your tests

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


## 📁 Project Structure & Implementation Overview

This section explores the codebase, explains the purpose of each folder and key files, and summarizes the main patterns and techniques implemented in this project.

### Root Directory
- **package.json**: Manages dependencies, scripts, and project metadata.
- **cucumber.js**: Cucumber configuration (feature file locations, step definitions, output formats).
- **playwright.config.js**: Playwright configuration (browser settings, test directories, timeouts, reporting).
- **README.md**: Project documentation, setup, and usage instructions.
- **.gitignore**: Files/folders to exclude from version control.

### Folders
- **allure-results/**: Allure test result files for generating detailed test reports.
- **playwright-report/**: Playwright's HTML test reports for visualizing test runs.
- **test-results/**: Stores test output, logs, or artifacts.
- **node_modules/**: Auto-generated by npm, contains all installed dependencies.
- **config/**: Reserved for custom configuration files (e.g., environment variables, test data).
- **docs/**: Documentation files, e.g., SELECTOR_GUIDELINES.md, project structure explanations.
- **features/**: Cucumber feature files (Gherkin syntax). Each file describes test scenarios in plain English.
- **pages/**: Page Object Model (POM) files. Each file represents a web page, encapsulating selectors and actions (e.g., LoginPage.js, HomePage.js, ProductPage.js, CartPage.js).
- **steps/**: Step definition files. Map Gherkin steps from feature files to executable code.
- **support/**: Support files like hooks and fixtures for test lifecycle and context management.
- **tests/**: Traditional Playwright test specification files.
- **utils/**: Utility/helper files, e.g., BasePage.js, Database.js, ElementHelper.js.
- **schema.sql**: PostgreSQL database schema for user data storage.

### Locator Strategies (Selectors)
- **XPath Selectors**: Used for precise element identification, especially when elements lack unique IDs or classes.
- **CSS Selectors**: Used when elements have unique classes or IDs.
- **Role-based Selectors**: Playwright's getByRole for accessibility and robustness.
- **Dynamic/Indexed Selectors**: For lists or repeated elements, index-based XPath is used.

### Assertions
- Playwright's `expect` is used for robust, readable checks (e.g., `expect(locator).toBeVisible()`, `expect(page).toHaveURL()`, `expect(cartItems).toHaveCount(expectedCount)`).
- Assertions are used in page objects, step definitions, and after critical user actions.

### Waits and Synchronization
- **Auto-waiting**: Playwright automatically waits for elements to be actionable.
- **Explicit Waits**: `waitForSelector`, `locator.waitFor({ state: 'visible' })`, `waitForLoadState('networkidle')`, and `waitForTimeout(ms)` for animation completion.
- Waits are implemented after navigation, before/after clicking elements, and after actions that trigger UI changes.

### Patterns & Best Practices
- **Page Object Model (POM)**: Encapsulates UI logic and selectors in page classes for reusability and maintainability.
- **BDD with Cucumber**: Feature files describe scenarios in plain English, step definitions map them to code.
- **Centralized Selectors**: Use of constants and utility files for selectors.
- **Separation of Concerns**: Keeps feature files, step definitions, page objects, and utilities organized.
- **Scalability & Maintainability**: New features, pages, and tests can be added with minimal changes to existing code.

For a full breakdown and code examples, see [`docs/project_structure_explained.md`](docs/project_structure_explained.md).

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

### Database Connectivity
- **PostgreSQL Integration**: Connect to PostgreSQL database for test data validation
- **Database Utility**: `utils/Database.js` provides methods for database operations
- **User Validation**: Query and validate user credentials against database
- **Flexible Queries**: Support for custom SQL queries and user management
- **Usage Example**:
  ```javascript
  const Database = require('./utils/Database');
  const db = new Database();
  await db.connect();
  const users = await db.queryUser(username, password);
  await db.disconnect();
  ```

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

### Database Connection Issues
- Ensure PostgreSQL is running: `sudo service postgresql start` (Linux) or check service status
- Verify database credentials in `.env` file
- Ensure database exists: `psql -U postgres -l` to list databases
- Check if table exists: Connect to database and run `\d users`
- Verify schema.sql has been executed

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
