import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import * as passport from "passport";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const localhostfront =
    "http://" + (process.env.LOCALHOST || "localhost") + ":5173";

  setupSwagger(app); // Swagger API
  app.enableCors({
    origin: localhostfront, // changez pour le port du front
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(
    session({
      cookie: {
        maxAge: 3600000 * 24,
      },
      secret: "J'aime les hommes",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Serve static files from the public/uploads directory (users's avatar)
  app.use("/uploads", express.static("public/uploads"));

  await app.listen(3000);
}
bootstrap();
