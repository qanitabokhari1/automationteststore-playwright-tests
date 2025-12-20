const { expect } = require('@playwright/test');
const { BasePage } = require('../utils/BasePage');

class HomePage extends BasePage {
  async clickHomeNav() {
    const homeLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[1]');

    await this.scrollIntoView(homeLink);
    await this.click(homeLink);

    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');

    await this.locator('//div[@id="maincontainer"]').waitFor({ state: 'visible', timeout: 15000 });

  }

  async clickDoveBrandFromCarousel() {

    await this.waitForLoadState('networkidle');

    const brandCarousel = this.locator('//*[@id="brandcarousal"]');

    await expect(brandCarousel).toBeVisible({ timeout: 15000 });
    await brandCarousel.waitFor({ state: 'visible', timeout: 10000 });

    await this.scrollIntoView(brandCarousel);

    const doveBrand = this.locator('//*[@id="brandcarousal"]/li[7]');

    await expect(doveBrand).toBeVisible({ timeout: 20000 });
    await doveBrand.waitFor({ state: 'visible', timeout: 10000 });

    await this.click(doveBrand);

    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');

  }

  async navigateToApparelSection() {

    await this.waitForLoadState('networkidle');

    const apparelLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]');

    await expect(apparelLink).toBeVisible({ timeout: 15000 });
    await apparelLink.waitFor({ state: 'visible', timeout: 10000 });

    await this.scrollIntoView(apparelLink);

    if (await this.isVisible(apparelLink)) {
      await this.click(apparelLink);
    } else {
      throw new Error('APPAREL & ACCESSORIES section not found at //*[@id="categorymenu"]/nav/ul/li[2]');
    }

    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');
  }

  async navigateToTshirtsSection() {

    await this.waitForLoadState('networkidle');

    const tshirtsLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]/div/ul[1]/li[2]');

    if (await this.isVisible(tshirtsLink)) {
      await this.scrollIntoView(tshirtsLink);
      await this.click(tshirtsLink);
    } else {
      throw new Error('T-shirts section not found. Please check the page structure.');
    }

    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');
  }

}

module.exports = { HomePage };
