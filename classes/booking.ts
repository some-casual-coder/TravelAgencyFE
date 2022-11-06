import { Room } from "./room";
import { User } from "./user";

export class Booking {
    id!: number;
    room!: Room;
    user!: User;
    fromDate!: Date;
    toDate!: Date;
    totalCost!: number;
    totalPaymentsMade!: boolean;
    paymentCompleted!: boolean;
    stayCompleted!: boolean;
    stayCompletedConfirmation!: boolean;
}
