// test-1.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { LoginPage } from '../pages/LoginPage.ts';
import { MyPage } from '../pages/MyPage.ts';
import * as userData from '../testdata/userData.json';

let homePage: HomePage;
let loginPage: LoginPage;
let myPage: MyPage;

test.beforeEach(async ({ page }) => {
  homePage = await HomePage.initialize(page);
  loginPage = await LoginPage.initialize(page);
  myPage = await MyPage.initialize(page);
  // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  await expect(page).toHaveURL(/index.html/);
  // ログイン画面に遷移する
  await homePage.navigateToLogin();
  await expect(page).toHaveURL(/login.html/);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('ログイン認証成功', () => {
  test('ログイン認証成功_登録済みユーザ1', async ({ page }) => {
    // ログインID（メールアドレス）、パスワードを入力してログインする
    await loginPage.fillEmail(userData.user1.email);
    await loginPage.fillPassword(userData.user1.password);
    await loginPage.clickLoginButton();
    // マイページが表示される
    await expect(page).toHaveURL(/mypage.html/);
    await expect(await myPage.getEmail()).toContainText(userData.user1.email);
    await expect(await myPage.getUserName()).toContainText(userData.user1.userName);
    await expect(await myPage.getRank()).toContainText(userData.user1.rank);
    await expect(await myPage.getAddress()).toContainText(userData.user1.address);
    await expect(await myPage.getTel()).toContainText(userData.user1.tel);
    await expect(await myPage.getGender()).toContainText(userData.user1.gender);
    await expect(await myPage.getBirthday()).toContainText(userData.user1.birthday);
    await expect(await myPage.getNotification()).toContainText(userData.user1.notification);
  });

  test('ログイン認証成功_登録済みユーザ2', async ({ page }) => {
    // ログインID（メールアドレス）、パスワードを入力してログインする
    await loginPage.fillEmail(userData.user2.email);
    await loginPage.fillPassword(userData.user2.password);
    await loginPage.clickLoginButton();
    // マイページが表示される
    await expect(page).toHaveURL(/mypage.html/);
    await expect(await myPage.getEmail()).toContainText(userData.user2.email);
    await expect(await myPage.getUserName()).toContainText(userData.user2.userName);
    await expect(await myPage.getRank()).toContainText(userData.user2.rank);
    await expect(await myPage.getAddress()).toContainText(userData.user2.address);
    await expect(await myPage.getTel()).toContainText(userData.user2.tel);
    await expect(await myPage.getGender()).toContainText(userData.user2.gender);
    await expect(await myPage.getBirthday()).toContainText(userData.user2.birthday);
    await expect(await myPage.getNotification()).toContainText(userData.user2.notification);
  });

  test('ログイン認証成功_登録済みユーザ3', async ({ page }) => {
    // ログインID（メールアドレス）、パスワードを入力してログインする
    await loginPage.fillEmail(userData.user3.email);
    await loginPage.fillPassword(userData.user3.password);
    await loginPage.clickLoginButton();
    // マイページが表示される
    await expect(page).toHaveURL(/mypage.html/);
    await expect(await myPage.getEmail()).toContainText(userData.user3.email);
    await expect(await myPage.getUserName()).toContainText(userData.user3.userName);
    await expect(await myPage.getRank()).toContainText(userData.user3.rank);
    await expect(await myPage.getAddress()).toContainText(userData.user3.address);
    await expect(await myPage.getTel()).toContainText(userData.user3.tel);
    await expect(await myPage.getGender()).toContainText(userData.user3.gender);
    await expect(await myPage.getBirthday()).toContainText(userData.user3.birthday);
    await expect(await myPage.getNotification()).toContainText(userData.user3.notification);
  });

  test('ログイン認証成功_登録済みユーザ4', async ({ page }) => {
    // ログインID（メールアドレス）、パスワードを入力してログインする
    await loginPage.fillEmail(userData.user4.email);
    await loginPage.fillPassword(userData.user4.password);
    await loginPage.clickLoginButton();
    // マイページが表示される
    await expect(page).toHaveURL(/mypage.html/);
    await expect(await myPage.getEmail()).toContainText(userData.user4.email);
    await expect(await myPage.getUserName()).toContainText(userData.user4.userName);
    await expect(await myPage.getRank()).toContainText(userData.user4.rank);
    await expect(await myPage.getAddress()).toContainText(userData.user4.address);
    await expect(await myPage.getTel()).toContainText(userData.user4.tel);
    await expect(await myPage.getGender()).toContainText(userData.user4.gender);
    await expect(await myPage.getBirthday()).toContainText(userData.user4.birthday);
    await expect(await myPage.getNotification()).toContainText(userData.user4.notification);
  });
});

test.describe('ログイン認証失敗', () => {
  test('ログイン認証失敗_誤った認証情報', async ({ page }) => {
    // 誤った認証情報でログインボタンをクリックする
    await loginPage.fillEmail(userData.user5.email);
    await loginPage.fillPassword(userData.user5.password);
    await loginPage.clickLoginButton();
    // エラーメッセージを確認する
    await expect(await loginPage.getEmailMessage()).toBeVisible();
    await expect(await loginPage.getEmailMessage()).toContainText('メールアドレスまたはパスワードが違います。');
    await expect(await loginPage.getPasswordMessage()).toBeVisible();
    await expect(await loginPage.getPasswordMessage()).toContainText('メールアドレスまたはパスワードが違います。');
  });

  test('ログイン認証失敗_メールアドレスのフォーマットエラー', async ({ page }) => {
    // 認証情報を未入力でログインボタンをクリックする
    await loginPage.fillEmail(userData.user6.email);
    await loginPage.fillPassword(userData.user6.password);
    await loginPage.clickLoginButton();
    // エラーメッセージを確認する
    await expect(await loginPage.getEmailMessage()).toBeVisible();
    await expect(await loginPage.getEmailMessage()).toContainText('メールアドレスを入力してください。');
  });

  test('ログイン認証失敗_認証情報が未入力', async ({ page }) => {
    // 認証情報を未入力でログインボタンをクリックする
    await loginPage.fillEmail('');
    await loginPage.fillPassword('');
    await loginPage.clickLoginButton();
    // エラーメッセージを確認する
    await expect(await loginPage.getEmailMessage()).toBeVisible();
    await expect(await loginPage.getEmailMessage()).toContainText('このフィールドを入力してください。');
    await expect(await loginPage.getPasswordMessage()).toBeVisible();
    await expect(await loginPage.getPasswordMessage()).toContainText('このフィールドを入力してください。');
  });
});
