// test-2.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { LoginPage } from '../pages/LoginPage.ts';
import { MyPage } from '../pages/MyPage.ts';
import { PlanPage } from '../pages/PlanPage.ts';
import { ReservePage } from '../pages/ReservePage.ts';
import { ConfirmPage } from '../pages/ConfirmPage.ts';
import * as userData from '../testdata/userData.json';

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
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('宿泊予約完了_プレミアムプラン', async ({ page }) => {
  // ログイン画面に遷移する
  await homePage.navigateToLogin();
  await expect(page).toHaveURL(/login.html/);
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.fillEmail(userData.user3.email);
  await loginPage.fillPassword(userData.user3.password);
  await loginPage.clickLoginButton();
  // マイページが表示される
  await expect(page).toHaveURL(/mypage.html/);
  // 宿泊プラン画面に遷移する
  await loginPage.navigateToPlans();
  await expect(page).toHaveURL(/plans.html/);
  // 宿泊プランを選択して予約フォームに遷移する
  const plan = await planPage.navigateToReserve('プレミアムプラン');
  const reservePage =  await ReservePage.initialize(plan);
  await expect(plan).toHaveURL(/reserve.html/);
  // 予約内容を登録する（必須入力のみ）
  await reservePage.fillUsername('山田太郎');
  await reservePage.selectContactDecline();
  await reservePage.clickSubmitButton();
  // 宿泊予約確認画面に遷移する
  const confirmPage =  await ConfirmPage.initialize(plan);
  await expect(plan).toHaveURL(/confirm.html/);
  // 宿泊予約を確定する
  await confirmPage.clickConfirmButton();
  await confirmPage.clickCloseModalButton();
  await expect(page).toHaveURL(/plans.html/);
  // ログアウトする
  await planPage.logout();
});
