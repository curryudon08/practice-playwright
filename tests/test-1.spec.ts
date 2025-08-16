// test-1.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

/**
 * ログイン認証成功
 * プレミアム会員
 */
test('TC001', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // ログインID（メールアドレス）、パスワードを入力してログインする
  await homePage.goto();
  await homePage.clickLogin();
  await loginPage.login('jun@example.com', 'pa55w0rd!');
  // ログアウトする
  await dashboardPage.logout();
});

/**
 * ログイン認証成功
 * 一般会員
 */
test('TC002', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // ログインID（メールアドレス）、パスワードを入力してログインする
  await homePage.goto();
  await homePage.clickLogin();
  await loginPage.login('sakura@example.com', 'pass1234');
  // ログアウトする
  await dashboardPage.logout();
});

/**
 * ログイン認証失敗
 * 誤った認証情報
 */
test('TC003', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // 誤った認証情報でログインボタンをクリックする
  await homePage.goto();
  await homePage.clickLogin();
  await loginPage.login('xxxxx@example.com', 'xxxxx');
  // エラーメッセージを確認する
  await expect(page.locator('#email-message')).toBeVisible();
  await expect(page.locator('#email-message')).toContainText('メールアドレスまたはパスワードが違います。');
  await expect(page.locator('#password-message')).toBeVisible();
  await expect(page.locator('#password-message')).toContainText('メールアドレスまたはパスワードが違います。');
});

/**
 * ログイン認証失敗
 * 認証情報が未入力
 */
test('TC004', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // 認証情報を未入力でログインボタンをクリックする
  await homePage.goto();
  await homePage.clickLogin();
  await loginPage.login('', '');
  // エラーメッセージを確認する
  await expect(page.locator('#email-message')).toBeVisible();
  await expect(page.locator('#email-message')).toContainText('このフィールドを入力してください。');
  await expect(page.locator('#password-message')).toBeVisible();
  await expect(page.locator('#password-message')).toContainText('このフィールドを入力してください。');
});