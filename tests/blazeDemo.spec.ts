import { test, expect } from '@playwright/test';
import { bookingsLocators } from '../cfg/locatorsBookings';

import { LocatorTuple, LocatorType, getByLocator } from './utils/locators';

test('test for BlazeDemo', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  await page.locator(bookingsLocators.fromPort).selectOption('Paris');
  await page.locator(bookingsLocators.toPort).selectOption('Buenos Aires');

  //await page.getByRole('button', { name: 'Find Flights' }).click();
  await getByLocator(page, bookingsLocators.findFlightsButton as LocatorType).click();
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
  await page.getByPlaceholder(bookingsLocators.nameInput).fill("blazer");
  await page.getByPlaceholder(bookingsLocators.addressInput).fill("berska");
  await page.getByPlaceholder(bookingsLocators.cityInput).fill("role");
  await page.getByPlaceholder(bookingsLocators.stateInput).fill("state");
  await page.getByPlaceholder(bookingsLocators.zipCodeInput).fill("12345");

  // await page.locator('.form-inline').selectOption('visa');
  await getByLocator(page, bookingsLocators.cardTypeSelect as LocatorType).selectOption("visa");
  // await page.locator(bookingsLocators.cardTypeSelect).selectOption('visa');

  await page.getByPlaceholder(bookingsLocators.cardNumberInput).fill("1234567777");
  await page.getByPlaceholder(bookingsLocators.cardMonthInput).fill("11");
  await page.getByPlaceholder(bookingsLocators.cardYearInput).fill("2017");
  await page.getByPlaceholder(bookingsLocators.nameOnCardInput).fill("Yanet");

  //await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await getByLocator(page, bookingsLocators.rememberMeCheckbox as LocatorType).check();

  await getByLocator(page, bookingsLocators.purchaseFlightButton as LocatorType).click();
  /*await page.getByRole(
    (bookingsLocators.purchaseFlightButton as LocatorTuple)[0],
    (bookingsLocators.purchaseFlightButton as LocatorTuple)[1]
  ).click();*/

  await expect(page.getByText('Thank you for your purchase today!', { exact: true })).toHaveText('Thank you for your purchase today!');
});