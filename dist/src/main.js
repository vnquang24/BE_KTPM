"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_api_reference_1 = require("@scalar/nestjs-api-reference");
const app_module_1 = require("./app.module");
const http_1 = require("./middleware/http");
const dotenv = require("dotenv");
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    dotenv.config();
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new http_1.HttpExceptionFilter());
    app.enableShutdownHooks();
    app.setGlobalPrefix("api");
    const config = new swagger_1.DocumentBuilder()
        .setTitle("KTPM API Documentation")
        .setDescription("API Documentation for KTPM project")
        .setVersion("1.0")
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Authentication', 'API liên quan đến xác thực và quản lý thiết bị')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    (0, fs_1.writeFileSync)('./openapi-spec.json', JSON.stringify(document, null, 2));
    const cleanDocument = JSON.parse(JSON.stringify(document));
    app.use('/api-docs-json', (req, res) => {
        res.json(cleanDocument);
    });
    swagger_1.SwaggerModule.setup('docs/swagger', app, cleanDocument, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });
    app.use('/docs', (0, nestjs_api_reference_1.apiReference)({
        spec: { content: cleanDocument },
        title: 'CHCN API Documentation',
        description: 'Modern API Documentation',
        theme: 'dark',
    }));
    try {
        const generatedOpenApiDocument = JSON.parse((0, fs_1.readFileSync)("./generated-openapi.json", "utf8"));
        app.use('/docs/generated', (0, nestjs_api_reference_1.apiReference)({
            spec: { content: generatedOpenApiDocument },
            title: 'Generated API Documentation',
            description: 'Auto-generated API Documentation',
            theme: 'dark',
        }));
    }
    catch (error) {
        console.log('No generated OpenAPI document found');
    }
    const port = process.env.PORT || 8000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Swagger documentation: ${await app.getUrl()}/docs/swagger`);
    console.log(`Scalar API Reference: ${await app.getUrl()}/docs`);
    console.log(`OpenAPI JSON: ${await app.getUrl()}/api-docs-json`);
}
bootstrap();
//# sourceMappingURL=main.js.map