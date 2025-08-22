import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hotel-example-site.takeyaqa.dev/ja/signup.html');
  await page.getByRole('button', { name: '登録' }).click();
  await page.locator('#signup-form div').filter({ hasText: 'メールアドレス 必須 このフィールドを入力してください。' }).locator('div').click();
  await page.locator('#signup-form div').filter({ hasText: 'メールアドレス 必須 このフィールドを入力してください。' }).locator('div').click({
    button: 'right'
  });
  await page.locator('#signup-form div').filter({ hasText: 'メールアドレス 必須 このフィールドを入力してください。' }).locator('div').click();
});