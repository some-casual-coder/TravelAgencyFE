import { Hotel } from "./hotel";
import { Room } from "./room";
import { Transport } from "./transport";

export class Image {
    id!: number;
    imageUrl!: string;
    transport!: Transport;
    hotel!: Hotel; //hotel_id if it fails
    room!: Room;
}
