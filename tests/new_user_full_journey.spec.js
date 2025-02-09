import { test, expect } from "@playwright/test";
import { ProductPage } from "./../page-objects/ProductPage.js";
import { Navigation } from "./../page-objects/Navigation.js";
import { Checkout } from "./../page-objects/Checkout.js";
import { Login } from "./../page-objects/Login.js";
import { Register } from "./../page-objects/Register.js";

test.only("Test case 1. New user buy products full journey", async ({ page }) => { 
    const productPage = new ProductPage(page);
    await productPage.visit();
    await productPage.sortByCheapest(); 

    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    
    const navigation = new Navigation(page);
    await navigation.goToCheckout();
    
    const checkout = new Checkout(page);
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();

    const login = new Login(page);
    await login.goToSignUp();

    const registerPage = new Register(page);
    await registerPage.signUpNewUser();


    // await page.pause();

})