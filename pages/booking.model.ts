export interface Booking {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    cardType?: string;
    creditCardNumber?: string;
    creditCardMonth?: string;
    creditCardYear?: string;
    nameOnCard?: string;
}