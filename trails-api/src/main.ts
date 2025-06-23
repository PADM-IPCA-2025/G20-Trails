// src/main.ts
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3002;

  app.use(cookieParser());  
  app.use(
    session({
      secret: 'UMA_CHAVE_SECRETA_MUITO_FORTE', // em produção, usar env var
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,       // true apenas com HTTPS em produção
        httpOnly: true,      // impede JS do browser de ler o cookie
        maxAge: 24 * 60 * 60 * 1000, // 1 dia
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000', // endereço do React
    credentials: true,               // permite cookies cross-origin
  });

  await app.listen(port);
}
bootstrap();