import { Role } from "./role";

export class User {
    id:number | undefined;
    firstName:string | undefined;
    lastName:string | undefined;
    email:string | undefined;
    verified:boolean | undefined;
    roles:Role[] | undefined;
}
