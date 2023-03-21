import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (e) {
      console.log(e);
    }
  }
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with id = ${id} not exists`);
    }
    return user;
  }

  async create(userDto: CreateUserDto) {
    try {
      const user = new User();
      user.firstName = userDto.firstName;
      user.lastName = userDto.lastName;
      user.age = userDto.age;

      return await this.usersRepository.save(user);
    } catch (e) {
      console.log(e);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      return this.usersRepository.update(id, updateUserDto);
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (e) {
      console.log(e);
    }
  }
}
