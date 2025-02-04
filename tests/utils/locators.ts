import { Locator, Page } from "@playwright/test";

export type LocatorTuple = [role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]];
export type LocatorType = string | LocatorTuple;

export function getByLocator(page: Page, locator: LocatorType): Locator {
    return Array.isArray(locator)
        ? page.getByRole(locator[0], locator[1])
        : page.locator(locator);
};
/**
  // Locator Definition Example
  const bookingsLocators = {
        cardTypeSelect: '.form-inline',
        rememberMeCheckbox: ['checkbox', { name: 'Remember me' }],
  };

  // LocatorTuple Example
  await page.getByRole('checkbox', { name: 'Remember me' }).click();
  await page.getByRole(
    (bookingsLocators.purchaseFlightButton as LocatorTuple)[0],
    (bookingsLocators.purchaseFlightButton as LocatorTuple)[1]
  ).click();
  await getByLocator(page, bookingsLocators.purchaseFlightButton as LocatorType).check();

  // LocatorType Example
  await page.locator('.form-inline').selectOption('visa');
  await page.locator(bookingsLocators.cardTypeSelect).selectOption('visa');
  await getByLocator(page, bookingsLocators.cardTypeSelect as LocatorType).selectOption("visa");
 **/