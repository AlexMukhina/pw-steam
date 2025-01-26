import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';
import GamesPage from '../pages/games.page';
import SignInModal from '../pages/signin.modal';

test.describe('Wishlist tests', () => {
  let homePage: HomePage;
  let gamesPage: GamesPage;
  let signInModal: SignInModal;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    gamesPage = new GamesPage(page);
    signInModal = new SignInModal(page);
    await homePage.navigate();
  })

    test('User adds a game to the wishlist', async ({ page }) => {
      await homePage.categoriesTab.click();
  
      await homePage.arcadeRhythmCategory.click();

      await gamesPage.addFirstGameToWishlist();

      await expect(signInModal.userNameInput).toBeVisible(); 
    });
  });