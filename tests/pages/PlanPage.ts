// pages/PlanPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlanPage extends BasePage {

  public static async initialize(page: Page): Promise<PlanPage> {
    return new PlanPage(page);
  }

  private constructor(page: Page) {
    super(page);
  }

  public async navigateToReserve(regex): Promise<Page> {
    const link = this.page.locator('div').filter({ hasText: regex }).getByRole('link');
    const pagePromise = this.page.waitForEvent('popup');
    await link.click();
    return pagePromise;
  }

  public async getPlanName(planName: string):Promise<Locator>{
    return this.page.locator('h5').filter({ hasText: planName });
  }

  private async getPlanContainer(planName: string):Promise<Locator>{
    const planNameLocator = this.page.locator('h5').filter({ hasText: planName });
    return planNameLocator.locator('..').locator('..');
  }

  public async getPlanPrice(planName: string):Promise<Locator>{
    const planContainer = await this.getPlanContainer(planName);
    return planContainer.locator('li').filter({ hasText: /円/ });
  }

  public async getPlanCapacity(planName: string):Promise<Locator>{
    const planContainer = await this.getPlanContainer(planName);
    return planContainer.locator('li').filter({ hasText: /名様/ });
  }

  public async getPlanRoomType(planName: string, roomType: string):Promise<Locator>{
    const planContainer = await this.getPlanContainer(planName);
    return planContainer.locator('li').filter({ hasText: new RegExp(roomType.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))});
  }
}
