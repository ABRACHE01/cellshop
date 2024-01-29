import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product, ProductSchema } from '../../products/entities/product.entity';
@Schema()
export class Cart {
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);