// pages/PlanPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlanPage extends BasePage {

  public static async initialize(page: Page): Promise<PlanPage> {
    return new PlanPage(page);
  }

  private constructor(page: Page) {
    super(page);
  }

  public async navigateToReserve(regex): Promise<Page> {
    const link = this.page.locator('div').filter({ hasText: regex }).getByRole('link');
    const pagePromise = this.page.waitForEvent('popup');
    await link.click();
    return pagePromise;
  }
}
