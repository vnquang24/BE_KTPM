"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async register(dto) {
        try {
            const existingUser = await this.prisma.account.findUnique({
                where: {
                    username: dto.username,
                    deleted: null
                }
            });
            if (existingUser) {
                throw new common_1.UnauthorizedException('Username đã được sử dụng');
            }
            if (dto.phone) {
                const existingPhone = await this.prisma.account.findUnique({
                    where: {
                        phone: dto.phone,
                        deleted: null
                    }
                });
                if (existingPhone) {
                    throw new common_1.UnauthorizedException('Số điện thoại đã được sử dụng');
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
                    throw new common_1.UnauthorizedException('Email đã được sử dụng');
                }
            }
            const saltRounds = parseInt(this.configService.get('BCRYPT_SALT_ROUNDS') || '10', 10);
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
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            if (error.code === 'P2002') {
                throw new common_1.UnauthorizedException('Username, email hoặc số điện thoại đã được sử dụng');
            }
            throw new Error('Đã xảy ra lỗi khi đăng ký: ' + error.message);
        }
    }
    async login(dto) {
        const user = await this.prisma.account.findUnique({
            where: {
                username: dto.username,
                deleted: null
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Tài khoản không tồn tại');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Mật khẩu không đúng');
        }
        const { password, ...userWithoutPassword } = user;
        return {
            message: 'Đăng nhập thành công',
            user: userWithoutPassword,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map