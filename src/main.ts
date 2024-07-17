import { NestFactory } from '@nestjs/core';
import { AppModule } from './App';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  await app.listen(3000);
}
bootstrap();
