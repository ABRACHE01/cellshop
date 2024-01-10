import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { DatabaseConfig } from './config/database.config';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),

    ProductModule,

    BrandModule,

    UsersModule,
  ],
})
export class ProductServiceModule {}
