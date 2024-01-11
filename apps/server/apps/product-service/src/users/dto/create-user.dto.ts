import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({ message: 'name is required' })
  @IsString()
    fullName: string;
}