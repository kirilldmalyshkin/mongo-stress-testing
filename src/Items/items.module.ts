import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemSchema } from './item.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
  providers: [ItemsService],
  exports: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
