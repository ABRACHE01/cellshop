import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  async addProductToCart(@Body() cartDto: { cartId: string; productId: string; quantity: number }) {
    const cart = await this.cartItemsService.addProductToCart(cartDto.cartId, cartDto.productId, cartDto.quantity);
    return { message: 'Product tzad to cart successfully', cart };
  }

  @Patch()
  async updateProductQuantity(@Body() updateDto: { cartId: string; productId: string; quantity: number }) {
    const { cartId, productId, quantity } = updateDto;
    const cartItem = await this.cartItemsService.updateProductQuantity(cartId, productId, quantity);
    return { message: 'Product quantity updated in cart successfully', cartItem };
  }

  @Delete(':cartId/:productId')
  async deleteProductFromCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ) {
    await this.cartItemsService.deleteProductFromCart(cartId, productId);
    return { message: 'The product has been successfully deleted from the shopping cart' };
  }

  // @Delete(':cartId/products/:productId')
  // async deleteProductFromCart(
  //   @Param('cartId') cartId: string,
  //   @Param('productId') productId: string,
  // ) {
  //   const cart = await this.cartItemsService.deleteProductFromCart(cartId, productId);
  //   return { message: 'Product deleted from cart successfully', cart };
  // }

  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
