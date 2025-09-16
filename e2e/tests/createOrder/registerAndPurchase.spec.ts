import { test, expect } from '@playwright/test';
import { Env } from '../../../frameworkConfig/env';


test('test', async ({ page }) => {
  await page.goto(Env.URL);

  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(Env.USER);
  await page.getByRole('textbox', { name: 'Password:' }).fill(Env.PASS);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  
  await page.getByRole('button', { name: 'Sign up' }).click();

  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill(Env.USER);
  await page.locator('#loginpassword').fill(Env.PASS);
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.getByRole('link', { name: 'Add to cart' }).click();

  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('textbox', { name: 'Total: 360 Name:' }).fill('test');
  await page.getByRole('textbox', { name: 'Country:' }).fill('españa');
  await page.getByRole('textbox', { name: 'City:' }).fill('barcelona');
  await page.getByRole('textbox', { name: 'Credit card:' }).fill('1234123412341234');
  await page.getByRole('textbox', { name: 'Month:' }).fill('12');
  await page.getByRole('textbox', { name: 'Year:' }).fill('2030');
  await page.getByRole('button', { name: 'Purchase' }).click();

  await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();
});