// test-2.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReservationPage } from './pages/ReservationPage';
import { ReservationFormPage } from './pages/ReservationFormPage';
import { ReservationConfirmPage } from './pages/ReservationConfirmPage.ts';

/**
 * 宿泊予約
 * プレミアム会員
 */
test('TC005', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const reservationPage = new ReservationPage(page);

  // ログインID（メールアドレス）、パスワードを入力してログインする
  await homePage.goto();
  await homePage.clickLogin();
  await loginPage.login('jun@example.com', 'pa55w0rd!');
  // マイページが表示される
  await expect(dashboardPage.rank).toContainText('プレミアム会員');
  // 宿泊予約ページに移動してプランを選択する
  await dashboardPage.clickReservation();
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
  await dashboardPage.logout();
});
