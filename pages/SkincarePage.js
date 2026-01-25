const { BasePage } = require('../utils/BasePage');

class SkincarePage extends BasePage {
    constructor(page) {
        super(page);
        this.productContainers = this.locator('//*[@id="maincontainer"]/div/div/div/div/div[3]/div');
    }

    async getProductCount() {
        // The original test subtracted 1, likely due to a specific page structure or trailing element
        const count = await this.productContainers.count();
        return count > 0 ? count - 1 : 0;
    }

    async addAvailableSaleItemsToCart() {
        const totalProducts = await this.getProductCount();
        let stats = {
            saleItemsCount: 0,
            outOfStockCount: 0,
            saleItemsAdded: 0
        };

        for (let i = 0; i < totalProducts; i++) {
            try {
                const saleIndicator = this.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/span`);
                const isOnSale = await saleIndicator.isVisible();

                if (isOnSale) {
                    stats.saleItemsCount++;

                    const outOfStockIndicator = this.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/div[3]/span`);
                    const isOutOfStock = await outOfStockIndicator.isVisible();

                    if (isOutOfStock) {
                        stats.outOfStockCount++;
                    } else {
                        try {
                            const addToCartButton = this.locator(`//*[@id="maincontainer"]/div/div/div/div/div[3]/div[${i + 1}]/div[2]/div[3]/a`);
                            if (await addToCartButton.isVisible()) {
                                await this.click(addToCartButton);
                                stats.saleItemsAdded++;
                                await this.page.waitForTimeout(1000);
                            }
                        } catch (addToCartError) {
                            // Continue if cannot add to cart
                        }
                    }
                }
            } catch (error) {
                // Continue to next product on error
            }
        }
        return stats;
    }
}

module.exports = { SkincarePage };
