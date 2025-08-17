// pages/ReservationFormPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReservationFormPage extends BasePage {
  private readonly contactMethodSelect: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.contactMethodSelect = page.getByLabel('確認のご連絡 必須');
    this.submitButton = page.locator('[data-test="submit-button"]');
  }

  async selectContactMethod(method: string) {
    await this.contactMethodSelect.selectOption(method);
  }

  async submitForm(): Promise<Page> {
    await this.submitButton.click();
    return this.page;
  }
}
