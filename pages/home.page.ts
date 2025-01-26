import {Page, Locator} from '@playwright/test'

export class HomePage {
    page: Page;
    searchInput: Locator;
    categoriesTab: Locator;
    arcadeRhythmCategory: Locator;
    languageDpwn: Locator;
    changeLangPopup: Locator;
    pageTitle: Locator;
    homePageComponent: Locator;

    constructor(page) {
    this.page = page
    this.searchInput = page.locator("[id='store_nav_search_term']")
    this.categoriesTab = page.locator('[id="genre_tab"]')
    this.arcadeRhythmCategory = page.locator('a[href*="category/arcade_rhythm/"]')
    this.languageDpwn = page.locator('[id=language_pulldown]')
    this.changeLangPopup = page.locator("//div[text()='Change language']")
    this.pageTitle = page.locator('.home_page_content_title')
    this.homePageComponent = page.locator('.home_page_takeover_sizer')
   }

   async navigate() {
    await this.page.goto('/');
   }

   async search(term: string) {
    await this.searchInput.click()
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
   }

   async selectLanguage(language: string) {
    await this.languageDpwn.click();
    await this.page.getByText(language).click();
    await this.changeLangPopup.waitFor({ state: 'hidden' });
   }

}

export default HomePage;