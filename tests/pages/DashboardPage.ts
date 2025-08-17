// pages/DashboardPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly logoutButton: Locator;
  readonly reservationLink: Locator;
  readonly rank: Locator

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.getByRole('button', { name: 'ログアウト' });
    this.reservationLink = page.getByRole('link', { name: '宿泊予約' });
    this.rank = page.locator('#rank');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async clickReservation() {
    await this.reservationLink.click();
  }
}