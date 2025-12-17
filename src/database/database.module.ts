import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { createKnexConfig } from './database.config';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          config: createKnexConfig(configService),
        };
      },
    }),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
