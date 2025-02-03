import { test, expect } from '@playwright/test';

test('test for BlazeDemo', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  await page.locator('select[name="fromPort"]').selectOption('Paris');
  await page.locator('select[name="toPort"]').selectOption('Buenos Aires');
  await page.getByRole('button', { name: 'Find Flights' }).click();
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
  await page.getByPlaceholder("First Last").fill("blazer");
  await page.getByPlaceholder("123 Main St.").fill("berska");
  await page.getByPlaceholder("Anytown").fill("role");
  await page.getByPlaceholder("State").fill("state");
  await page.getByPlaceholder("12345").fill("12345");
  await page.locator('.form-inline').selectOption('visa');
  await page.getByPlaceholder("Credit Card Number").fill("1234567777");
  await page.getByPlaceholder("Month").fill("11");
  await page.getByPlaceholder("Year").fill("2017");
  await page.getByPlaceholder("John Smith").fill("Yanet");  
  await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await page.getByRole('button', { name: 'Purchase Flight' }).click();  
  
  await expect(page.getByText('Thank you for your purchase today!', { exact: true })).toHaveText('Thank you for your purchase today!');
});