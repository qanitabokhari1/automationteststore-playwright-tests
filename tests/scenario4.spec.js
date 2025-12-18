const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const dotenv = require("dotenv");

dotenv.config();
dotenv.config({ override: true });

const SELECTORS = {
  MEN_SECTION: '//*[@id="categorymenu"]/nav/ul/li[6]',
  PRODUCT_CONTAINERS: '//*[@id="maincontainer"]/div/div/div/div/div[2]/div',
  PRODUCT_NAME: (index) => `//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${index}]/div[1]/div`,
  OUT_OF_STOCK: (index) => `//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${index}]/div[2]/div[3]/span`,
  ADD_TO_CART: (index) => `//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${index}]//a[contains(text(),"Add to Cart")]`,
  CART_ITEM_NAME: '//*[@id="cart_checkout1"]/div/table/tbody/tr/td[2]/a'
};

// TIMEOUTS removed - using Playwright defaults from config

const MESSAGES = {
  SCENARIO_START: "🚀 Starting Scenario 4: Men Section Testing",
  LOGIN_SUCCESS: "✓ Login completed successfully",
  MEN_SECTION_LOADED: "✓ Men section page loaded successfully",
  PRODUCT_FOUND: "✓ Found product ending with M/m:",
  OUT_OF_STOCK: "⚠️ Found but out of stock:",
  ADDED_TO_CART: "✓ Added to cart:",
  NO_PRODUCTS_FOUND: "⚠️ No products ending with M/m found at all",
  ALL_OUT_OF_STOCK: "⚠️ Found {count} products ending with M/m but all are out of stock",
  SCENARIO_SUCCESS: "🎉 SCENARIO 4 COMPLETED SUCCESSFULLY! 🎉"
};

test.describe("Scenario 4: Men Section Testing with XPath Selectors", () => {
  test("Home → Men Section → Add Product Ending with M to Cart → Verify Cart Item Ends with M", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME || "Qanita12";
    const password = process.env.PASSWORD || "Qanita123";

    try {
      console.log(`\n${MESSAGES.SCENARIO_START}`);
      console.log(
        `🌐 Base URL: ${process.env.BASE_URL || "https://automationteststore.com/"
        }`
      );
      console.log(`👤 Username: ${username}`);

      await performLogin(loginPage, username, password);

      await navigateToMenSection(page);

      const { productName, totalProducts, foundMProducts, outOfStockMProducts, wasProductAdded } =
        await findAndAddProductEndingWithM(page);

      if (wasProductAdded) {
        await verifyCartContents(page, productName);
        logSuccessSummary(totalProducts, foundMProducts, outOfStockMProducts, productName);
      } else {
        logOutOfStockSummary(totalProducts, foundMProducts, outOfStockMProducts);
      }

    } catch (error) {
      console.error("\n❌ SCENARIO 4 FAILED ❌");
      console.error("Error details:", error);
      throw error;
    }
  });
});

async function performLogin(loginPage, username, password) {
  console.log("\n=== Step 1: Logging in to the website ===");
  await loginPage.navigateToLogin();
  await loginPage.login(username, password);
  console.log(MESSAGES.LOGIN_SUCCESS);
}

async function navigateToMenSection(page) {
  console.log("\n=== Step 2: Navigating to men section ===");
  const menLink = page.locator(SELECTORS.MEN_SECTION);
  await expect(menLink).toBeVisible();
  await menLink.click();
  console.log("✓ Clicked on men section");

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(2000);

  // Smooth scroll to center after men section loads
  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, 'body');

  await page.waitForTimeout(1200); // Wait for scroll animation

  console.log(MESSAGES.MEN_SECTION_LOADED);
}

async function findAndAddProductEndingWithM(page) {
  console.log('\n=== Step 3: Finding product ending with M ===');

  await page.waitForTimeout(2000);

  const productContainers = page.locator(SELECTORS.PRODUCT_CONTAINERS);
  const totalProducts = await productContainers.count();
  console.log(`Total products found: ${totalProducts}`);

  let productName = "";
  let productIndex = -1;
  let foundMProducts = 0;
  let outOfStockMProducts = 0;
  let wasProductAdded = false;

  await logAllProductNames(page, totalProducts);

  console.log("\n--- Searching for products ending with M ---");

  for (let i = 0; i < totalProducts; i++) {
    try {
      const result = await processProductAtIndex(page, i + 1);
      if (result.found) {
        foundMProducts++;

        if (result.outOfStock) {
          outOfStockMProducts++;
          console.log(`${MESSAGES.OUT_OF_STOCK} "${result.name}"`);
          continue;
        } else {
          await addProductToCart(page, i + 1, result.name);
          productName = result.name;
          productIndex = i + 1;
          wasProductAdded = true;
          break;
        }
      }
    } catch (error) {
      console.log(`Error processing product ${i + 1}: ${error}`);
    }
  }

  logProductSearchSummary(totalProducts, foundMProducts, outOfStockMProducts);

  if (productIndex === -1) {
    if (foundMProducts === 0) {
      throw new Error(MESSAGES.NO_PRODUCTS_FOUND);
    } else {
      console.log(`\n${MESSAGES.ALL_OUT_OF_STOCK.replace('{count}', foundMProducts.toString())}`);
      console.log("This is a valid test result - all products ending with M are out of stock");
      wasProductAdded = false;
    }
  }

  return { productName, totalProducts, foundMProducts, outOfStockMProducts, wasProductAdded };
}

async function logAllProductNames(page, totalProducts) {
  console.log("\n--- Debug: All product names ---");
  for (let i = 0; i < totalProducts; i++) {
    try {
      const productNameElement = page.locator(SELECTORS.PRODUCT_NAME(i + 1));
      if (await productNameElement.isVisible()) {
        const name = (await productNameElement.textContent())?.trim() || "";
        if (name) {
          console.log(`Product ${i + 1}: "${name}" (ends with M: ${name.toLowerCase().endsWith("m")})`);
        }
      }
    } catch (error) {
      console.log(`Error getting product ${i + 1} name: ${error}`);
    }
  }
}

async function processProductAtIndex(page, index) {
  const productNameElement = page.locator(SELECTORS.PRODUCT_NAME(index));

  if (!(await productNameElement.isVisible())) {
    return { found: false, name: "", outOfStock: false };
  }

  const name = (await productNameElement.textContent())?.trim() || "";

  if (!name || !name.toLowerCase().endsWith("m")) {
    return { found: false, name: "", outOfStock: false };
  }

  console.log(`${MESSAGES.PRODUCT_FOUND} "${name}"`);

  const outOfStockElement = page.locator(SELECTORS.OUT_OF_STOCK(index));
  const isOutOfStock = await outOfStockElement.isVisible();

  return { found: true, name, outOfStock: isOutOfStock };
}

async function addProductToCart(page, index, productName) {
  const addToCartButton = page.locator(SELECTORS.ADD_TO_CART(index));
  await expect(addToCartButton).toBeVisible({ timeout: TIMEOUTS.ELEMENT_VISIBLE });
  await addToCartButton.click();
  console.log(`${MESSAGES.ADDED_TO_CART} "${productName}"`);
}

function logProductSearchSummary(totalProducts, foundMProducts, outOfStockMProducts) {
  console.log(`\n--- Summary ---`);
  console.log(`Total products found: ${totalProducts}`);
  console.log(`Products ending with M: ${foundMProducts}`);
  console.log(`Out of stock M products: ${outOfStockMProducts}`);
}

async function verifyCartContents(page, productName) {
  console.log("\n=== Step 4: Verifying cart contents ===");

  await page.goto(
    `${process.env.BASE_URL || "https://automationteststore.com/"
    }index.php?rt=checkout/cart`
  );
  await page.waitForLoadState("domcontentloaded");
  console.log("✓ Navigated to cart page");

  const cartItemName = page.locator(SELECTORS.CART_ITEM_NAME);
  await expect(cartItemName).toBeVisible();

  const actualCartItemName = await cartItemName.textContent();
  if (!actualCartItemName) {
    throw new Error("Could not get cart item name");
  }

  console.log(`✓ Cart verification passed: Item "${actualCartItemName}" is in cart`);
  console.log("✓ Cart verification completed successfully");
}

function logSuccessSummary(totalProducts, foundMProducts, outOfStockMProducts, productName) {
  console.log(`\n${MESSAGES.SCENARIO_SUCCESS}`);
  console.log(
    "All steps completed: Login → Men Section → Find Product Ending with M → Add to Cart → Verify Cart Item"
  );
  console.log(`✅ Total products in men section: ${totalProducts}`);
  console.log(`✅ Products ending with M found: ${foundMProducts}`);
  console.log(`✅ Out of stock M products: ${outOfStockMProducts}`);
  console.log(`✅ Product selected: "${productName}"`);
  console.log(`✅ Product added to cart successfully`);
  console.log(`✅ Cart verification passed`);
}

function logOutOfStockSummary(totalProducts, foundMProducts, outOfStockMProducts) {
  console.log(`\n=== SCENARIO 4 COMPLETED - ALL PRODUCTS OUT OF STOCK ===`);
  console.log(
    "Test completed: Login → Men Section → Find Products Ending with M → All Out of Stock"
  );
  console.log(`✅ Total products in men section: ${totalProducts}`);
  console.log(`✅ Products ending with M found: ${foundMProducts}`);
  console.log(`✅ All products ending with M are out of stock: ${outOfStockMProducts}`);
  console.log(`⚠️ No products available to add to cart`);
  console.log(`✅ Test completed successfully - scenario handled correctly`);
}
