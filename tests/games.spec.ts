import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import GamesPage from '../pages/games.page';
import SearchResultPage from '../pages/serachResult.page';

test.describe('Game Details tests', () => {
    let homePage: HomePage;
    let gamesPage: GamesPage;
    let searchResultPage: SearchResultPage;
  
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      gamesPage = new GamesPage(page);
      searchResultPage = new SearchResultPage(page);
      await homePage.navigate();
    })

    test('User sees game details', async ({ page }) => {
        const gameToSearch = 'Half-Life 2'; 
        await homePage.search(gameToSearch);
    
        await page.locator(searchResultPage.gameTitle).first().click(); 
    
        const actualTitle = await gamesPage.gameName.textContent();
        expect(actualTitle).toBe(gameToSearch);
    
        const description = await gamesPage.gameDescription.textContent();
        expect(description).not.toBeNull(); 
        expect(description).toContain('Experience the landmark first-person shooter');
    
        const price = await gamesPage.gamePrice.first().textContent();
        // eu pattern
       // const pattern = /^\d+,\d+€$/;

        const pattern = /\$\d+\.\d{2}/;
        const priceReplaceSpaces = price?.replace(/\s+/g, '');
        expect(priceReplaceSpaces).toMatch(pattern);
    
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
      });
        await expect(gamesPage.reviews.first()).toBeVisible(); 
      });

      test('User can not open game details (age restriction)', async ({ page }) => {
        const gameToSearch = 'Hunt: Showdown 1896'; 
        await homePage.search(gameToSearch);
    
        await page.locator(searchResultPage.gameTitle).first().click(); 

        await expect(gamesPage.popupTitle).toContainText('This game may contain content not appropriate for all ages');

        await page.selectOption('select#ageYear', '2019');
        await gamesPage.viewPageBtn.click();

        const errorMsg = "Sorry, but you're not permitted to view these materials at this time.";

        await gamesPage.errorModalText.waitFor({ state: 'visible' });
        expect(gamesPage.errorModalText).toContainText(errorMsg);

        await gamesPage.okBtnModal.last().waitFor({ state: 'visible' });
        await gamesPage.okBtnModal.last().click();
        await expect (homePage.homePageComponent).toBeVisible({timeout: 10000});

        await page.goBack();
        await expect(gamesPage.pageTitle).toContainText(gameToSearch);
        await expect(gamesPage.pageWarning).toContainText(errorMsg);
       });

       test('User can open game details with age restriction', async ({ page }) => {
        const gameToSearch = 'Hunt: Showdown 1896'; 
        await homePage.search(gameToSearch);
    
        await page.locator(searchResultPage.gameTitle).first().click(); 

        await expect(gamesPage.popupTitle).toContainText('This game may contain content not appropriate for all ages');

        await page.selectOption('select#ageYear', '2006');
        await gamesPage.viewPageBtn.click();

        const actualTitle = await gamesPage.gameName.textContent();
        expect(actualTitle).toBe(gameToSearch);
        await expect(gamesPage.ageWarning).toContainText('Age rating');
       });

      })