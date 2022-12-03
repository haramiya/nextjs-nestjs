import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // dtoに無駄なフィールドがあっても省いてくれる
  app.enableCors({
    credentials: true, // cookieベースでjwt生成するため
    origin: ['http://localhost:3000'],
  });
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
