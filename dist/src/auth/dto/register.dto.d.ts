import { Role } from '@prisma/client';
export declare class RegisterDto {
    username: string;
    password: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    role: Role;
}
