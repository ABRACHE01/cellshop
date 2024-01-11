import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id, isDeleted: false } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id, isDeleted: false } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isDeleted = true;
    await this.userRepository.save(user);
  }


}
