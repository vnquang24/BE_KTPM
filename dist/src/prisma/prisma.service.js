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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_1 = require("@nestjs/config");
const chalk = require("chalk");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    configService;
    logger = new common_1.Logger(PrismaService_1.name);
    isDevelopment;
    constructor(configService) {
        super({
            log: [
                {
                    emit: "event",
                    level: "query",
                },
                {
                    emit: "event",
                    level: "error",
                },
                {
                    emit: "event",
                    level: "info",
                },
                {
                    emit: "event",
                    level: "warn",
                },
            ],
        });
        this.configService = configService;
        this.isDevelopment =
            configService?.get('NODE_ENV', 'development') === 'development';
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
                    }
                    catch (error) {
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
    formatSql(sql) {
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map