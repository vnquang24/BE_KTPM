import { readFileSync, writeFileSync } from "fs";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from './middleware/http';
import * as dotenv from 'dotenv';

// Hỗ trợ BigInt trong JSON
// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap() {
  // Tạo NestJS application
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  
  // Cấu hình cơ bản
  app.enableCors({
    origin: 'https://ktpm-fe-k7zv.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();
  app.setGlobalPrefix("api"); // Thêm tiền tố 'api' cho tất cả routes

  // Cấu hình OpenAPI chính thức
  const config = new DocumentBuilder()
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
  
  // Tạo document OpenAPI từ các decorators
  const document = SwaggerModule.createDocument(app, config);
  
  // Lưu file OpenAPI (có thể dùng cho các công cụ khác)
  writeFileSync('./openapi-spec.json', JSON.stringify(document, null, 2));
  
  // Tạo phiên bản sạch không có tham chiếu vòng tròn
  const cleanDocument = JSON.parse(JSON.stringify(document));
  
  app.use('/api-docs-json', (req, res) => {
    res.json(cleanDocument);
  });
  
  SwaggerModule.setup('docs/swagger', app, cleanDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  
  app.use(
    '/docs',
    apiReference({ 
      spec: { content: cleanDocument },
      title: 'CHCN API Documentation',
      description: 'Modern API Documentation',
      theme: 'dark',
    })
  );
  
  // Nếu có thêm tài liệu API tự động tạo
  try {
    // Thử đọc file nếu có
    const generatedOpenApiDocument = JSON.parse(
      readFileSync("./generated-openapi.json", "utf8")
    );
    
    // Cung cấp tài liệu tự động tạo ở một đường dẫn khác
    app.use(
      '/docs/generated',
      apiReference({ 
        spec: { content: generatedOpenApiDocument },
        title: 'Generated API Documentation',
        description: 'Auto-generated API Documentation',
        theme: 'dark',
      })
    );
  } catch (error) {
    console.log('No generated OpenAPI document found');
  }
  
  // Khởi động server
  const port = 8000;
  await app.listen(port);
  
  // Log thông tin
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation: ${await app.getUrl()}/docs/swagger`);
  console.log(`Scalar API Reference: ${await app.getUrl()}/docs`);
  console.log(`OpenAPI JSON: ${await app.getUrl()}/api-docs-json`);
}

bootstrap();