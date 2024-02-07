import { IsNotEmpty, IsNumber, IsUrl, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'name is required' })
  @MaxLength(255)
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsUrl({}, { message: 'image must be a valid URL' })
  image: string;
}
