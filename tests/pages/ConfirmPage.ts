// pages/ReservationConfirmPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmPage extends BasePage {
 
  public static async initialize(page: Page): Promise<ConfirmPage> {
    return new ConfirmPage(page);
  }

  private constructor(page: Page) {
    super(page);
  }

  public async clickConfirmButton() {
    await this.page.getByRole('button', { name: 'この内容で予約する' }).click();
  }

  public async clickCloseModalButton() {
    await this.page.getByRole('button', { name: '閉じる' }).click();
  }
}
