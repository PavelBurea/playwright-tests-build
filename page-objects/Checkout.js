import { expect } from "@playwright/test";

export class Checkout {

    constructor(page) {
        this.page = page;

        this.basketCards = page.locator('[data-qa="basket-card"]');
        
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        
        this.removeItemFromBasket = page.locator('[data-qa="basket-card-remove-item"]');

        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]');


    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor();
        await this.basketItemPrice.first().waitFor();
        const itemsBeforeRemoving = await this.basketCards.count();
        const allPriceTexts = await this.basketItemPrice.allInnerTexts();
        const jNumbers = allPriceTexts.map((element) => {
            // convert text of price to parseInt withoutDollar
            const withoutDollar = element.replace("$","");
            return parseInt(withoutDollar, 10);
            
        })
        const smallestPrice = Math.min(jNumbers);
        const smallestPriceIndex = jNumbers.indexOf(smallestPrice);
        const specificRemoveButton = this.removeItemFromBasket.nth(smallestPriceIndex);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoving - 1); 
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor();
        await this.continueToCheckoutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 3000});
        
    }
}

