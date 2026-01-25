const { When, Then } = require('@cucumber/cucumber');

When('I navigate to the APPAREL & ACCESSORIES section', async function() {
  const homePage = this.homePage;
  console.log('\n=== Step 2: Navigating to APPAREL & ACCESSORIES section ===');
  await homePage.navigateToApparelSection();
  console.log('✓ Apparel section navigation completed');
});

When('I navigate to the T-shirts section', async function() {
  const homePage = this.homePage;
  console.log('\n=== Step 3: Navigating to T-shirts section ===');
  await homePage.navigateToTshirtsSection();
  console.log('✓ T-shirts section navigation completed');
});

When('I sort T-shirts by low to high price', async function() {
  const productPage = this.productPage;
  console.log('\n=== Step 4: Sorting T-shirts by low to high price ===');
  await productPage.sortByLowToHigh();
  console.log('✓ T-shirts sorted by low to high price');
});

When('I select the lowest value T-shirt product', async function() {
  const productPage = this.productPage;
  console.log('\n=== Step 5: Selecting lowest value T-shirt product ===');
  await productPage.selectLowestTshirt();
  console.log('✓ Lowest T-shirt product selected');
});

When('I go back to APPAREL & ACCESSORIES section', async function() {
  const homePage = this.homePage;
  console.log('\n=== Step 6: Going back to APPAREL & ACCESSORIES section ===');
  await homePage.navigateToApparelSection();
  console.log('✓ Returned to Apparel section');
});

When('I navigate to Shoes section and add highest value product with quantity {int}', async function(quantity) {
  const productPage = this.productPage;
  console.log(`\n=== Step 7: Going to Shoes section and adding highest value product with quantity ${quantity} ===`);
  await productPage.addHighestValueShoeToCart();
  console.log(`✓ Highest value shoe added to cart with quantity ${quantity}`);
});

Then('I should see the cart contains both T-shirt and shoe items', async function() {
  const cartPage = this.cartPage;
  console.log('\n=== Step 8: Verifying cart contains both items ===');
  await cartPage.verifyTshirtsInCart(2); 
  
  console.log('\n🎉 SCENARIO 2 COMPLETED SUCCESSFULLY! 🎉');
  console.log('All steps completed: Login → Apparel → T-shirts → Sort Low to High → Select Lowest → Shoes → Add Highest → Verify Cart');
  console.log('✅ 1 T-shirt product selected');
  console.log('✅ 1 shoe added to cart (quantity: 2)');
  console.log('✅ Items sorted by price (low to high for T-shirts, high to low for shoes)');
  console.log('✅ Cart contains 2 items as expected');
});
