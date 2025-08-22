// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  public static async initialize(page: Page): Promise<HomePage> {
    return new HomePage(page);
  }

  private constructor(page: Page) {
    super(page);
  }
}
