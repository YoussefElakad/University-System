import { Users } from "../Authentication/Users.model";

export class Doctor {
    doctorid? : number;

    first_name?:string;
    last_name?:string;
    age?: number;
    email?:string;
    phone?:string;
    address?:string;

    user?: Users;

    doctorcode?: string;
}