import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import mongoose, { ObjectId, SchemaTypes, Types  } from 'mongoose';

@Schema()
export class Product {

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
 
  @Prop()
  image: string;


}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
