import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  
  async search(query: string): Promise<Product[]> {
    const descriptionResults = await this.productRepository.find({
      where: { description: ILike(`%${query}%`), isDeleted: false },
    });

    const nameResults = await this.productRepository.find({
      where: { name: ILike(`%${query}%`), isDeleted: false },
    });
    const combinedResults = [...descriptionResults , ...nameResults];
    return combinedResults;
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand', 'brand.isDeleted = :isBrandDeleted', { isBrandDeleted: false })
      .leftJoinAndSelect('product.addedBy', 'addedBy', 'addedBy.isDeleted = :isUserDeleted', { isUserDeleted: false })
      .select(['product', 'brand.name', 'addedBy.fullName'])
      .where('product.isDeleted = :isDeleted', { isDeleted: false })
      .getMany();
  }
  async findOne(id: string){
    return this.productRepository.findOne({ where: { id , isDeleted: false } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id , isDeleted: false } });
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id ,  isDeleted: false } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.isDeleted = true;  
    await this.productRepository.save(product);
  }
}
