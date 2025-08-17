// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly emailMessage: Locator
  readonly passwordMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'メールアドレス' });
    this.passwordInput = page.getByRole('textbox', { name: 'パスワード' });
    this.loginButton = page.locator('#login-button');
    this.emailMessage = page.locator('#email-message');
    this.passwordMessage = page.locator('#password-message');
  }

  async login(email: string, password: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}