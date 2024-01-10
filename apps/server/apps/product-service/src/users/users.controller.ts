import { Controller, Get, Post, Body , Param, Delete, ValidationPipe, UsePipes, HttpCode, Res, NotFoundException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Res() res:Response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return res.json({
      message: 'user has been submitted successfully!',
      User: newUser,
    });
  }

  @Get()
  @HttpCode(200)
  async getAllUsers(@Res() res:Response) {
    const users = await this.usersService.findAll();
    return res.json({
      message: 'All users',
      users: users,
    });
  }

  @Get(':userId')
  @HttpCode(200)
  async findOneUser(
    @Res() res:Response,
    @Param('userId') userId: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return res.json({
      message: 'user details',
      user: user,
    });
  }

  @Put(':userId')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async updateUser(
    @Res() res:Response,
    @Param('userId') userId : string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const updatedUser = await this.usersService.update(
      userId,
      updateUserDto,
    );
    if (!updatedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.json({
      message: 'user has been successfully updated',
      User: updatedUser,
    });
  }

  @Delete(':userId')
  @HttpCode(200)
  async delete(
    @Res() res:Response,
    @Param('userId') userId: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    await this.usersService.softDelete(userId);
    return res.json({
      message: 'User has been trashed successfully',
      user: user,
    });
  }

}
