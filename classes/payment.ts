import { Booking } from "./booking";
import { Transport } from "./transport";
import { TripOption } from "./trip-option";
import { User } from "./user";

export class Payment {
    id!: number;
    user!: User;
    booking!: Booking;
    tripOption!: TripOption;
    amount!: number;
    dateMade!: Date;
    paymentMethod!: string;
}
