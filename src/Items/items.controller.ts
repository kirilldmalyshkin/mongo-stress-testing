import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<Item | null> {
    return this.itemsService.findByName(name);
  }
}
