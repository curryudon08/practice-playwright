import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { LoginPage } from '../pages/LoginPage';
import { MyPage } from '../pages/MyPage';
import { SignupPage } from '../pages/SignupPage.ts';

let homePage: HomePage;
let loginPage: LoginPage;
let myPage: MyPage;
let signupPage: SignupPage;

test.beforeEach(async ({ page }) => {
  homePage = await HomePage.initialize(page);
  loginPage = await LoginPage.initialize(page);
  myPage = await MyPage.initialize(page);
  signupPage = await SignupPage.initialize(page);
  // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  await expect(page).toHaveURL(/index.html/);
  // 会員登録画面に遷移する
  await homePage.navigateToSignup();
  await expect(page).toHaveURL(/signup.html/);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('会員登録成功_全項目入力', async ({ page }) => {
  // 会員登録する
  await signupPage.fillEmail('test@example.com');
  await signupPage.fillPassword('qwert123');
  await signupPage.fillPasswordConfirmation('qwert123');
  await signupPage.fillUsername('山田太郎');
  await signupPage.checkRankPremiun();
  await signupPage.fillAddress('東京都千代田区千代田');
  await signupPage.fillTel('01133335555');
  await signupPage.selectGenderMale();
  await signupPage.fillBirthday('1990-10-18');
  await signupPage.checkNotification();
  await signupPage.clickSubmitButton();
  // マイページが表示される
  await expect(page).toHaveURL(/mypage.html/);
  await expect(await myPage.getEmail()).toContainText('test@example.com');
  await expect(await myPage.getUserName()).toContainText('山田太郎');
  await expect(await myPage.getRank()).toContainText('プレミアム会員');
  await expect(await myPage.getAddress()).toContainText('東京都千代田区千代田');
  await expect(await myPage.getTel()).toContainText('01133335555');
  await expect(await myPage.getGender()).toContainText('男性');
  await expect(await myPage.getBirthday()).toContainText('1990年10月18日');
  await expect(await myPage.getNotification()).toContainText('受け取る');
});

test('会員登録成功_必須項目のみ入力', async ({ page }) => {
  // 会員登録する
  await signupPage.fillEmail('test@example.com');
  await signupPage.fillPassword('qwert123');
  await signupPage.fillPasswordConfirmation('qwert123');
  await signupPage.fillUsername('佐藤花子');
  await signupPage.checkRankNormal();
  await signupPage.fillAddress('');
  await signupPage.fillTel('');
  await signupPage.selectGenderNotAnswered();
  await signupPage.fillBirthday('');
  //await signupPage.checkNotification();
  await signupPage.clickSubmitButton();
  // マイページが表示される
  await expect(page).toHaveURL(/mypage.html/);
  await expect(await myPage.getEmail()).toContainText('test@example.com');
  await expect(await myPage.getUserName()).toContainText('佐藤花子');
  await expect(await myPage.getRank()).toContainText('一般会員');
  await expect(await myPage.getAddress()).toContainText('未登録');
  await expect(await myPage.getTel()).toContainText('未登録');
  await expect(await myPage.getGender()).toContainText('未登録');
  await expect(await myPage.getBirthday()).toContainText('未登録');
  await expect(await myPage.getNotification()).toContainText('受け取らない');
});

test('会員登録エラー_必須項目が未入力', async ({ page }) => {
  // 未入力で会員登録する
  await signupPage.clickSubmitButton();
  // エラーメッセージを確認する
  await expect(await signupPage.getEmailMessage()).toBeVisible();
  await expect(await signupPage.getEmailMessage()).toContainText('このフィールドを入力してください。');
  await expect(await signupPage.getPasswordMessage()).toBeVisible();
  await expect(await signupPage.getPasswordMessage()).toContainText('このフィールドを入力してください。');
  await expect(await signupPage.getPasswordConfirmationMessage()).toBeVisible();
  await expect(await signupPage.getPasswordConfirmationMessage()).toContainText('このフィールドを入力してください。');
  await expect(await signupPage.getUsernameMessage()).toBeVisible();
  await expect(await signupPage.getUsernameMessage()).toContainText('このフィールドを入力してください。');
});

test('会員登録エラー_メールアドレスのフォーマットエラー', async ({ page }) => {
  // 会員登録する
  await signupPage.fillEmail('abc');
  await signupPage.clickSubmitButton();
  // エラーメッセージを確認する
  await expect(await signupPage.getEmailMessage()).toBeVisible();
  await expect(await signupPage.getEmailMessage()).toContainText('メールアドレスを入力してください。');
});

test('会員登録エラー_登録済みメールアドレス', async ({ page }) => {
  // 会員登録する
  await signupPage.fillEmail('jun@example.com');
  await signupPage.clickSubmitButton();
  // エラーメッセージを確認する
  await expect(await signupPage.getEmailMessage()).toBeVisible();
  await expect(await signupPage.getEmailMessage()).toContainText('このメールアドレスはすでに登録済みです。');
});

test('会員登録エラー_電話番号のフォーマットエラー', async ({ page }) => {
  // 会員登録する
  await signupPage.fillTel('qwertyuiopa');
  await signupPage.clickSubmitButton();
  // エラーメッセージを確認する
  await expect(await signupPage.getTelMessage()).toBeVisible();
  await expect(await signupPage.getTelMessage()).toContainText('指定されている形式で入力してください。');
});

test('会員登録エラー_パスワードのフォーマットエラー', async ({ page }) => {
  // 会員登録する
  await signupPage.fillPassword('a');
  await signupPage.fillPasswordConfirmation('a');
  await signupPage.clickSubmitButton();
  // エラーメッセージを確認する
  await expect(await signupPage.getPasswordMessage()).toBeVisible();
  await expect(await signupPage.getPasswordMessage()).toContainText('8文字以上で入力してください。');
  await expect(await signupPage.getPasswordConfirmationMessage()).toBeVisible();
  await expect(await signupPage.getPasswordConfirmationMessage()).toContainText('8文字以上で入力してください。');
});

test('会員登録エラー_パスワードが一致しない', async ({ page }) => {
  // 会員登録する
  await signupPage.fillPassword('qwert123');
  await signupPage.fillPasswordConfirmation('qwert12345');
  await signupPage.clickSubmitButton();
  // エラーメッセージを確認する
  await expect(await signupPage.getPasswordConfirmationMessage()).toBeVisible();
  await expect(await signupPage.getPasswordConfirmationMessage()).toContainText('入力されたパスワードと一致しません。');
});
