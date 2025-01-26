import {Page, Locator} from '@playwright/test'

export class SignInModal {
    page: Page;
    userNameInput: Locator;

    constructor(page) {
        this.page = page
        this.userNameInput = page.locator("//div[contains(text(),'Sign in with')]/following-sibling::input")
       }
}

export default SignInModal;