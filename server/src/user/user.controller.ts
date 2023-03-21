import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users from this api' })
  @ApiResponse({ status: 200, description: 'Get all users', type: [User] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(`:id`)
  @ApiOperation({ summary: 'Get one user from this api' })
  @ApiResponse({ status: 200, description: 'Get user by id', type: User })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }
  @Post()
  @ApiOperation({ summary: 'Create new user from this api' })
  @ApiResponse({ status: 201, description: 'Create user', type: User })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update user from this api' })
  @ApiResponse({ status: 200, description: 'Update user', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user from this api' })
  @ApiResponse({ status: 200, description: 'Delete user' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id') id: number): Promise<void> {
    return await this.userService.remove(id);
  }
}
