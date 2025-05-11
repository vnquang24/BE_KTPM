import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(userId: string): Promise<UserDto> {
        const userData = await this.prisma.account.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                phone: true,
                dateOfBirth: true,
                createdAt: true,
                updatedAt: true,
            },
            
        });
    
        if (!userData) {
            throw new Error('User not found');
        }
    
        return {
            ...userData,
            name: userData.username,
            email: userData.email || '', // Đảm bảo email không bao giờ là null
            phone: userData.phone || '', // Đảm bảo phone không bao giờ là null
            dateOfBirth: userData.dateOfBirth || null,
        };
    }
    async findAll(): Promise<UserDto[]> {
        const users = await this.prisma.account.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                phone: true,
                dateOfBirth: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        
        return users.map(user => ({
            ...user,
            name: user.username,
            email: user.email || '',
            phone: user.phone || '',
        }));
    }
}
