// pages/IndexPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class IndexPage extends BasePage {

  public static async initialize(page: Page): Promise<IndexPage> {
      const indexPage = new IndexPage(page);
      await expect(page).toHaveURL(/index.html/);
      return indexPage;
  }

  private constructor(page: Page) {
    super(page);
  }

  public async clickLoginLink(){
    const loginLink = this.page.getByRole('button', { name: 'ログイン' });
    await loginLink.click();
  }
}