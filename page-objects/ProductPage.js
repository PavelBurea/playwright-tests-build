import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";

export class ProductPage {
    constructor(page) {
        this.page = page;

        this.addButtonsList = page.locator('[data-qa="product-button"]');

        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');

        this.productTitle = page.locator('[data-qa="product-title"]');

    }
    
    visit = async () => {
        await this.page.goto("/");
    }

    addProductToBasket = async (index) => { 
        const specificAddButton = this.addButtonsList.nth(index);
        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
        const navigation = new Navigation(this.page);
        const basketCountBefore = await navigation.getBasketCount();
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");
        const basketCountAfter = await navigation.getBasketCount(); 
        expect(basketCountBefore).toBeLessThan(basketCountAfter);
     }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        const BeforeSortingTitle = await this.productTitle.allTextContents();
        await this.sortDropdown.selectOption("price-asc");
        const AfterSortingTitle = await this.productTitle.allTextContents();   
        expect(AfterSortingTitle).not.toEqual(BeforeSortingTitle);
    }
}