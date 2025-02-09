
export class Login {
    constructor(page) {
        this.page = page;

        this.signUpButton = page.locator('[data-qa="go-to-signup-button"]');
    }

    goToSignUp = async () => {
        await this.signUpButton.waitFor();
        await this.signUpButton.click();
        await this.page.waitForURL(/\/signup/, {timeout: 3000});
    }

}