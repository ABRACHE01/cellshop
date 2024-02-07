import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  NotFoundException,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Res() res: any, @Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productService.create(createProductDto);
    return res.json({
      message: 'Product has been submitted successfully!',
      product: newProduct,
    });
  }

  @Get()
  async getAll(@Res() res: any) {
    try {
      const products = await this.productService.getAll();
      return res.json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
