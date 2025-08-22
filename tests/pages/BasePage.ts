// pages/BasePage.ts
import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  public async navigateToHome() {
    await this.page.getByRole('link', { name: 'ホーム' }).click() ;
  }

  public async navigateToReservation() {
    await this.page.getByRole('link', { name: '宿泊予約' }).click();
  }

  /** 
  public async navigateToSignup() {
    const reservationLink = this.page.getByRole('link', { name: '会員登録' });
    await reservationLink.click();
  }
  */

  public async navigateToLogin() {
    await this.page.getByRole('button', { name: 'ログイン' }).click();
  }

  public async logout() {
    await this.page.getByRole('button', { name: 'ログアウト' }).click();
  }
}