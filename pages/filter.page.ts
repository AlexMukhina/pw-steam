import {Page, Locator} from '@playwright/test'

export class FilterComponent {
    page: Page;

    constructor(page) {
        this.page = page;

    }

    async clickFilterLocatorByname(filterText: string) {
        await this.page.locator(`span[data-loc='${filterText}']`).first().click();
      }

      getFilterLocator(filterText: string): Locator {
        return this.page.locator(`span[data-loc='${filterText}']`).first();
      }

      async waitForFilterToApply(numOfElements: number) {
        await this.page.waitForFunction((numOfElements) => {
            const titles = document.querySelectorAll('span.title');
            return titles.length !== numOfElements;
          }, numOfElements, {timeout : 25000});
      }


}

export default FilterComponent;