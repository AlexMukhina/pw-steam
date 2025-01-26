import {Page, Locator} from '@playwright/test'

export class SearchResultPage {
    page: Page;
    gameTitle: string;
    wishlistBtn: Locator;
    resultAmount: Locator;

    constructor(page) {
        this.page = page
        this.gameTitle = 'span.title'
        this.wishlistBtn = page.locator('a[href="wishlist"]')
        this.resultAmount = page.locator("//div[contains(@class,'search_results_filtered')]/div")
    }

    async getNumberOfGames(): Promise<number> {
        const amountText = await this.resultAmount.first().textContent();
        if (amountText != null) {
            const match = amountText.match(/^\d+/);
            if (match) {
               return parseInt(match[0], 10);
            }
        }
        throw new Error('No number found in the search result text');
    }

}

export default SearchResultPage;