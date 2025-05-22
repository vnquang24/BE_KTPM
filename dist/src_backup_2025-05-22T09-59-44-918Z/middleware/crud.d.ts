import { NestMiddleware } from "@nestjs/common";
import type { Request, Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
export declare class CrudMiddleware implements NestMiddleware {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    use(req: Request, _res: Response, next: (error?: any) => void): Promise<void>;
}
