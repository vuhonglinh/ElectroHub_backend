import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    try {
      const user = this.usersService.create(createUserDto);
      return response.status(201).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  @Get()
  findAll(@Res() response: Response) {
    try {
      const users = this.usersService.findAll();
      return response.status(201).json({
        message: 'Get users successfully',
        data: users,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const user = this.usersService.findOne(+id);
      return response.status(201).json({
        message: 'Get user successfully',
        data: user,
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() response: Response) {
    try {
      const user = this.usersService.update(+id, updateUserDto);
      return response.status(201).json({
        message: 'Update user successfully',
        data: user,
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    try {
      this.usersService.remove(+id);
      return response.status(201).json({
        message: 'Delete user successfully',
      });
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    };
  }
}
