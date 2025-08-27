import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Scenario 1: Complete E-commerce Flow', () => {
  test('Login → Home → Select Dove Brand → Add Newest Item to Cart → Verify Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const username = process.env.USERNAME || 'sharjeel';
    const password = process.env.PASSWORD || 'ahmad12';

    try {
      console.log('\n🚀 Starting Scenario 1: Complete E-commerce Flow');
      console.log(`🌐 Base URL: ${process.env.BASE_URL || 'https://automationteststore.com/'}`);
      console.log(`👤 Username: ${username}`);
      
      console.log('\n=== Step 1: Logging in to the website ===');
      await loginPage.navigateToLogin();
      await loginPage.login(username, password);
      console.log('✓ Login completed successfully');

      console.log('\n=== Step 2: Navigating to Home page ===');
      await homePage.clickHomeNav();
      console.log('✓ Home page navigation completed');

      console.log('\n=== Step 3: Selecting Dove brand from the brands carousel ===');
      await homePage.clickDoveBrandFromCarousel();
      console.log('✓ Dove brand selection completed');

      console.log('\n=== Step 4: Adding newest item to cart from product list ===');
      await productPage.addNewestItemToCart();
      console.log('✓ Add to cart completed and navigated to cart page');

      console.log('\n=== Step 5: Verifying item in cart ===');
      await cartPage.assertItemInCart(1);
      console.log('✓ Cart verification completed successfully');

      console.log('\n🎉 SCENARIO 1 COMPLETED SUCCESSFULLY! 🎉');
      console.log('All steps completed: Login → Home → Dove Brand → Add Newest Item to Cart from List → Verify Cart');
      console.log('✅ Item name verified');
      console.log('✅ Quantity verified');
      console.log('✅ Price/Amount verified');

    } catch (error) {
      console.error('\n❌ SCENARIO 1 FAILED ❌');
      console.error('Error details:', error);
      throw error;
    }
  });
});

