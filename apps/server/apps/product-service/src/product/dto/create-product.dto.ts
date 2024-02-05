import { Brand } from '../../brand/entities/brand.entity';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'name is required' })
  @MaxLength(255)
  name: string;

  @IsNumber()
  price: number;

  @MaxLength(1000)
  description: string;
  
}
