import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const uploadDir = './uploads';
  const app = await NestFactory.create(AppModule);
  fs.mkdirSync(uploadDir, { recursive: true });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true//Tất cả các thuộc tính khác sẽ bị loại bỏ
  }));

  app.enableCors({
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,//Check CORS
    credentials: true
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
