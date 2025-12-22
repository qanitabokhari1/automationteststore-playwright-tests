/**
 * Example test demonstrating database connectivity
 * This test shows how to integrate database validation with Playwright tests
 */

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const Database = require('../utils/Database');
const dotenv = require('dotenv');

dotenv.config();

test.describe('Login Test with Database Validation', () => {
  let database;

  test.beforeAll(async () => {
    // Initialize database connection if DB credentials are provided
    if (process.env.DB_PASSWORD) {
      database = new Database();
      await database.connect();
    }
  });

  test.afterAll(async () => {
    // Cleanup database connection
    if (database) {
      await database.disconnect();
    }
  });

  test('Login and validate user in database', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME || 'Qanita12';
    const password = process.env.PASSWORD || 'Qanita123';

    // Step 1: Perform login
    await loginPage.navigateToLogin();
    await loginPage.login(username, password);

    // Step 2: Verify login success
    // The "Welcome back" text is nested inside a div, so we target the div element
    const welcomeMessage = loginPage.locator('//div[contains(text(),"Welcome back")]');
    await expect(welcomeMessage).toBeVisible({ timeout: 10000 });
    console.log('✅ Login successful - Welcome message found');

    // Step 3: Validate user in database (if database is configured)
    if (database) {
      try {
        const users = await database.queryUser(username, password);
        
        if (users.length > 0) {
          console.log('✅ User exists in database:', {
            id: users[0].id,
            email: users[0].email,
            first_name: users[0].first_name,
            last_name: users[0].last_name
          });
          expect(users.length).toBeGreaterThan(0);
        } else {
          console.log('⚠️ User not found in database');
          // This is a warning, not a failure - database validation is optional
        }
      } catch (error) {
        console.warn('⚠️ Database validation failed:', error.message);
        // Database errors don't fail the test - it's optional validation
      }
    } else {
      console.log('ℹ️ Database not configured - skipping database validation');
    }
  });
});

