// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  public static async initialize(page: Page): Promise<LoginPage> {
      const loginPage = new LoginPage(page);
      await expect(page).toHaveURL(/login.html/);
      return loginPage;
  }

  private constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  public async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  public async getEmailMessageLabel():Promise<Locator>{
    return this.page.locator('#email-message');
  }

  public async getPasswordMessageLabel():Promise<Locator>{
    return this.page.locator('#password-message');
  }

  public async getEmailMessageLabel():Promise<Locator>{
    return this.page.locator('#email-message');
  }

  public async getPasswordMessageLabel():Promise<Locator>{
    return this.page.locator('#password-message');
  }
}