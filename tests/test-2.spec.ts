import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/login.html');
  await page.locator('#navbarNav').getByRole('button', { name: 'ログイン' }).click();
  await page.locator('#login-button').click();
  await page.locator('#email-message').click();
  await page.locator('#password-message').click();
  await page.getByRole('textbox', { name: 'メールアドレス' }).click();
  await page.getByRole('link', { name: 'ホーム' }).click();
  await page.getByRole('cell', { name: 'jun@example.com' }).click();
  await page.getByText('jun@example.com').click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByRole('textbox', { name: 'メールアドレス' }).click();
  await page.getByRole('textbox', { name: 'メールアドレス' }).fill('jun@example.com');
  await page.getByRole('textbox', { name: 'パスワード' }).click();
  await page.getByRole('textbox', { name: 'パスワード' }).fill('fafafafa');
  await page.locator('#login-button').click();
  await page.locator('#email-message').click();
  await page.locator('#password-message').click();
  await page.getByRole('textbox', { name: 'メールアドレス' }).click();
  await page.getByRole('textbox', { name: 'パスワード' }).click();
  await page.getByRole('textbox', { name: 'パスワード' }).click();
  await page.getByRole('textbox', { name: 'メールアドレス' }).click();
  await page.getByRole('textbox', { name: 'パスワード' }).click();
});