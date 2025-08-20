// test-1.spec.ts
import { test, expect } from '@playwright/test';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage';

/**
 * ログイン認証成功
 * プレミアム会員
 */
test('TC001', async ({ page }) => {
  const indexPage = new IndexPage(page);
  const loginPage = new LoginPage(page);
  const myPage = new MyPage(page);

  // ログインID（メールアドレス）、パスワードを入力してログインする
  await indexPage.goto();
  await indexPage.clickLogin();
  await loginPage.login('jun@example.com', 'pa55w0rd!');
  // マイページが表示される
  await expect(myPage.rank).toContainText('プレミアム会員');
  // ログアウトする
  await myPage.logout();
});

/**
 * ログイン認証成功
 * 一般会員
 */
test('TC002', async ({ page }) => {
  const indexPage = new IndexPage(page);
  const loginPage = new LoginPage(page);
  const myPage = new MyPage(page);

  // ログインID（メールアドレス）、パスワードを入力してログインする
  await indexPage.goto();
  await indexPage.clickLogin();
  await loginPage.login('sakura@example.com', 'pass1234');
  // マイページが表示される
  await expect(myPage.rank).toContainText('一般会員');
  // ログアウトする
  await myPage.logout();
});

/**
 * ログイン認証失敗
 * 誤った認証情報
 */
test('TC003', async ({ page }) => {
  const indexPage = new IndexPage(page);
  const loginPage = new LoginPage(page);
  const myPage = new MyPage(page);

  // 誤った認証情報でログインボタンをクリックする
  await indexPage.goto();
  await indexPage.clickLogin();
  await loginPage.login('xxxxx@example.com', 'xxxxx');
  // エラーメッセージを確認する
  await expect(loginPage.emailMessage).toBeVisible();
  await expect(loginPage.emailMessage).toContainText('メールアドレスまたはパスワードが違います。');
  await expect(loginPage.passwordMessage).toBeVisible();
  await expect(loginPage.passwordMessage).toContainText('メールアドレスまたはパスワードが違います。');
});

/**
 * ログイン認証失敗
 * 認証情報が未入力
 */
test('TC004', async ({ page }) => {
  const indexPage = new IndexPage(page);
  const loginPage = new LoginPage(page);
  const myPage = new MyPage(page);

  // 認証情報を未入力でログインボタンをクリックする
  await indexPage.goto();
  await indexPage.clickLogin();
  await loginPage.login('', '');
  // エラーメッセージを確認する
  await expect(loginPage.emailMessage).toBeVisible();
  await expect(loginPage.emailMessage).toContainText('このフィールドを入力してください。');
  await expect(loginPage.passwordMessage).toBeVisible();
  await expect(loginPage.passwordMessage).toContainText('このフィールドを入力してください。');
});