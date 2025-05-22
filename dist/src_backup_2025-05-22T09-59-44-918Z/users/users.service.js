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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(userId) {
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
            email: userData.email || '',
            phone: userData.phone || '',
            dateOfBirth: userData.dateOfBirth || null,
        };
    }
    async findAll() {
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map