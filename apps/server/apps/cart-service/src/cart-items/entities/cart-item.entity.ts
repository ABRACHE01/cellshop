import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import mongoose, { ObjectId, SchemaTypes, Types  } from 'mongoose';

@Schema()

export class CartItem {
  
  @Prop()
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Product' }) 
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Cart' }) 
  cartId: Types.ObjectId;
}

export type CartItemDocument = CartItem & Document;

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
