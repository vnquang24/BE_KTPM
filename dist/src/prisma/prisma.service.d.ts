import { type OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
export declare class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, "query" | "error" | "info" | "warn"> implements OnModuleInit {
    private configService?;
    private readonly logger;
    private readonly isDevelopment;
    constructor(configService?: ConfigService | undefined);
    onModuleInit(): Promise<void>;
    private formatSql;
}
