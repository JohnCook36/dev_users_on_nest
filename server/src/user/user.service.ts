import { Injectable } from '@nestjs/common';
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
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  create(userDto: CreateUserDto) {
    const user = new User();
    user.firstName = userDto.firstname;
    user.lastName = userDto.lastname;
    user.age = userDto.age;

    return this.usersRepository.save(user);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
