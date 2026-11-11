import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = Number(config.get<string>('PORT') ?? '3000');

  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(port);
  console.log(`Application running on http://localhost:${port}`);
}
await bootstrap();
