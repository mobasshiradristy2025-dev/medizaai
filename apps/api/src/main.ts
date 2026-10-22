import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("MedizaaiAPI");
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.setGlobalPrefix("api");

  // OpenAPI Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Medizaai API")
    .setDescription("Medizaai Healthcare Services Platform API Specification")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`Medizaai API server is running on http://localhost:${port}/api`);
  logger.log(`Swagger OpenAPI documentation available at http://localhost:${port}/docs`);
}

bootstrap();
