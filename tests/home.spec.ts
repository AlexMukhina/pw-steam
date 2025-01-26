import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import SearchResultPage from '../pages/serachResult.page';
import FilterComponent from '../pages/filter.page';

test.describe('Home Page tests', () => {
  let homePage: HomePage;
  let searchResultPage: SearchResultPage;
  let filterComponent: FilterComponent;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
    filterComponent = new FilterComponent(page);
    await homePage.navigate();
  })

  test('User searches for a game by name', async ({ page }) => {
    const gameToSearch = 'Magicka Paradox';
    const gameInUrl = 'term=Magicka+Paradox';
    const expectedTitle = 'Magicka';

    await homePage.search(gameToSearch);

    expect(page.url()).toContain(gameInUrl);

    await page.waitForSelector(searchResultPage.gameTitle);
    let namesList = page.locator(searchResultPage.gameTitle);
    
    for (const name of await namesList.elementHandles()) {
      const title = await name.innerText();
      expect(title).toContain(expectedTitle); 
  }
  });

  test('User changes language', async ({ page }) => {
    await homePage.selectLanguage('Deutsch');
    await expect(homePage.pageTitle.first()).toContainText('Angesagt und empfohlen'); 

    await homePage.selectLanguage('English');
    await expect(homePage.pageTitle.first()).toContainText('Featured & Recommended'); 
  });

  test('User filters games list', async ({ page }) => {
    await homePage.search('Valheim');
    await page.waitForSelector(searchResultPage.gameTitle);

    const totalResult = await searchResultPage.getNumberOfGames();

    const filterText = 'Hide free to play items';

    await filterComponent.clickFilterLocatorByname(filterText);
    await filterComponent.waitForFilterToApply(totalResult);

    await expect(filterComponent.getFilterLocator(filterText)).toHaveClass(/checked/);
    const resultAfterFilter1 = await searchResultPage.getNumberOfGames();
    
    expect(resultAfterFilter1).toBeLessThan(totalResult); 

  });

})



