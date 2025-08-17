// pages/ReservationPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReservationPage extends BasePage {
  private readonly premiumPlanLink: Locator;

  constructor(page: Page) {
    super(page);
    this.premiumPlanLink = page.locator('div')
      .filter({ hasText: /^プレミアムプラン大人1名10,000円2名様からプレミアムツインこのプランで予約$/ })
      .getByRole('link');
  }

  async selectPremiumPlan(): Promise<Page> {
    const pagePromise = this.page.waitForEvent('popup');
    await this.premiumPlanLink.click();
    return await pagePromise;
  }
}