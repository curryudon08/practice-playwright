// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class IndexPage extends BasePage {
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginButton = page.getByRole('button', { name: 'ログイン' });
  }

  async goto() {
    await this.page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}