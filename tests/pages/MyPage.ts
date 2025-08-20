// pages/MyPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {

  public static async initialize(page: Page): Promise<MyPage> {
      const myPage = new MyPage(page);
      await expect(page).toHaveURL(/mypage.html/);
      return myPage;
  }

  private constructor(page: Page) {
    super(page);
  }

  public async getEmailLabel():Promise<Locator>{
    return this.page.locator('#email');
  }

  public async getUserNameLabel():Promise<Locator>{
    return this.page.locator('#username');
  }

  public async getRankLabel():Promise<Locator>{
    return this.page.locator('#rank');
  }

  public async logout() {
    const logoutButton = this.page.getByRole('button', { name: 'ログアウト' });
    await logoutButton.click();
  }

  public async clickReservation() {
    const reservationLink = this.page.getByRole('link', { name: '宿泊予約' });
    await reservationLink.click();
  }
}