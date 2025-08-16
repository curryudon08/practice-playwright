// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'ログイン' });
  }

  async goto() {
    await this.page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}