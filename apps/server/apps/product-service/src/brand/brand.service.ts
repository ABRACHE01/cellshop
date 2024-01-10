import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    return await this.brandRepository.save(createBrandDto);
  }


  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: string) {
    return this.brandRepository.findOne({ where: { id , isDeleted: false } });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.brandRepository.update(id, updateBrandDto);
    return this.brandRepository.findOne({ where: { id , isDeleted: false } });
  }

  async delete(id: string): Promise<void> {
    await this.brandRepository.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    const brand = await this.brandRepository.findOne({ where: { id ,  isDeleted: false } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    brand.isDeleted = true;  
    await this.brandRepository.save(brand);
  }

}
