// test-2.spec.ts
import { test, expect } from '@playwright/test';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { MyPage } from './pages/MyPage.ts';
import { ReservationPage } from './pages/ReservationPage';
import { ReservationFormPage } from './pages/ReservationFormPage';
import { ReservationConfirmPage } from './pages/ReservationConfirmPage.ts';

/**
 * 宿泊予約
 * プレミアム会員
 */
test('TC005', async ({ page }) => {
  // ホーム画面に遷移する
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/index.html');
  const indexPage = await IndexPage.initialize(page);
  // ログイン画面に遷移する
  await indexPage.clickLoginLink();
  const loginPage = await LoginPage.initialize(page);
  // ログインID（メールアドレス）、パスワードを入力してログインする
  await loginPage.login('jun@example.com', 'pa55w0rd!');
  const myPage = await MyPage.initialize(page);
  // マイページが表示される
  await expect(await myPage.getRankLabel()).toContainText('プレミアム会員');
  // 宿泊予約ページに移動してプランを選択する
  await myPage.clickReservation();
  const reservationPage = new ReservationPage(page);
  const booking = await reservationPage.selectPremiumPlan();
  // 予約フォームで予約する
  const reservationFormPage = new ReservationFormPage(booking);
  await reservationFormPage.selectContactMethod('email');
  const confirm = await reservationFormPage.submitForm();
  // 予約を完了する
  const reservationConfirmPage = new ReservationConfirmPage(confirm);
  await reservationConfirmPage.confirmReservation();
  await expect(reservationConfirmPage.completionMessage).toContainText('ご来館、心よりお待ちしております。');
  await reservationConfirmPage.closeModal();
  // ログアウトする
  await myPage.logout();
});
