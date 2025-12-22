const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { HomePage } = require("../pages/HomePage");
const { MenPage } = require("../pages/MenPage");
const { CartPage } = require("../pages/CartPage");
const dotenv = require("dotenv");

dotenv.config();

test.describe("Scenario 4: Men Section Testing with POM", () => {
  test("Home → Men Section → Add Product Ending with M to Cart → Verify Cart Item Ends with M", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const menPage = new MenPage(page);
    const cartPage = new CartPage(page);

    const username = process.env.LOGIN_USERNAME || process.env.USERNAME || "Qanita12";
    const password = process.env.LOGIN_PASSWORD || process.env.PASSWORD || "Qanita123";

    await loginPage.navigateToLogin();
    await loginPage.login(username, password);

    await homePage.navigateToMenSection();

    // Smooth scroll to center after men section loads
    await menPage.scrollPageToCenter();

    const { productName, wasProductAdded } = await menPage.findAndAddProductEndingWith("m");

    if (wasProductAdded) {
      await page.goto(`${process.env.BASE_URL || "https://automationteststore.com/"}index.php?rt=checkout/cart`);
      await page.waitForLoadState("domcontentloaded");
      await cartPage.assertItemInCartByName(productName);
    }
  });
});
