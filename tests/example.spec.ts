import { test, expect } from '@playwright/test';

test('TC-1 Verificación de elementos visuales en la página de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
});

test('TC-2 Verificar boton de registro está inhabilitado', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
});

test('TC-3 Verificar que el boton de registro se habilita al completar el formulario', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Sebastian');
  await page.locator('input[name="lastName"]').fill('Martinez');
  await page.locator('input[name="email"]').fill('sebas@gmail.com');
  await page.locator('input[name="password"]').fill('123456');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a la página de inicio de sesión', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');
});


test('TC-5 Verificar Registro exitoso con datos válidos', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Sebastian');
  await page.locator('input[name="lastName"]').fill('Martinez');
  await page.locator('input[name="email"]').fill('sebas'+Date.now().toString()+'@gmail.com');
  console.log('email', await page.locator('input[name="email"]').inputValue());
  await page.locator('input[name="password"]').fill('123456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verificar que un usuario no pueda registrarse con un correo electrónico ya existente', async ({ page }) => {
  const email = 'sebas' + Date.now().toString() + '@email.com';
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Sebastian');
  await page.locator('input[name="lastName"]').fill('Martinez');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('123456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Sebastian');
  await page.locator('input[name="lastName"]').fill('Martinez');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill('123456');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});