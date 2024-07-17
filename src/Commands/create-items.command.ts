import { Command, CommandRunner } from 'nest-commander';
import { ItemsService } from '../Items';
import { Logger } from '@nestjs/common';
import { generateRandomString } from '../utils';
import { BULK_CREATE_COMMAND } from './constants';

@Command({ name: BULK_CREATE_COMMAND })
export class BulkCreateCommand extends CommandRunner {
  private readonly logger: Logger = new Logger(BulkCreateCommand.name);
  constructor(private readonly itemsService: ItemsService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const totalDocuments = 10000000;
    const batchSize = 1000;

    this.logger.log(
      `Starting to create ${totalDocuments} documents in batches of ${batchSize}`,
    );

    for (let i = 0; i < totalDocuments; i += batchSize) {
      const documents = [];
      for (let j = 0; j < batchSize && i + j < totalDocuments; j++) {
        documents.push({ name: generateRandomString(10) });
      }
      await this.itemsService.createBulk(documents);
      this.logger.log(
        `Inserted batch of ${documents.length} documents. Total inserted: ${
          i + batchSize
        }`,
      );
    }

    this.logger.log(`Successfully created ${totalDocuments} documents.`);
  }
}
