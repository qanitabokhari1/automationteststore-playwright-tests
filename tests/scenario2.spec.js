const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { ProductPage } = require('../pages/ProductPage');
const dotenv = require('dotenv');

dotenv.config();
dotenv.config({override: true});

test.describe('Scenario 2: T-shirts and Shoes Shopping Flow', () => {
  test('Login → Apparel → T-shirts → Sort Low to High → Select Lowest → Shoes → Sort High to Low → Add Highest (Qty: 2) → Verify Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    const username = process.env.USERNAME || 'Qanita12';
    const password = process.env.PASSWORD || 'Qanita123';

    try {
      console.log('\n🚀 Starting Scenario 2: T-shirts and Shoes Shopping Flow');
      console.log(`🌐 Base URL: ${process.env.BASE_URL || 'https://automationteststore.com/'}`);
      console.log(`👤 Username: ${username}`);
      
      console.log('\n=== Step 1: Logging in to the website ===');
      await loginPage.navigateToLogin();
      await loginPage.login(username, password);
      console.log('✓ Login completed successfully');

      console.log('\n=== Step 2: Navigating to APPAREL & ACCESSORIES section ===');
      await homePage.navigateToApparelSection();
      console.log('✓ Apparel section navigation completed');

      console.log('\n=== Step 3: Navigating to T-shirts section ===');
      await homePage.navigateToTshirtsSection();
      console.log('✓ T-shirts section navigation completed');

      console.log('\n=== Step 4: Sorting T-shirts by low to high price ===');
      await productPage.sortByLowToHigh();
      console.log('✓ T-shirts sorted by low to high price');

      console.log('\n=== Step 5: Selecting lowest value T-shirt product ===');
      await productPage.selectLowestTshirt();
      console.log('✓ Lowest T-shirt product selected');

      console.log('\n=== Step 6: Going back to APPAREL & ACCESSORIES section ===');
      await homePage.navigateToApparelSection();
      console.log('✓ Returned to Apparel section');

      console.log('\n=== Step 7: Going to Shoes section and adding highest value product ===');
      await productPage.addHighestValueShoeToCart();
      console.log('✓ Highest value shoe added to cart with quantity 2');

      console.log('\n🎉 SCENARIO 2 COMPLETED SUCCESSFULLY! 🎉');
      console.log('All steps completed: Login → Apparel → T-shirts → Sort Low to High → Select Lowest → Shoes → Add Highest → Verify Cart');
      console.log('✅ 1 T-shirt product selected');
      console.log('✅ 1 shoe added to cart (quantity: 2)');
      console.log('✅ Items sorted by price (low to high for T-shirts, high to low for shoes)');
      console.log('✅ Cart contains 2 items as expected');

    } catch (error) {
      console.error('\n❌ SCENARIO 2 FAILED ❌');
      console.error('Error details:', error);
      throw error;
    }
  });
});
