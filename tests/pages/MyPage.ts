// pages/MyPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {

  public static async initialize(page: Page): Promise<MyPage> {
    return new MyPage(page);
  }

  private constructor(page: Page) {
    super(page);
  }

  public async getEmail():Promise<Locator>{
    return this.page.locator('#email');
  }

  public async getUserName():Promise<Locator>{
    return this.page.locator('#username');
  }

  public async getRank():Promise<Locator>{
    return this.page.locator('#rank');
  }

  public async getAddress():Promise<Locator>{
    return this.page.locator('#address');
  }

  public async getTel():Promise<Locator>{
    return this.page.locator('#tel');
  }

  public async getGender():Promise<Locator>{
    return this.page.locator('#gender');
  }

  public async getBirthday():Promise<Locator>{
    return this.page.locator('#birthday');
  }

  public async getNotification():Promise<Locator>{
    return this.page.locator('#notification');
  }

  public async clicDeleteButton(){
    await this.page.getByRole('button', { name: '退会する' }).click();
  }  
}