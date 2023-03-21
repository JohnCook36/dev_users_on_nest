import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users', type: [User] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Get(`:id`)
  @ApiResponse({ status: 200, description: 'Get user by id', type: User })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getOne(@Param('id') id: number): Promise<User> {
    const userId = await this.userService.findOne(id);
    console.log(userId);
    if (userId === undefined || null) {
      throw new HttpException(
        `User with id = ${id} not exists`,
        HttpStatus.NOT_FOUND,
      );
    }
    return userId;
  }

  @ApiBody({ type: CreateUserDto })
  @Post()
  @ApiResponse({ status: 201, description: 'Create user', type: User })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Update user', type: User })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete user' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.userService.remove(id);
    } catch (e) {
      console.log(e);
    }
  }
}
