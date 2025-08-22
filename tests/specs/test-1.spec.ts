// test-1.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { LoginPage } from '../pages/LoginPage';
import { MyPage } from '../pages/MyPage';

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

test('ログイン認証成功_プレミアム会員', async ({ page }) => {
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.fillEmail('jun@example.com');
  await loginPage.fillPassword('pa55w0rd!');
  await loginPage.clickLoginButton();
  // マイページが表示される
  await expect(page).toHaveURL(/mypage.html/);
  await expect(await myPage.getEmail()).toContainText('jun@example.com');
  await expect(await myPage.getUserName()).toContainText('林潤');
  await expect(await myPage.getRank()).toContainText('プレミアム会員');
  await expect(await myPage.getAddress()).toContainText('大阪府大阪市北区梅田');
  await expect(await myPage.getTel()).toContainText('01212341234');
  await expect(await myPage.getGender()).toContainText('その他');
  await expect(await myPage.getBirthday()).toContainText('1988年12月17日');
  await expect(await myPage.getNotification()).toContainText('受け取らない');
});

test('ログイン認証成功_一般会員', async ({ page }) => {
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.fillEmail('sakura@example.com');
  await loginPage.fillPassword('pass1234');
  await loginPage.clickLoginButton();
  // マイページが表示される
  await expect(page).toHaveURL(/mypage.html/);
  await expect(await myPage.getEmail()).toContainText('sakura@example.com');
  await expect(await myPage.getUserName()).toContainText('松本さくら');
  await expect(await myPage.getRank()).toContainText('一般会員');
  await expect(await myPage.getAddress()).toContainText('神奈川県横浜市鶴見区大黒ふ頭');
  await expect(await myPage.getTel()).toContainText('未登録');
  await expect(await myPage.getGender()).toContainText('女性');
  await expect(await myPage.getBirthday()).toContainText('2000年4月1日');
  await expect(await myPage.getNotification()).toContainText('受け取らない');
});

test('ログイン認証失敗_誤った認証情報', async ({ page }) => {
  // 誤った認証情報でログインボタンをクリックする
  await loginPage.fillEmail('xxxxx@example.com');
  await loginPage.fillPassword('xxxxx');
  await loginPage.clickLoginButton();
  // エラーメッセージを確認する
  await expect(await loginPage.getEmailMessage()).toBeVisible();
  await expect(await loginPage.getEmailMessage()).toContainText('メールアドレスまたはパスワードが違います。');
  await expect(await loginPage.getPasswordMessage()).toBeVisible();
  await expect(await loginPage.getPasswordMessage()).toContainText('メールアドレスまたはパスワードが違います。');
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