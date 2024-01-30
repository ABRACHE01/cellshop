import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';
@Module({

  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/cart-service/.env',
      isGlobal: true,
      expandVariables: true, // Log all variables
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
    ProductsModule,
    CartModule,
    CartItemsModule,
  ],
})
export class CartServiceModule {}
