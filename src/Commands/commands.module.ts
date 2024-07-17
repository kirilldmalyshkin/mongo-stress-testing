import { Module } from '@nestjs/common';
import { ItemsModule } from '../Items';
import { BulkCreateCommand } from './create-items.command';
import { CreateIndexAndTestCommand } from './create-index-and-test.command';
import { RemoveIndexAndTestCommand } from './remove-index-and-test.command';

@Module({
  imports: [ItemsModule],
  providers: [
    BulkCreateCommand,
    CreateIndexAndTestCommand,
    RemoveIndexAndTestCommand,
  ],
})
export class CommandsModule {}
