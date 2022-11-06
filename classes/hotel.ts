import { User } from "./user";

export class Hotel {
    id!: number;
    name!: string;
    town!: string;
    latitude!: number;
    longitude!: number;
    rating!: number;
    imageUrl!: string;
    user!: User;
}
