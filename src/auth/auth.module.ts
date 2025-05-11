import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from "../prisma/prisma.service";
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService, 
  ],
  exports: [AuthService],
})
export class AuthModule {}