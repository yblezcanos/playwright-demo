import { test, expect } from '@playwright/test';
import { bookingsLocators } from '../cfg/locatorsBookings';
import { LocatorTuple, LocatorType, getByLocator } from './utils/locators';
import { BookingPage } from '../pages/bookingPage';


let bookingPage: BookingPage;

test.beforeEach(async ({ page }) => {
    bookingPage = new BookingPage(page);
});
test('Verify satisfactory fly booking', async ({ page }) => {
    await bookingPage.goToBlazeDemoPage();
    await bookingPage.selectDestination('Paris', 'Buenos Aires');
    await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
    await bookingPage.fillPersonalInfo({
        name: "blazer",
        address: "berska",
        city: "role",
        state: "state",
        zipCode: "12345",
        cardType: "visa",
        creditCardNumber: "1234567777",
        creditCardMonth: "march",
        creditCardYear: "2021",
        nameOnCard: "Yanet"
    });

    await bookingPage.verifyBookingConfirmation();

});