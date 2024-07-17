import { execSync } from 'node:child_process';
import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { ItemsService } from '../Items';
import { TEST_WITH_INDEX_COMMAND } from './constants';

@Command({ name: TEST_WITH_INDEX_COMMAND })
export class CreateIndexAndTestCommand extends CommandRunner {
  private readonly logger = new Logger(CreateIndexAndTestCommand.name);

  constructor(private readonly itemsService: ItemsService) {
    super();
  }

  async run(): Promise<void> {
    this.logger.log('Fetching a random existing name');
    await this.itemsService.createIndex('name');

    const randomName = await this.itemsService.getRandomName();
    if (!randomName) {
      this.logger.error('No random name found in the database');
      return;
    }
    this.logger.log(`Random name found: ${randomName}`);

    this.logger.log('Running stress test');
    try {
      const result = execSync(
        `npx autocannon -c 30 -d 120 -p 1 --timeout 120 http://localhost:3000/items/${randomName}`,
        { encoding: 'utf-8' },
      );
      this.logger.log(result);
    } catch (error) {
      this.logger.error('Error during stress test with index', error);
    }
    this.logger.log('stress test with index completed');
  }
}
