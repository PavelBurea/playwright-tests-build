export class Register {
    constructor(page) {
        this.page = page;

        this.emailInput = page.getByPlaceholder('e-mail');
        
        this.passInput = page.getByRole('textbox', { name: 'password' }); 

        this.registerButton = page.getByRole('button', { name: 'register' });

    }

    signUpNewUser = async () => {
        await this.emailInput.waitFor();
        await this.emailInput.fill("test@test.com");
        await this.passInput.waitFor();
        await this.passInput.fill("1234");
        await this.registerButton.waitFor();
        await this.registerButton.click();
        
        await this.page.pause();


        
    }
}