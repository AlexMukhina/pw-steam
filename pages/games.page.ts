import {Page, Locator} from '@playwright/test'

export class GamesPage {
    page: Page;
    wishlistBtn: Locator;
    gameName: Locator;
    gameDescription: Locator;
    gamePrice: Locator;
    reviews: Locator;
    gameTitleInList: Locator;
    starBtn: Locator;
    popupTitle: Locator;
    viewPageBtn: Locator;
    errorModalText: Locator;
    okBtnModal: Locator;
    pageTitle: Locator;
    pageWarning: Locator;
    ageWarning: Locator;

    constructor(page) {
        this.page = page
        this.starBtn = page.locator("//div[contains(@class,'WishlistButton')]")
        this.gameName = page.locator('[id=\'appHubAppName\']')
        this.gameDescription = page.locator('.game_description_snippet')
        this.gamePrice = page.locator('.game_purchase_price')
        this.reviews = page.locator('.user_reviews_sub_header')
        this.gameTitleInList = page.locator('.StoreSaleWidgetTitle')
        this.wishlistBtn = page.locator("//div[contains(text(),'Add to wishlist')]")
        this.popupTitle = page.locator('.agegate_text_container h2')
        this.viewPageBtn = page.locator('[id=\'view_product_page_btn\']')
        this.errorModalText = page.locator("//div[@class='newmodal_content']/div[not(@class)]")
        this.okBtnModal = page.locator('.btn_grey_steamui > span')
        this.pageTitle = page.locator('.pagetitle')
        this.pageWarning = page.locator('#agegate_box h2')
        this.ageWarning = page.locator('.game_rating_agency')
       }

       async addFirstGameToWishlist() {
        await this.gameTitleInList.first().hover();
        await this.starBtn.first().hover();
        await this.wishlistBtn.first().click();
       }
}

export default GamesPage;
