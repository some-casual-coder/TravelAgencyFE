import { TransportType } from "./transport-type";
import { User } from "./user";

export class Transport {
    id!: number;
    model!: string;
    chargedPer!: string;
    capacity!: number;
    price!: number;
    latitude!: number;
    longitude!: number;
    transportType!: TransportType;
    owner!: User;
}
