import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: Date | null;
            username: string;
            phone: string;
            email: string;
            dateOfBirth: Date | null;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        user: {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            deleted: Date | null;
            username: string;
            phone: string;
            email: string;
            dateOfBirth: Date | null;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
}
