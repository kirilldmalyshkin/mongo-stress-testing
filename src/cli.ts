import { CommandFactory } from 'nest-commander';
import { AppModule } from './App';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('NestCommander');
  const appContext = await CommandFactory.run(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  logger.debug('CommandFactory initialized');
  await CommandFactory.run(AppModule);
}

void bootstrap();
