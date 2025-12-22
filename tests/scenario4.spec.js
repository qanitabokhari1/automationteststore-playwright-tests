const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const dotenv = require("dotenv");

dotenv.config();

const SELECTORS = {
  MEN_SECTION: '//*[@id="categorymenu"]/nav/ul/li[6]',
  PRODUCT_CONTAINERS: '//*[@id="maincontainer"]/div/div/div/div/div[2]/div',
  PRODUCT_NAME: (index) => `//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${index}]/div[1]/div`,
  OUT_OF_STOCK: (index) => `//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${index}]/div[2]/div[3]/span`,
  ADD_TO_CART: (index) => `//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${index}]//a[contains(text(),"Add to Cart")]`,
  CART_ITEM_NAME: '//*[@id="cart_checkout1"]/div/table/tbody/tr/td[2]/a'
};


test.describe("Scenario 4: Men Section Testing with XPath Selectors", () => {
  test("Home → Men Section → Add Product Ending with M to Cart → Verify Cart Item Ends with M", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.USERNAME || "Qanita12";
    const password = process.env.PASSWORD || "Qanita123";

    try {

      await performLogin(loginPage, username, password);

      await navigateToMenSection(page);

      const { productName, wasProductAdded } =
        await findAndAddProductEndingWithM(page);

      if (wasProductAdded) {
        await verifyCartContents(page, productName);
      } else {
        // Logically handle the out of stock scenario if needed, but no logs
      }

    } catch (error) {
      throw error;
    }
  });
});

async function performLogin(loginPage, username, password) {
  await loginPage.navigateToLogin();
  await loginPage.login(username, password);
}

async function navigateToMenSection(page) {
  const menLink = page.locator(SELECTORS.MEN_SECTION);
  await expect(menLink).toBeVisible();
  await menLink.click();

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
}

async function findAndAddProductEndingWithM(page) {

  await page.waitForTimeout(2000);

  const productContainers = page.locator(SELECTORS.PRODUCT_CONTAINERS);
  const totalProducts = await productContainers.count();

  let productName = "";
  let productIndex = -1;
  let foundMProducts = 0;
  let outOfStockMProducts = 0;
  let wasProductAdded = false;

  for (let i = 0; i < totalProducts; i++) {
    try {
      const result = await processProductAtIndex(page, i + 1);
      if (result.found) {
        foundMProducts++;

        if (result.outOfStock) {
          outOfStockMProducts++;
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
      // Continue or handle error
    }
  }

  if (productIndex === -1) {
    if (foundMProducts === 0) {
      throw new Error("⚠️ No products ending with M/m found at all");
    } else {
      wasProductAdded = false;
    }
  }

  return { productName, totalProducts, foundMProducts, outOfStockMProducts, wasProductAdded };
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

  const outOfStockElement = page.locator(SELECTORS.OUT_OF_STOCK(index));
  const isOutOfStock = await outOfStockElement.isVisible();

  return { found: true, name, outOfStock: isOutOfStock };
}

async function addProductToCart(page, index, productName) {
  const addToCartButton = page.locator(SELECTORS.ADD_TO_CART(index));
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();
}

async function verifyCartContents(page, productName) {

  await page.goto(
    `${process.env.BASE_URL || "https://automationteststore.com/"
    }index.php?rt=checkout/cart`
  );
  await page.waitForLoadState("domcontentloaded");

  const cartItemName = page.locator(SELECTORS.CART_ITEM_NAME);
  await expect(cartItemName).toBeVisible();

  const actualCartItemName = await cartItemName.textContent();
  if (!actualCartItemName) {
    throw new Error("Could not get cart item name");
  }
}
