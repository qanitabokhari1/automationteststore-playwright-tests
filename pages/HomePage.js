const { expect } = require('@playwright/test');
const { BasePage } = require('../utils/BasePage');

class HomePage extends BasePage {
  async clickHomeNav() {
    console.log('Navigating to Home page...');
    const homeLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[1]');
    
    await this.scrollIntoView(homeLink);
    await this.click(homeLink);
    console.log('✓ Clicked Home navigation');
    
    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');
    
    await this.locator('//div[@id="maincontainer"]').waitFor({ state: 'visible', timeout: 15000 });
    
    console.log('✓ Home page loaded successfully and stable');
  }

  async clickDoveBrandFromCarousel() {
    console.log('Selecting Dove brand from brands carousel...');
    
    await this.waitForLoadState('networkidle');
    
    const brandCarousel = this.locator('//*[@id="brandcarousal"]');
    
    await expect(brandCarousel).toBeVisible({ timeout: 15000 });
    await brandCarousel.waitFor({ state: 'visible', timeout: 10000 });
    
    console.log('Smooth scrolling to brand carousel...');
    await this.scrollIntoView(brandCarousel);
    console.log('✓ Smooth scrolled to brand carousel section');
    
    const doveBrand = this.locator('//*[@id="brandcarousal"]/li[7]');
    
    await expect(doveBrand).toBeVisible({ timeout: 20000 });
    await doveBrand.waitFor({ state: 'visible', timeout: 10000 });
    
    await this.click(doveBrand);
    console.log('✓ Clicked on Dove brand');
    
    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');
    
    console.log('✓ Dove products page loaded successfully and stable');
  }

  async navigateToApparelSection() {
    console.log('Navigating to APPAREL & ACCESSORIES section...');
    
    await this.waitForLoadState('networkidle');
    
    const apparelLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]');
    
    await expect(apparelLink).toBeVisible({ timeout: 15000 });
    await apparelLink.waitFor({ state: 'visible', timeout: 10000 });
    
    await this.scrollIntoView(apparelLink);
    
    if (await this.isVisible(apparelLink)) {
      await this.click(apparelLink);
      console.log('✓ Clicked on APPAREL & ACCESSORIES section');
    } else {
      throw new Error('APPAREL & ACCESSORIES section not found at //*[@id="categorymenu"]/nav/ul/li[2]');
    }
    
    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');
    console.log('✓ APPAREL & ACCESSORIES page loaded successfully and stable');
  }

  async navigateToTshirtsSection() {
    console.log('Navigating to T-shirts section...');
    
    await this.waitForLoadState('networkidle');
    
    const tshirtsLink = this.locator('//*[@id="categorymenu"]/nav/ul/li[2]/div/ul[1]/li[2]');
    
    if (await this.isVisible(tshirtsLink)) {
      await this.scrollIntoView(tshirtsLink);
      await this.click(tshirtsLink);
      console.log('✓ Clicked on T-shirts section');
    } else {
      throw new Error('T-shirts section not found. Please check the page structure.');
    }
    
    await this.waitForLoadState('domcontentloaded');
    await this.waitForLoadState('networkidle');
    console.log('✓ T-shirts page loaded successfully and stable');
  }

}

module.exports = { HomePage };
