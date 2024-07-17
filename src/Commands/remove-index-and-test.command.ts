import { Command, CommandRunner } from 'nest-commander';
import { ItemsService } from '../Items';
import { Logger } from '@nestjs/common';
import { execSync } from 'node:child_process';
import { TEST_WITHOUT_INDEX_COMMAND } from './constants';

@Command({ name: TEST_WITHOUT_INDEX_COMMAND })
export class RemoveIndexAndTestCommand extends CommandRunner {
  private readonly logger = new Logger(RemoveIndexAndTestCommand.name);

  constructor(private readonly itemsService: ItemsService) {
    super();
  }

  async run(): Promise<void> {
    this.logger.log('Fetching a random existing name');
    const randomName = await this.itemsService.getRandomName();
    if (!randomName) {
      this.logger.error('No random name found in the database');
      return;
    }
    this.logger.log(`Random name found: ${randomName}`);

    await this.itemsService.removeIndex('name');
    this.logger.log('Running stress test');
    try {
      const result = execSync(
        `npx autocannon -c 30 -d 120 -p 1 --timeout 120 http://localhost:3000/items/${randomName}`,
        { encoding: 'utf-8' },
      );
      this.logger.log(result);
    } catch (error) {
      this.logger.error('Error during stress test without index', error);
    }
    this.logger.log('stress test without index completed');
  }
}
