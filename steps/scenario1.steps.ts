import { When, Then } from '@cucumber/cucumber';

When('I navigate to the home page', async function() {
  const homePage = (this as any).homePage;
  await homePage.clickHomeNav();
});

When('I select the Dove brand from the carousel', async function() {
  const homePage = (this as any).homePage;
  await homePage.clickDoveBrandFromCarousel();
});

When('I add the newest product to the cart', async function() {
  const productPage = (this as any).productPage;
  await productPage.addNewestItemToCart();
});

Then('I should see {int} item in the cart', async function(count: number) {
  const cartPage = (this as any).cartPage;
  await cartPage.assertItemInCart(count);
});
