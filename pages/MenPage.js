const { expect } = require('@playwright/test');
const { BasePage } = require('../utils/BasePage');

class MenPage extends BasePage {
    constructor(page) {
        super(page);
        this.productContainers = this.locator('//*[@id="maincontainer"]/div/div/div/div/div[2]/div');
    }

    async scrollPageToCenter() {
        await this.page.evaluate(() => {
            window.scrollBy({
                top: window.innerHeight / 2,
                behavior: 'smooth'
            });
        });
        await this.page.waitForTimeout(1200);
    }

    async findAndAddProductEndingWith(suffix) {
        await this.page.waitForTimeout(2000);
        const count = await this.productContainers.count();

        for (let i = 1; i <= count; i++) {
            // Locator for product name - adjusted to be more robust
            const nameLocator = this.locator(`//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${i}]//a[contains(@class, "prdocutname")]`);

            let name = "";
            try {
                // Try specific class first
                if (await nameLocator.count() > 0) {
                    name = (await nameLocator.textContent())?.trim() || "";
                } else {
                    // Fallback to div structure
                    const fallbackNameLocator = this.locator(`//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${i}]/div[1]/div`);
                    name = (await fallbackNameLocator.textContent())?.trim() || "";
                }
            } catch (e) {
                continue;
            }

            if (name.toLowerCase().endsWith(suffix.toLowerCase())) {
                const outOfStockLocator = this.locator(`//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${i}]//*[contains(text(), "Out of Stock")]`);
                const isOutOfStock = await outOfStockLocator.isVisible();

                if (!isOutOfStock) {
                    // Use title attribute which is more reliable for icon-based buttons
                    const addToCartButton = this.locator(`//*[@id="maincontainer"]/div/div/div/div/div[2]/div[${i}]//a[@title="Add to Cart"]`);

                    await expect(addToCartButton).toBeVisible({ timeout: 10000 });
                    await addToCartButton.click();
                    return { name, wasProductAdded: true };
                }
            }
        }
        return { name: "", wasProductAdded: false };
    }
}

module.exports = { MenPage };
