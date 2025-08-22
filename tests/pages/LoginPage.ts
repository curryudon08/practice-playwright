// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  public static async initialize(page: Page): Promise<LoginPage> {
    return new LoginPage(page);
  }

  private constructor(page: Page) {
    super(page);
  }

  public async fillEmail(email: string){
    await this.page.fill('#email',email);
  }

  public async fillPassword(password: string){
    await this.page.fill('#password',password);
  }

  public async clickLoginButton(){
    await this.page.click('#login-button');
  }

  public async getEmailMessage():Promise<Locator>{
    return this.page.locator('#email-message');
  }

  public async getPasswordMessage():Promise<Locator>{
    return this.page.locator('#password-message');
  }
}
