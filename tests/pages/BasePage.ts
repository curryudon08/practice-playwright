// pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }
}