import { Controller, Get, Post, Body ,Param, Delete, ValidationPipe, UsePipes, HttpCode, Res, NotFoundException, Put  } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Response } from 'express';

@Controller('api/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Res() res:Response, @Body() createBrandDto: CreateBrandDto) {
    const newBrand = await this.brandService.create(createBrandDto);
    return res.json({
      message: 'Brand has been submitted successfully!',
      Brand: newBrand,
    });
  }

  @Get()
  @HttpCode(200)
  async getAllBrands(@Res() res:Response) {
    const brands = await this.brandService.findAll();
    return res.json({
      message: 'All brands',
      brands: brands,
    });
  }

  @Get(':brandId')
  @HttpCode(200)
  async findOneBrand(
    @Res() res:Response,
    @Param('brandId') brandId: string,
  ): Promise<any> {
    const brand = await this.brandService.findOne(brandId);
    if (!brand) {
      throw new NotFoundException('brand does not exist!');
    }
    return res.json({
      message: 'brand details',
      brand: brand,
    });
  }

  @Put(':brandID')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updatebrand(
    @Res() res:Response,
    @Param('brandID') brandID:string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<any> {
    const updatedBrand = await this.brandService.update(
      brandID,
      updateBrandDto,
    );
    if (!updatedBrand) {
      throw new NotFoundException('brand does not exist!');
    }
    return res.json({
      message: 'brand has been successfully updated',
      brand: updatedBrand,
    });
  }

  @Delete(':brandId')
  @HttpCode(200)
  async delete(
    @Res() res:Response,
    @Param('brandId') brandId: string,
  ): Promise<any> {
    const brand = await this.brandService.findOne(brandId);

    if (!brand) {
      throw new NotFoundException('brand does not exist!');
    }
    await this.brandService.softDelete(brandId);
    return res.json({
      message: 'brand has been trashed successfully',
      brand: brand,
    });
  }
}
