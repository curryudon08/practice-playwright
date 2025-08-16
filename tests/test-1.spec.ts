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
