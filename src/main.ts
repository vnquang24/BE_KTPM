import { readFileSync, writeFileSync } from "fs";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from './middleware/http';
import * as dotenv from 'dotenv';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.enableCors();
  // app.enableCors({
  //   origin: process.env.FE_URL,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  //   allowedHeaders: 'Content-Type, Accept, Authorization',
  // });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();
  app.setGlobalPrefix("api"); // Thêm tiền tố 'api' cho tất cả routes

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
  
  const document = SwaggerModule.createDocument(app, config);
  
  writeFileSync('./openapi-spec.json', JSON.stringify(document, null, 2));
  
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
  
  try {
    const generatedOpenApiDocument = JSON.parse(
      readFileSync("./generated-openapi.json", "utf8")
    );
    
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
  }
  
  const port = 8000;
  await app.listen(port);
}

bootstrap();