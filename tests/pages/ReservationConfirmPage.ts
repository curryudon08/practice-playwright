// pages/ReservationConfirmPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReservationConfirmPage extends BasePage {
  private readonly confirmButton: Locator;
  private readonly closeButton: Locator;
  readonly completionMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmButton = page.getByRole('button', { name: 'この内容で予約する' });
    this.closeButton = page.getByRole('button', { name: '閉じる' });
    this.completionMessage = page.getByText('ご来館、心よりお待ちしております。');
  }

  async confirmReservation() {
    await this.confirmButton.click();
  }

  async closeModal() {
    await this.closeButton.click();
  }
}
