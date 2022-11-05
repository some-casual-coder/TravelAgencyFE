import { Amenity } from "./amenity";
import { Hotel } from "./hotel";

export class Room {
    id!: number;
    name!: string;
    capacity!: number;
    pricePerDay!: number;
    hotel!: Hotel;
    amenities!: Amenity[];
}
