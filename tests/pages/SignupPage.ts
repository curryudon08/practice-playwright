// pages/SignupPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {

  public static async initialize(page: Page): Promise<SignupPage> {
    return new SignupPage(page);
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

  public async fillPasswordConfirmation(password: string){
    await this.page.fill('#password-confirmation',password);
  }

  public async fillUsername(username: string){
    await this.page.fill('#username',username);
  }

  public async checkRankPremiun(){
    await this.page.check('#rank-premium');
  }

  public async checkRankNormal(){
    await this.page.check('#rank-normal');
  }

  public async fillAddress(address: string){
    await this.page.fill('#address',address);
  }

  public async fillTel(tel: string){
    await this.page.fill('#tel',tel);
  }

  public async selectGenderNotAnswered(){
    await this.page.locator('#gender').selectOption('0');
  }

  public async selectGenderMale(){
    await this.page.locator('#gender').selectOption('1');
  }

  public async selectGenderFemale(){
    await this.page.locator('#gender').selectOption('2');
  }

  public async selectGenderOthers(){
    await this.page.locator('#gender').selectOption('9');
  }

  public async fillBirthday(birthday: string){
    await this.page.fill('#birthday',birthday);
  }

  public async checkNotification(){
    await this.page.check('#notification');
  }

  public async clickSubmitButton(){
    await this.page.getByRole('button', { name: '登録' }).click();
  }

  public async getEmailMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"signup-form\"]/div[1]/div');
  }

  public async getPasswordMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"signup-form\"]/div[2]/div');
  }

  public async getPasswordConfirmationMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"signup-form\"]/div[3]/div');
  }

  public async getUsernameMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"signup-form\"]/div[4]/div');
  }

  public async getTelMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"signup-form\"]/div[6]/div');
  }

  public async getBirthdayMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"signup-form\"]/div[8]/div');
  }
}
