// pages/ReservationFormPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReservePage extends BasePage {

  public static async initialize(page: Page): Promise<ReservePage> {
    return new ReservePage(page);
  }

  private constructor(page: Page) {
    super(page);
  }

  public async fillDate(date: string){
    await this.page.locator('#date').clear();
    await this.page.fill('#date',date);
  }

  public async fillTerm(term: string){
    await this.page.locator('#term').clear();
    await this.page.fill('#term',term);
  }

  public async fillHeadCount(headCount: string){
    await this.page.locator('#head-count').clear();
    await this.page.fill('#head-count',headCount);
  }

  public async checkAddBreakfast(){
    await this.page.locator('#breakfast').check();
  }

  public async checkAddEarlyCheckIn(){
    await this.page.locator('#early-check-in').check();
  }

  public async checkAddSightSeeing(){
    await this.page.locator('#sightseeing').check();
  }

  public async fillUsername(username: string){
    await this.page.locator('#username').clear();
    await this.page.fill('#username',username);
  }

  public async selectContactDecline() {
    await this.page.locator('#contact').selectOption('no');
  }

  public async selectContactEmail() {
    await this.page.locator('#contact').selectOption('email');
  }

  public async selectContactTel() {
    await this.page.locator('#contact').selectOption('tel');
  }

  public async fillComment(comment: string){
    await this.page.locator('#comment').clear();
    await this.page.fill('#comment',comment);
  }

  public async clickSubmitButton(){
    await this.page.locator('#submit-button').click();
  }

  public async getDateMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"reserve-form\"]/div/div[1]/div[1]/div');
  }

  public async getTermMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"reserve-form\"]/div/div[1]/div[2]/div/div[2]');
  }

  public async getHeadCountMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"reserve-form\"]/div/div[1]/div[3]/div/div[2]');
  }

  public async getUsernameMessage():Promise<Locator>{
    return this.page.locator('//*[@id=\"reserve-form\"]/div/div[1]/div[7]/div');
  }
}
