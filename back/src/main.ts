import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import {ValidationPipe} from "@nestjs/common";
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);  // Swagger API
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(session({
    cookie: {
      maxAge: 3600000 * 24
    },
    secret: "J'aime les hommes",
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();