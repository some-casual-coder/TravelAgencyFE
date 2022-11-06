import { Booking } from "./booking";
import { Transport } from "./transport";

export class TripOption {
    id!: number;
    transport!: Transport;
    booking!: Booking;
    fromDate!: Date;
    toDate!: Date;
    totalCost!: number;
    totalPaymentsMade!: number;
    paymentCompleted!: boolean;
}
