import { Injectable, type OnModuleInit, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import * as chalk from "chalk";

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, "query" | "error" | "info" | "warn">
    implements OnModuleInit
{
    private readonly logger = new Logger(PrismaService.name);
    private readonly isDevelopment: boolean;

    constructor(private configService?: ConfigService) {
        super({
            log: [
                {
                    emit: "event",
                    level: "query",
                },
                {
                    emit: "event", // Thay đổi từ "stdout" thành "event"
                    level: "error",
                },
                {
                    emit: "event", // Thay đổi từ "stdout" thành "event"
                    level: "info",
                },
                {
                    emit: "event", // Thay đổi từ "stdout" thành "event" 
                    level: "warn",
                },
            ],
        });
        
        this.isDevelopment = 
            configService?.get<string>('NODE_ENV', 'development') === 'development';
    }

    async onModuleInit() {
        if (this.isDevelopment) {
            this.$on("query", (e) => {
                const executionTime = e.duration ? 
                    `${Math.round(e.duration)}ms` : 'N/A';
                
                const formattedQuery = this.formatSql(e.query);
                
                console.log('\n');
                console.log('----------------------------------------');
                console.log(`🔍 ${chalk.blue('PRISMA QUERY')}`);
                console.log(`⏱️  ${chalk.yellow(`Execution time: ${executionTime}`)}`);
                console.log('----------------------------------------');
                console.log(chalk.green(formattedQuery));
                
                if (e.params && e.params !== '[]') {
                    try {
                        const params = JSON.parse(e.params);
                        console.log('\n📝 ' + chalk.cyan('PARAMETERS:'));
                        console.table(params);
                    } catch (error) {
                        console.log('\n📝 ' + chalk.cyan('PARAMETERS:'), e.params);
                    }
                }
                console.log('----------------------------------------\n');
            });
        }

        this.$on("error", (e) => {
            this.logger.error(`❌ Database error: ${e.message}`, e.target);
        });
        
        this.$on("info", (e) => {
            this.logger.log(`ℹ️ ${e.message}`, e.target);
        });
        
        this.$on("warn", (e) => {
            this.logger.warn(`⚠️ ${e.message}`, e.target);
        });
        
        await this.$connect()
            .then(() => {
                this.logger.log('✅ Successfully connected to database');
            })
            .catch((error) => {
                this.logger.error(`❌ Failed to connect to database: ${error.message}`);
                throw error;
            });
    }
    
    private formatSql(sql: string): string {
        return sql
            .replace(/SELECT/g, '\nSELECT')
            .replace(/FROM/g, '\nFROM')
            .replace(/WHERE/g, '\nWHERE')
            .replace(/ORDER BY/g, '\nORDER BY')
            .replace(/GROUP BY/g, '\nGROUP BY')
            .replace(/HAVING/g, '\nHAVING')
            .replace(/INNER JOIN/g, '\nINNER JOIN')
            .replace(/LEFT JOIN/g, '\nLEFT JOIN')
            .replace(/RIGHT JOIN/g, '\nRIGHT JOIN')
            .replace(/LIMIT/g, '\nLIMIT')
            .replace(/OFFSET/g, '\nOFFSET')
            .replace(/AND/g, '\n  AND')
            .replace(/OR/g, '\n  OR');
    }
}