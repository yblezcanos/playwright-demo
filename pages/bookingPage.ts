import { BasePage } from './basePage';
import { Page, Locator } from 'playwright';
import { bookingsLocators } from '../cfg/locatorsBookings';
import { getByLocator, LocatorType } from '../tests/utils/locators';
import { Booking } from './booking.model';

export class BookingPage extends BasePage {
    protected readonly fromPort: Locator;
    protected readonly toPort: Locator;
    protected readonly nameInput: Locator;
    protected readonly addressInput: Locator;
    protected readonly cityInput: Locator;
    protected readonly stateInput: Locator;
    protected readonly zipCodeInput: Locator;
    protected readonly cardTypeSelect: Locator;
    protected readonly cardNumberInput: Locator;
    protected readonly cardMonthInput: Locator;
    protected readonly cardYearInput: Locator;
    protected readonly nameOnCardInput: Locator;
    protected readonly confirmationText: Locator;
    protected readonly findFlightsButton: Locator;
    protected readonly rememberMeCheckbox: Locator;
    protected readonly purchaseFlightButton: Locator;

    constructor(page: Page) {
        super(page);
        this.fromPort = getByLocator(page, bookingsLocators.fromPort as LocatorType);
        this.toPort = getByLocator(page, bookingsLocators.toPort as LocatorType);
        this.nameInput = page.getByPlaceholder(bookingsLocators.nameInput)
        this.addressInput = page.getByPlaceholder(bookingsLocators.addressInput);
        this.cityInput = page.getByPlaceholder(bookingsLocators.cityInput);
        this.stateInput = page.getByPlaceholder(bookingsLocators.stateInput);
        this.zipCodeInput = page.getByPlaceholder(bookingsLocators.zipCodeInput);
        this.cardTypeSelect = getByLocator(page, bookingsLocators.cardTypeSelect as LocatorType);
        this.cardNumberInput = page.getByPlaceholder(bookingsLocators.cardNumberInput);
        this.cardMonthInput = page.getByPlaceholder(bookingsLocators.cardMonthInput);
        this.cardYearInput = page.getByPlaceholder(bookingsLocators.cardYearInput);
        this.nameOnCardInput = page.getByPlaceholder(bookingsLocators.nameOnCardInput);
        this.confirmationText = page.getByText(bookingsLocators.confirmationText, { exact: true });
        this.findFlightsButton = getByLocator(page, bookingsLocators.findFlightsButton as LocatorType);
        this.rememberMeCheckbox = getByLocator(page, bookingsLocators.rememberMeCheckbox as LocatorType);
        this.purchaseFlightButton = getByLocator(page, bookingsLocators.purchaseFlightButton as LocatorType);
    }

    async goToBlazeDemoPage() {
        await this.loadWeb('https://blazedemo.com');
    }

    async selectDestination(departureCity: string, destinationCity: string) {
        await this.fromPort.selectOption(departureCity);
        await this.toPort.selectOption(destinationCity);
        await this.findFlightsButton.click();
    }

    async fillPersonalInfo(info: Booking) {
        await this.nameInput.fill(info.name);
        await this.addressInput.fill(info.address);
        await this.cityInput.fill(info.city);
        await this.stateInput.fill(info.state);
        await this.zipCodeInput.fill(info.zipCode);
        await this.cardTypeSelect.selectOption(info.cardType || "Visa");
        // await this.selectOption(bookingsLocators.cardTypeSelect, info.cardType);

        await this.cardNumberInput.fill(info.creditCardNumber!);
        await this.cardMonthInput.fill(info.creditCardMonth!);
        await this.cardYearInput.fill(info.creditCardYear!);
        await this.nameOnCardInput.fill(info.nameOnCard!);
        await this.purchaseFlightButton.click();
    }

    async verifyBookingConfirmation() {
        await this.confirmationText.waitFor();
        const confirmationText = await this.confirmationText.textContent();
        return confirmationText?.includes('Thank you for your purchase!') ?? false;
    }

}
