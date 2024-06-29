import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfig } from 'src/interfaces/IConfig';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IConfig>) => ({
        uri: configService.get<string>('MONGODB_CONNECTION_STRING'),
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
