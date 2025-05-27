"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@zenstackhq/server/nestjs");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const crud_1 = require("./middleware/crud");
const common_1 = require("@nestjs/common");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(crud_1.CrudMiddleware).forRoutes("/models");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            nestjs_1.ZenStackModule.registerAsync({
                useFactory: (request, prisma) => {
                    return {
                        getEnhancedPrisma: () => prisma,
                    };
                },
                inject: [core_1.REQUEST, prisma_service_1.PrismaService],
                extraProviders: [prisma_service_1.PrismaService],
                global: true,
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map