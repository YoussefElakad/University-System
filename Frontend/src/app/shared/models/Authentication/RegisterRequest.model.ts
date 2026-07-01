export class RegisterRequest {
    role!: string;
    code!: string;

    first_name?:string;
    last_name?:string;
    age?: number | null;
    email?:string;
    address?:string;

    username!: string;
    password!: string;
}