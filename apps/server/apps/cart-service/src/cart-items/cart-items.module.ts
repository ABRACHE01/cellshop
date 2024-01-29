import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartItem, CartItemSchema } from './entities/cart-item.entity';
import { Cart, CartSchema } from '../cart/entities/cart.entity'; // Import your Cart entity here
import { Product, ProductSchema } from '../products/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CartItem.name, schema: CartItemSchema },
      { name: Cart.name, schema: CartSchema }, 
      { name: Product.name, schema: ProductSchema }, 
    ]),
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}