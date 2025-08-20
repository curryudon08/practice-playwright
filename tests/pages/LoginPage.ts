// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'メールアドレス' });
    this.passwordInput = page.getByRole('textbox', { name: 'パスワード' });
    this.loginButton = page.locator('#login-button');
  }

  async login(email: string, password: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  public async getEmailMessageLabel():Promise<Locator>{
    return this.page.locator('#email-message');
  }

  public async getPasswordMessageLabel():Promise<Locator>{
    return this.page.locator('#password-message');
  }
}