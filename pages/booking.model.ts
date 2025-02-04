export interface Booking {
    // Required fields
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    cardType?: string;

    // Optional fields
    creditCardNumber?: string;
    creditCardMonth?: string;
    creditCardYear?: string;
    nameOnCard?: string;
}