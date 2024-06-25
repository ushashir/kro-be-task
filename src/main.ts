import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import basicAuth from "express-basic-auth";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const environment = configService.get("environment");
  const appPort = configService.get("app.port");
  const appHost = configService.get("app.host");
  const appHostname = configService.get("app.hostname");

  const swaggerUser = configService.get("swagger.users");
  if (swaggerUser) {
    app.use(
      ["/swagger", "/swagger-json"],
      basicAuth({
        challenge: true,
        users: swaggerUser,
      })
    );
  }

  const initSwagger = (app: INestApplication, serverUrl: string) => {
    const config = new DocumentBuilder()
      .setTitle("Kro backend Task API Documentation")
      .setDescription(
        "This task is done as part of recruitment process for Kro. This API documentation provides a detailed guide on how to interact with the RESTful API."
      )
      .setVersion("1.0")
      .addServer(serverUrl)
      .addBearerAuth()
      .addTag("Kro RESTful API Documentation")
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("/swagger", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  };
  // app.enableCors();
  const allowedOrigins = [
    /^(https:\/\/([^\.]*\.)?ngrok\.io)$/i,
    /^(https:\/\/([^\.]*\.)?amplifyapp\.com)$/i,
    "http://localhost:3000",
  ];
  const allowedOriginsProd = ["http://localhost:3000"];
  const origins =
    environment === "production" ? allowedOriginsProd : allowedOrigins;

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  if (environment !== "production") {
    initSwagger(app, appHost);
  }

  // Validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appPort, appHostname);
}
bootstrap();
