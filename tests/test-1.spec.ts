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
  // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  const indexPage = await IndexPage.initialize(page);
  // ログイン画面に遷移する
  await indexPage.clickLoginLink();
  const loginPage = await LoginPage.initialize(page);
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.login('jun@example.com', 'pa55w0rd!');
  const myPage = new MyPage(page);
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
  // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  const indexPage = await IndexPage.initialize(page);
  // ログイン画面に遷移する
  await indexPage.clickLoginLink();
  const loginPage = await LoginPage.initialize(page);
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.login('sakura@example.com', 'pass1234');
  const myPage = new MyPage(page);
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
 // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  const indexPage = await IndexPage.initialize(page);
  // ログイン画面に遷移する
  await indexPage.clickLoginLink();
  const loginPage = await LoginPage.initialize(page);
  // 誤った認証情報でログインボタンをクリックする
  await loginPage.login('xxxxx@example.com', 'xxxxx');
  // エラーメッセージを確認する
  await expect(await loginPage.getEmailMessageLabel()).toBeVisible();
  await expect(await loginPage.getEmailMessageLabel()).toContainText('メールアドレスまたはパスワードが違います。');
  await expect(await loginPage.getPasswordMessageLabel()).toBeVisible();
  await expect(await loginPage.getPasswordMessageLabel()).toContainText('メールアドレスまたはパスワードが違います。');
});

/**
 * ログイン認証失敗
 * 認証情報が未入力
 */
test('TC004', async ({ page }) => {
 // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  const indexPage = await IndexPage.initialize(page);
  // ログイン画面に遷移する
  await indexPage.clickLoginLink();
  const loginPage = await LoginPage.initialize(page);
  // 認証情報を未入力でログインボタンをクリックする
  await loginPage.login('', '');
  // エラーメッセージを確認する
  await expect(await loginPage.getEmailMessageLabel()).toBeVisible();
  await expect(await loginPage.getEmailMessageLabel()).toContainText('このフィールドを入力してください。');
  await expect(await loginPage.getPasswordMessageLabel()).toBeVisible();
  await expect(await loginPage.getPasswordMessageLabel()).toContainText('このフィールドを入力してください。');
});