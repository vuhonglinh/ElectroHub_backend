import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepostory: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepostory.create(createUserDto);
      await this.userRepostory.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.userRepostory.find({ relations: ['posts'] });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepostory.findOne({ where: { id }, relations: ['posts'] });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userRepostory.update(id, updateUserDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.userRepostory.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
