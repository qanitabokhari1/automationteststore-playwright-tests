import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

let totalProducts = 0;
let saleItemsCount = 0;
let outOfStockCount = 0;
let saleItemsAdded = 0;

When('I navigate to the skincare section', async function() {
  const page = this.page;
  
  console.log('\n=== Step 2: Navigating to skincare section ===');
  
  const skincareLink = page.locator('//*[@id="categorymenu"]/nav/ul/li[4]');
  await expect(skincareLink).toBeVisible({ timeout: 10000 });
  await skincareLink.click();
  console.log('✓ Clicked on skincare section');
  
  await page.waitForLoadState('networkidle', { timeout: 15000 });
  await page.waitForTimeout(2000);
  console.log('✓ Skincare page loaded successfully');
});

When('I count sale and out of stock items', async function() {
  const page = this.page;
  
  console.log('\n=== Step 3: Counting sale and out of stock items ===');
  
  await page.waitForTimeout(2000);
  
  const productContainers = page.locator('//*[@id="maincontainer"]/div/div/div/div/div[3]/div');
  totalProducts = await productContainers.count() - 1;
  console.log(`Total products found: ${totalProducts}`);
  
  saleItemsCount = 0;
  outOfStockCount = 0;
  
  for (let i = 0; i < totalProducts; i++) {
    try {
      const saleIndicator = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/span`);
      const isOnSale = await saleIndicator.isVisible();
      
      if (isOnSale) {
        saleItemsCount++;
        console.log(`Product ${i + 1} is on sale`);
        
        const outOfStockIndicator = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/div[3]/span`);
        const isOutOfStock = await outOfStockIndicator.isVisible();
        
        if (isOutOfStock) {
          outOfStockCount++;
          console.log(`Product ${i + 1} is on sale but out of stock`);
        }
      }
    } catch (error) {
      console.log(`Error processing product ${i + 1}: ${error}`);
    }
  }
  
  console.log(`\n📊 SKINCARE SECTION SUMMARY:`);
  console.log(`Total products: ${totalProducts}`);
  console.log(`Items on sale: ${saleItemsCount}`);
  console.log(`Items on sale but out of stock: ${outOfStockCount}`);
});

When('I add available sale items to the cart', async function() {
  const page = this.page;
  
  console.log('\n=== Step 4: Adding available sale items to cart ===');
  
  saleItemsAdded = 0;
  
  for (let i = 0; i < totalProducts; i++) {
    try {
      const saleIndicator = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/span`);
      const isOnSale = await saleIndicator.isVisible();
      
      if (isOnSale) {
        const outOfStockIndicator = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/div[3]/span`);
        const isOutOfStock = await outOfStockIndicator.isVisible();
        
        if (!isOutOfStock) {
          try {
            const addToCartButton = page.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/div[3]/a`);
            if (await addToCartButton.isVisible()) {
              await addToCartButton.click();
              console.log(`✓ Added product ${i + 1} to cart`);
              saleItemsAdded++;
              
              await page.waitForTimeout(1000);
            }
          } catch (addToCartError) {
            console.log(`Could not add product ${i + 1} to cart: ${addToCartError}`);
          }
        }
      }
    } catch (error) {
      console.log(`Error processing product ${i + 1}: ${error}`);
    }
  }
  
  console.log(`Sale items added to cart: ${saleItemsAdded}`);
});

Then('I should see the cart contains the added sale items', async function() {
  const page = this.page;
  const cartPage = (this as any).cartPage;
  
  console.log('\n=== Step 5: Verifying cart contents ===');
  
  await page.goto(`${process.env.BASE_URL || 'https://automationteststore.com/'}index.php?rt=checkout/cart`);
  await page.waitForLoadState('networkidle', { timeout: 15000 });
  console.log('✓ Navigated to cart page');

  await cartPage.assertItemInCart(saleItemsAdded);
  console.log('✓ Cart verification completed successfully');

  console.log('\n🎉 SCENARIO 3 COMPLETED SUCCESSFULLY! 🎉');
  console.log('All steps completed: Login → Skincare Section → Count Sale/Out of Stock → Add Sale Items → Verify Cart');
  console.log(`✅ Total products counted: ${totalProducts}`);
  console.log(`✅ Sale items counted: ${saleItemsCount}`);
  console.log(`✅ Out of stock items counted: ${outOfStockCount}`);
  console.log(`✅ Sale items added to cart: ${saleItemsAdded}`);
  console.log(`✅ Cart verification passed: ${saleItemsAdded} items in cart`);
});
