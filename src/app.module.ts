import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { APP_GUARD, REQUEST } from "@nestjs/core";
import { ZenStackModule } from '@zenstackhq/server/nestjs';
import { enhance } from '@zenstackhq/runtime';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CrudMiddleware } from "./middleware/crud";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import type { Request } from "express";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    AuthModule,
    UsersModule,
    ZenStackModule.registerAsync({
      useFactory: (request: Request, prisma: PrismaService) => {
        console.log('=== Prisma Direct Access ===');
        console.log('Bỏ qua bảo mật - truy cập trực tiếp vào Prisma client');
        console.log('============================');
        return {
          // Trả về Prisma client trực tiếp không qua enhance
          getEnhancedPrisma: () => prisma,
        };
      },
      inject: [REQUEST, PrismaService],
      extraProviders: [PrismaService],
      global: true,
    })
  ],
  controllers: [AppController],
  providers: [PrismaService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CrudMiddleware).forRoutes("/models");
  }
}