import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.interface';
import { LogExecutionTime } from '../utils';
import { MODEL_NAME } from './constants';

@Injectable()
export class ItemsService {
  private readonly logger: Logger = new Logger(ItemsService.name);

  constructor(@InjectModel(MODEL_NAME) private itemModel: Model<Item>) {}

  @LogExecutionTime()
  async findByName(name: string): Promise<Item | null> {
    try {
      return await this.itemModel.findOne({ name }).exec();
    } catch (error) {
      this.logger.error(`Error finding item by name::${name}`, error.stack);
      throw error;
    }
  }

  @LogExecutionTime()
  async createBulk(documents: { name: string }[]): Promise<void> {
    try {
      await this.itemModel.insertMany(documents);
    } catch (error) {
      this.logger.error('Error creating bulk items', error.stack);
      throw error;
    }
  }

  @LogExecutionTime()
  async createIndex(field: string): Promise<void> {
    try {
      await this.itemModel.collection.createIndex({ [field]: 1 });
      this.logger.debug(`Index on field ${field} created`);
    } catch (error) {
      this.logger.error('Error creating index', error.stack);
      throw error;
    }
  }

  @LogExecutionTime()
  async removeIndex(field: string): Promise<void> {
    try {
      await this.itemModel.collection.dropIndex(`${field}_1`);
      this.logger.debug(`Index on field ${field} removed`);
    } catch (error) {
      if (error.code === 27) {
        this.logger.warn(`Index on field ${field} does not exist`);
      } else {
        this.logger.error('Error removing index', error.stack);
        throw error;
      }
    }
  }

  @LogExecutionTime()
  async getRandomName(): Promise<string> {
    const count = await this.itemModel.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomItem = await this.itemModel.findOne().skip(random).exec();
    return randomItem ? randomItem.name : null;
  }
}
