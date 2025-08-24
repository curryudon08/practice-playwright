import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { LoginPage } from '../pages/LoginPage';
import { MyPage } from '../pages/MyPage.ts';
import { PlanPage } from '../pages/PlanPage.ts';
import { expectedPlansNotLogin, expectedPlansPremium, expectedPlansNormal } from '../testdata/plans.ts'

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

test('宿泊プラン一覧_未ログイン', async ({ page }) => {
  // 宿泊プラン一覧画面に遷移する
  await homePage.navigateToPlans();
  await expect(page).toHaveURL(/plans.html/);
  // 各プランの詳細を確認する
  for (let i = 0; i < expectedPlansNotLogin.length; i++) {
    const expectedPlan = expectedPlansNotLogin[i];
    // プラン名の検証
    const nameLocator = await planPage.getPlanName(expectedPlan.name);
    const actualName = await nameLocator.innerText();
    expect(actualName.trim()).toBe(expectedPlan.name);
    // 価格の検証
    const priceLocator = await planPage.getPlanPrice(expectedPlan.name);
    const actualPrice = await priceLocator.innerText();
    expect(actualPrice.trim()).toBe(expectedPlan.price);
    // 定員の検証
    const capacityLocator = await planPage.getPlanCapacity(expectedPlan.name);
    const actualCapacity = await capacityLocator.innerText();
    expect(actualCapacity.trim()).toBe(expectedPlan.capacity);
    // 客室タイプの検証
    const roomTypeLocator = await planPage.getPlanRoomType(expectedPlan.name,expectedPlan.roomType);
    const actualRoomType = await roomTypeLocator.innerText();
    expect(actualRoomType.trim()).toBe(expectedPlan.roomType);
  }
});

test('宿泊プラン一覧_プレミアム会員', async ({ page }) => {
  // ログイン画面に遷移する
  await homePage.navigateToLogin();
  await expect(page).toHaveURL(/login.html/);
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.fillEmail('jun@example.com');
  await loginPage.fillPassword('pa55w0rd!');
  await loginPage.clickLoginButton();
  // マイページが表示される
  await expect(page).toHaveURL(/mypage.html/);
  // 宿泊プラン一覧画面に遷移する
  await homePage.navigateToPlans();
  await expect(page).toHaveURL(/plans.html/);
  // 各プランの詳細を確認する
  for (let i = 0; i < expectedPlansPremium.length; i++) {
    const expectedPlan = expectedPlansPremium[i];
    // プラン名の検証
    const nameLocator = await planPage.getPlanName(expectedPlan.name);
    const actualName = await nameLocator.innerText();
    expect(actualName.trim()).toBe(expectedPlan.name);
    // 価格の検証
    const priceLocator = await planPage.getPlanPrice(expectedPlan.name);
    const actualPrice = await priceLocator.innerText();
    expect(actualPrice.trim()).toBe(expectedPlan.price);
    // 定員の検証
    const capacityLocator = await planPage.getPlanCapacity(expectedPlan.name);
    const actualCapacity = await capacityLocator.innerText();
    expect(actualCapacity.trim()).toBe(expectedPlan.capacity);
    // 客室タイプの検証
    const roomTypeLocator = await planPage.getPlanRoomType(expectedPlan.name,expectedPlan.roomType);
    const actualRoomType = await roomTypeLocator.innerText();
    expect(actualRoomType.trim()).toBe(expectedPlan.roomType);
  }
});

test('宿泊プラン一覧_一般会員', async ({ page }) => {
  // ログイン画面に遷移する
  await homePage.navigateToLogin();
  await expect(page).toHaveURL(/login.html/);
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.fillEmail('sakura@example.com');
  await loginPage.fillPassword('pass1234');
  await loginPage.clickLoginButton();
  // マイページが表示される
  await expect(page).toHaveURL(/mypage.html/);
  // 宿泊プラン一覧画面に遷移する
  await homePage.navigateToPlans();
  await expect(page).toHaveURL(/plans.html/);
  // 各プランの詳細を確認する
  for (let i = 0; i < expectedPlansNormal.length; i++) {
    const expectedPlan = expectedPlansNormal[i];
    // プラン名の検証
    const nameLocator = await planPage.getPlanName(expectedPlan.name);
    const actualName = await nameLocator.innerText();
    expect(actualName.trim()).toBe(expectedPlan.name);
    // 価格の検証
    const priceLocator = await planPage.getPlanPrice(expectedPlan.name);
    const actualPrice = await priceLocator.innerText();
    expect(actualPrice.trim()).toBe(expectedPlan.price);
    // 定員の検証
    const capacityLocator = await planPage.getPlanCapacity(expectedPlan.name);
    const actualCapacity = await capacityLocator.innerText();
    expect(actualCapacity.trim()).toBe(expectedPlan.capacity);
    // 客室タイプの検証
    const roomTypeLocator = await planPage.getPlanRoomType(expectedPlan.name,expectedPlan.roomType);
    const actualRoomType = await roomTypeLocator.innerText();
    expect(actualRoomType.trim()).toBe(expectedPlan.roomType);
  }
});
