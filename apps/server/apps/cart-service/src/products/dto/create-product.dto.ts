import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'name is required' })
  @MaxLength(255)
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
