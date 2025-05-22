import { Injectable, ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) {}
    
    async register(dto: RegisterDto) {
        try {
            const existingUser = await this.prisma.account.findUnique({
                where: { 
                    username: dto.username,
                    deleted: null
                }
            });

            if (existingUser) {
                throw new UnauthorizedException('Username đã được sử dụng');
            }

            if (dto.phone) {
                const existingPhone = await this.prisma.account.findUnique({
                    where: { 
                        phone: dto.phone,
                        deleted: null
                    }
                });

                if (existingPhone) {
                    throw new UnauthorizedException('Số điện thoại đã được sử dụng');
                }
            }

            if (dto.email) {
                const existingEmail = await this.prisma.account.findUnique({
                    where: { 
                        email: dto.email,
                        deleted: null
                    }
                });

                if (existingEmail) {
                    throw new UnauthorizedException('Email đã được sử dụng');
                }
            }

            const saltRounds = parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS') || '10', 10);
            const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

            const user = await this.prisma.account.create({
                data: {
                    username: dto.username,
                    password: hashedPassword,
                    phone: dto.phone,
                    email: dto.email,
                    dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
                    role: dto.role,
                }
            });

            const { password, ...userWithoutPassword } = user;
            return {
                message: 'Đăng ký tài khoản thành công',
                user: userWithoutPassword,
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error; // Rethrow nếu là lỗi đã xử lý
            }

            if (error.code === 'P2002') {
                throw new UnauthorizedException('Username, email hoặc số điện thoại đã được sử dụng');
            }

            throw new Error('Đã xảy ra lỗi khi đăng ký: ' + error.message);
        }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.account.findUnique({
            where: { 
                username: dto.username,
                deleted: null
            }
        });

        if (!user) {
            throw new UnauthorizedException('Tài khoản không tồn tại');
        }


        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Mật khẩu không đúng');
        }

        const { password, ...userWithoutPassword } = user;
        return {
            message: 'Đăng nhập thành công',
            user: userWithoutPassword,
        };
    }
}