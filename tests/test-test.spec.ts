import { test, expect } from '@playwright/test';

test('TC-1 Verificar que el usuario puede registrarse con éxito', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Sebastian');
  await page.locator('input[name="lastName"]').fill('Martinez');
  await page.locator('input[name="email"]').fill('sebas@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
});