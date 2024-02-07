import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './products.service';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductController } from './products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService ],
  exports: [ProductService ],
  controllers : [ProductController]
})
export class ProductsModule {}
