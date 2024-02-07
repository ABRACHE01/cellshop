import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem, CartItemDocument } from './entities/cart-item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../products/entities/product.entity';
import { Model, ObjectId, Types } from 'mongoose';
import { Cart, CartDocument } from '../cart/entities/cart.entity';

@Injectable()
export class CartItemsService {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(CartItem.name) private readonly cartItemModel: Model<CartItemDocument>,
  ) { }

  async addProductToCart(cartId: string, productId: string, quantity: number): Promise<CartItem> {
    try {
      const product = await this.productModel.findById(productId);
      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.quantity < quantity) {
        throw new BadRequestException('Invalid quantity');
      }

      const newCartItem = await this.cartItemModel.create({
        cartId: cart._id,
        productId: product._id,
        quantity: quantity
      });

      return newCartItem.toJSON();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getCartItemsByCartId(cartId: any): Promise<CartItem[]> {
    cartId = new Types.ObjectId(cartId);

    try {
      const cartItems = await this.cartItemModel
        .find({ cartId })
        .populate('productId', 'name price image')
        .exec();

      console.log('Fetched cart items:', cartItems);
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  }

  async updateProductQuantity(cartId: string, productId: string, quantity: number): Promise<CartItem> {
    console.log("cartid: ", cartId, "productId: ", productId, "quantity", quantity)
    try {
      const convertedCartId = new Types.ObjectId(cartId);
      const convertedProductId = new Types.ObjectId(productId);
  
      const cartItem = await this.cartItemModel.findOne({ cartId: convertedCartId, productId: convertedProductId });
      console.log("cartItem:", cartItem);
  
      if (!cartItem) {
        console.log(`Cart item not found for cartId: ${cartId}, productId: ${productId}`);
        throw new NotFoundException('Cart item not found');
      }
  
      console.log(cartItem);
      cartItem.quantity = quantity;
  
      const updatedCartItem = await cartItem.save();
  
      if (!updatedCartItem) {
        console.log('Failed to update cart item');
        throw new NotFoundException('Cart item not found after update');
      }
  
      return updatedCartItem;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update product quantity in cart');
    }
  }

  async deleteProductFromCart(cartId: string, productId: string): Promise<CartItem> {
    console.log(cartId, productId)
    const cartItem = await this.cartItemModel.findOneAndDelete({
      cartId: new Types.ObjectId(cartId),
      productId: new Types.ObjectId(productId),
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    return cartItem;
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
