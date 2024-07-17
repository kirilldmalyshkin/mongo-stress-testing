import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../Items';
import { CommandsModule } from '../Commands';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri'),
      }),
      inject: [ConfigService],
    }),
    ItemsModule,
    CommandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
