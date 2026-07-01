import { Users } from "../Authentication/Users.model";
import { Faculty } from "../Faculty/Faculty.model";
import { Level } from "../Faculty/Level.model";

export class Student {
    studentid? : number;

    first_name!:string;
    last_name!:string;

    age?: number;
    email?:string;
    phone?:string;
    address?:string;

    faculty! : Faculty;
    level! : Level;

    user?: Users;
    
    studentcode?: string;
}