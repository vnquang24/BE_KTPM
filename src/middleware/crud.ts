import { Injectable, NestMiddleware } from "@nestjs/common";
import { auth, enhance } from "@zenstackhq/runtime";
import { ZenStackMiddleware } from "@zenstackhq/server/express";
import type { Request, Response } from "express";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CrudMiddleware implements NestMiddleware {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async use(req: Request, _res: Response, next: (error?) => void) {
        console.log('\n📢 CrudMiddleware - Request path:', req.path);
        console.log('⚠️ BỎ QUA BẢO MẬT - Sử dụng Prisma trực tiếp');
        
        const inner = ZenStackMiddleware({
            getPrisma: () => {
                return this.prismaService;
            },
        });
        inner(req, _res, next);
    }
}