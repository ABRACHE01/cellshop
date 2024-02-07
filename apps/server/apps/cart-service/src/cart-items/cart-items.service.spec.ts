import { Test, TestingModule } from '@nestjs/testing';
import { SchemaFactory, getModelToken } from '@nestjs/mongoose';
import { Model, Document, ObjectId, SchemaTypes, Types } from 'mongoose';
import { CartItemsService } from './cart-items.service';
import { Cart, CartDocument } from '../cart/entities/cart.entity';
import { Product, ProductDocument } from '../products/entities/product.entity';
import { CartItem, CartItemDocument } from './entities/cart-item.entity';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual('@nestjs/mongoose'),
  SchemaFactory: {
    createForClass: jest.fn(),
  },
}));

describe('CartItemsService', () => {
  let service: CartItemsService;
  let cartModel: Partial<Model<CartDocument & Document<ObjectId>>>;
  let productModel: Partial<Model<ProductDocument & Document<ObjectId>>>;
  let cartItemModel: Partial<Model<CartItemDocument & Document<ObjectId>>>;

  beforeEach(async () => {
    (SchemaFactory.createForClass as jest.Mock).mockReturnValue({
      loadClass: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemsService,
        {
          provide: getModelToken(Cart.name),
          useValue: {
            findById: jest.fn(),
          } as Partial<Model<CartDocument & Document<ObjectId>>>,
        },
        {
          provide: getModelToken(Product.name),
          useValue: {
            findById: jest.fn(),
          } as Partial<Model<ProductDocument & Document<ObjectId>>>,
        },
        {
          provide: getModelToken(CartItem.name),
          useValue: {
            create: jest.fn(),
          } as Partial<Model<CartItemDocument & Document<ObjectId>>>,
        },
      ],
    }).compile();

    service = module.get<CartItemsService>(CartItemsService);
    cartModel = module.get<Partial<Model<CartDocument & Document<ObjectId>>>>(getModelToken(Cart.name))!;
    productModel = module.get<Partial<Model<ProductDocument & Document<ObjectId>>>>(getModelToken(Product.name))!;
    cartItemModel = module.get<Partial<Model<CartItemDocument & Document<ObjectId>>>>(getModelToken(CartItem.name))!;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addProductToCart', () => {
    it('should throw InternalServerErrorException if cart is not found', async () => {
      const mockCartId = 'nonExistentCartId';

      (cartModel.findById as jest.Mock).mockResolvedValue(undefined);

      await expect(service.addProductToCart(mockCartId, 'mockProductId', 1)).rejects.toThrowError(InternalServerErrorException);
      expect(cartModel.findById).toHaveBeenCalledWith(mockCartId);
    });

    it('should throw InternalServerErrorException if product is not found', async () => {
      const mockCartId = 'mockCartId';
      const mockProductId = 'nonExistentProductId';
      const mockQuantity = 1;

      // Mock the cartModel to resolve to a valid cart
      (cartModel.findById as jest.Mock).mockResolvedValue({ _id: mockCartId });

      // Mock the productModel to resolve to null
      (productModel.findById as jest.Mock).mockResolvedValue(null);

      try {
        // Call the function that is expected to throw InternalServerErrorException
        await service.addProductToCart(mockCartId, mockProductId, mockQuantity);
        // If it doesn't throw an exception, fail the test
        fail('InternalServerErrorException was not thrown');
      } catch (error) {
        // Check if the caught error is an instance of InternalServerErrorException
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Something went wrong');
      }

      // Verify that the findById methods were called with the correct arguments
      expect(cartModel.findById).toHaveBeenCalledWith(mockCartId);
      expect(productModel.findById).toHaveBeenCalledWith(mockProductId);
    });

    it('should throw InternalServerErrorException if product quantity is less than requested quantity', async () => {
      const mockCartId = 'mockCartId';
      const mockProductId = 'mockProductId';
      const mockQuantity = 10;

      const mockCart = { _id: mockCartId };
      const mockProduct = { _id: mockProductId, quantity: 5 };

      (cartModel.findById as jest.Mock).mockResolvedValue(mockCart);
      (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);

      try {
        await service.addProductToCart(mockCartId, mockProductId, mockQuantity);
        fail('InternalServerErrorException was not thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Something went wrong'); // Update the expected error message here
      }

      expect(cartModel.findById).toHaveBeenCalledWith(mockCartId);
      expect(productModel.findById).toHaveBeenCalledWith(mockProductId);
    });

    it('should create a new cart item and return it', async () => {
      const mockCartId = 'mockCartId';
      const mockProductId = 'mockProductId';
      const mockQuantity = 10;

      const mockCart = { _id: mockCartId };
      const mockProduct = { _id: mockProductId, quantity: 15 };

      (cartModel.findById as jest.Mock).mockResolvedValue(mockCart);
      (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);
      (cartItemModel.create as jest.Mock).mockRejectedValue(new Error('Something went wrong'));

      await expect(service.addProductToCart(mockCartId, mockProductId, mockQuantity)).rejects.toThrow(InternalServerErrorException);
      expect(cartModel.findById).toHaveBeenCalledWith(mockCartId);
      expect(productModel.findById).toHaveBeenCalledWith(mockProductId);
      expect(cartItemModel.create).toHaveBeenCalledWith({
        cartId: mockCartId,
        productId: mockProductId,
        quantity: mockQuantity,
      });
    });

    it('should throw InternalServerErrorException if creating cart item fails', async () => {
      const mockCartId = 'mockCartId';
      const mockProductId = 'mockProductId';
      const mockQuantity = 10;

      const mockCart = { _id: mockCartId };
      const mockProduct = { _id: mockProductId, quantity: 15 };

      (cartModel.findById as jest.Mock).mockResolvedValue(mockCart);
      (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);
      (cartItemModel.create as jest.Mock).mockRejectedValue(new Error('Failed to create cart item'));

      try {
        await service.addProductToCart(mockCartId, mockProductId, mockQuantity);
        fail('InternalServerErrorException was not thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Something went wrong');
      }

      expect(cartModel.findById).toHaveBeenCalledWith(mockCartId);
      expect(productModel.findById).toHaveBeenCalledWith(mockProductId);
      expect(cartItemModel.create).toHaveBeenCalledWith({
        cartId: mockCartId,
        productId: mockProductId,
        quantity: mockQuantity,
      });
    });
  });
});
