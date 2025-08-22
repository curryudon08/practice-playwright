// test-2.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { LoginPage } from '../pages/LoginPage';
import { MyPage } from '../pages/MyPage';
import { PlanPage } from '../pages/PlanPage.ts';
import { ReservePage } from '../pages/ReservePage.ts';
import { ConfirmPage } from '../pages/ConfirmPage.ts';

let homePage: HomePage;
let loginPage: LoginPage;
let myPage: MyPage;
let planPage: PlanPage;

test.beforeEach(async ({ page }) => {
  homePage = await HomePage.initialize(page);
  loginPage = await LoginPage.initialize(page);
  myPage = await MyPage.initialize(page);
  planPage = await PlanPage.initialize(page);
  // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  await expect(page).toHaveURL(/index.html/);
  // 宿泊プラン画面に遷移する
  await loginPage.navigateToPlans();
  await expect(page).toHaveURL(/plans.html/);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('宿泊予約_必須項目が未入力', async ({ page }) => {
  // 宿泊プランを選択して予約フォームに遷移する
  const plan = await planPage.navigateToReserve(/^素泊まり大人1名5,500円1名様からシングルこのプランで予約$/);
  const reservePage =  await ReservePage.initialize(plan);
  await expect(plan).toHaveURL(/reserve.html/);
  // 予約内容を登録する
  await reservePage.fillDate('');
  await reservePage.fillTerm('');
  await reservePage.fillHeadCount('');
  await reservePage.fillUsername('');
  await reservePage.clickSubmitButton();
  // エラーメッセージを確認する
  await expect(await reservePage.getDateMessage()).toBeVisible();
  await expect(await reservePage.getDateMessage()).toContainText('このフィールドを入力してください。');
  await expect(await reservePage.getTermMessage()).toBeVisible();
  await expect(await reservePage.getTermMessage()).toContainText('このフィールドを入力してください。');
  await expect(await reservePage.getHeadCountMessage()).toBeVisible();
  await expect(await reservePage.getHeadCountMessage()).toContainText('このフィールドを入力してください。');
  await expect(await reservePage.getUsernameMessage()).toBeVisible();
  await expect(await reservePage.getUsernameMessage()).toContainText('このフィールドを入力してください。');
});

test('宿泊予約_宿泊数のフォーマットエラー', async ({ page }) => {
  // 宿泊プランを選択して予約フォームに遷移する
  const plan = await planPage.navigateToReserve(/^素泊まり大人1名5,500円1名様からシングルこのプランで予約$/);
  const reservePage =  await ReservePage.initialize(plan);
  await expect(plan).toHaveURL(/reserve.html/);
  // 予約内容を登録する
  await reservePage.fillTerm('');
  await reservePage.fillTerm('0');
  await reservePage.clickSubmitButton();
  await expect(await reservePage.getTermMessage()).toBeVisible();
  await expect(await reservePage.getTermMessage()).toContainText('1以上の値を入力してください。');
  // 予約内容を登録する
  await reservePage.fillTerm('');
  await reservePage.fillTerm('10');
  await reservePage.clickSubmitButton();
  await expect(await reservePage.getTermMessage()).toBeVisible();
  await expect(await reservePage.getTermMessage()).toContainText('9以下の値を入力してください。');
});

test('宿泊予約_人数のフォーマットエラー（シングルプラン）', async ({ page }) => {
  // 宿泊プランを選択して予約フォームに遷移する
  const plan = await planPage.navigateToReserve(/^素泊まり大人1名5,500円1名様からシングルこのプランで予約$/);
  const reservePage =  await ReservePage.initialize(plan);
  await expect(plan).toHaveURL(/reserve.html/);
  // 予約内容を登録する
  await reservePage.fillHeadCount('');
  await reservePage.fillHeadCount('0');
  await reservePage.clickSubmitButton();
  await expect(await reservePage.getHeadCountMessage()).toBeVisible();
  await expect(await reservePage.getHeadCountMessage()).toContainText('1以上の値を入力してください。');
  // 予約内容を登録する
  await reservePage.fillHeadCount('');
  await reservePage.fillHeadCount('3');
  await reservePage.clickSubmitButton();
  await expect(await reservePage.getHeadCountMessage()).toBeVisible();
  await expect(await reservePage.getHeadCountMessage()).toContainText('2以下の値を入力してください。');
});

test('宿泊予約_宿泊日のフォーマットエラー', async ({ page }) => {
  // 宿泊プランを選択して予約フォームに遷移する
  const plan = await planPage.navigateToReserve(/^素泊まり大人1名5,500円1名様からシングルこのプランで予約$/);
  const reservePage =  await ReservePage.initialize(plan);
  await expect(plan).toHaveURL(/reserve.html/);
  // 予約内容を登録する
  await reservePage.fillDate('');
  await reservePage.fillDate('2000/01/01');
  await reservePage.clickSubmitButton();
  await expect(await reservePage.getDateMessage()).toBeVisible();
  await expect(await reservePage.getDateMessage()).toContainText('翌日以降の日付を入力してください。');
  // 予約内容を登録する
  await reservePage.fillDate('');
  await reservePage.fillDate('2100/01/01');
  await reservePage.clickSubmitButton();
  await expect(await reservePage.getDateMessage()).toBeVisible();
  await expect(await reservePage.getDateMessage()).toContainText('3ヶ月以内の日付を入力してください。');
});