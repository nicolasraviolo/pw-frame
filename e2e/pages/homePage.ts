import { Locator, Page } from '@playwright/test';
import { CartPage } from './cartPage';

export class HomePage {
    readonly page: Page;
    readonly linkCart: Locator;
    readonly linkSignUp: Locator;
    readonly linkLogin: Locator;
    readonly txtBoxuserName: Locator;
    readonly txtBoxPassword: Locator;
    readonly btnSignUp: Locator;
    readonly txtBoxLoginUserName: Locator;
    readonly txtBoxLoginPassword: Locator;
    readonly btnLogin: Locator;
    readonly linkProduct: (prodName: string) => Locator;
    public readonly successPurchaseTitle: Locator;
    readonly linkAddToCart: Locator;


    //Locators and constructor
    constructor(page: Page) {
        this.page = page;
        this.linkCart = page.locator("//a[text()='Cart']");
        this.linkSignUp = page.locator("//a[text()='Sign up']");
        this.linkLogin = page.locator("//a[text()='Log in']");
        this.txtBoxuserName = page.locator("//input[@id='sign-username']");
        this.txtBoxPassword = page.locator("//input[@id='sign-password']");
        this.txtBoxLoginUserName = page.locator("#loginusername");
        this.txtBoxLoginPassword = page.locator("#loginpassword");
        this.btnSignUp = page.locator("//button[text()='Sign up']");
        this.btnLogin = page.locator("//button[text()='Log in']");
        this.linkProduct = (prodName: string) => this.page.getByRole('link', { name: prodName });
        this.successPurchaseTitle = page.locator('h2', { hasText: 'Thank you for your purchase!' });
        this.linkAddToCart = page.locator("//a[text()='Add to cart']");
    }

    async clickSignUp() {
        await this.linkSignUp.click();
    }
    //Sign up
    async performSignUp(user: string, password: string) {
        this.clickSignUp();
        await this.txtBoxuserName.fill(user);
        await this.txtBoxPassword.fill(password);

        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

        await this.btnSignUp.click();
    }
    async clickOnCart() {
        await this.linkCart.click();
        return new CartPage(this.page);
    }
    //Login
    async clickLogin() {
        await this.linkLogin.click();
    }

    async performLogin(user: string, password: string) {
        this.clickLogin();
        await this.txtBoxLoginUserName.fill(user);
        await this.txtBoxLoginPassword.fill(password);
        await this.btnLogin.click();
    }
    //Add to cart    
    async addProductToCart(prodName: string) {
        this.linkProduct(prodName).click();

        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

        await this.linkAddToCart.click();
    }
}