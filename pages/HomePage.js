const { expect } = require('@playwright/test');
const { BasePage } = require('../utils/BasePage');

class HomePage extends BasePage {
  async clickHomeNav() {

    const homeLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[1]');

    await this.scrollIntoView(homeLink);
    await this.click(homeLink);

    await this.locator('//div[@id="maincontainer"]').waitFor({ state: 'visible' });

  }

  async clickDoveBrandFromCarousel() {

    const brandCarousel = this.locator('//*[@id="brandcarousal"]');

    await expect(brandCarousel).toBeVisible();

    // await this.scrollIntoView(brandCarousel);

    const doveBrand = this.locator('//*[@id="brandcarousal"]/li[7]');

    await expect(doveBrand).toBeVisible({ timeout: 20000 });

    await this.click(doveBrand);

  }

  async navigateToApparelSection() {

    const apparelLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]');

    await expect(apparelLink).toBeVisible();

    await this.scrollIntoView(apparelLink);

    if (await this.isVisible(apparelLink)) {
      await this.click(apparelLink);
    } else {
      throw new Error('APPAREL & ACCESSORIES section not found at //*[@id="categorymenu"]/nav/ul/li[2]');
    }

  }

  async navigateToTshirtsSection() {

    // Hover over Apparel first to ensure sub-menu is visible
    const apparelLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]');
    if (await this.isVisible(apparelLink)) {
      await apparelLink.hover();
    }

    const tshirtsLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]/div/ul[1]/li[2]');

    try {
      await tshirtsLink.waitFor({ state: 'visible' });
      await this.scrollIntoView(tshirtsLink);
      await this.click(tshirtsLink);
    } catch (e) {
      throw new Error('T-shirts section not found. Please check the page structure.');
    }

  }

  async navigateToShoesSection() {

    // Hover over Apparel first to ensure sub-menu is visible
    const apparelLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]');
    if (await this.isVisible(apparelLink)) {
      await apparelLink.hover();
    }

    const shoesLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]/div/ul[1]/li[1]');

    try {
      await shoesLink.waitFor({ state: 'visible' });
      await this.scrollIntoView(shoesLink);
      await this.click(shoesLink);
    } catch (e) {
      throw new Error('Shoes section not found. Please check the page structure.');
    }

  }

  async navigateToSkincareSection() {
    const skincareLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[4]');
    await skincareLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.click(skincareLink);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToMenSection() {
    const menLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[6]');
    await menLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.click(menLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

}

module.exports = { HomePage };
