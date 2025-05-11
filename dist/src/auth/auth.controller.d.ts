import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        message: string;
        user: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: Date | null;
            username: string;
            phone: string | null;
            email: string | null;
            dateOfBirth: Date | null;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: Date | null;
            username: string;
            phone: string | null;
            email: string | null;
            dateOfBirth: Date | null;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
}
