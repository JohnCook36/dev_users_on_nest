import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Pushkin' })
  @IsString()
  readonly firstName: string;
  @ApiProperty({ example: 'Katovushkin' })
  @IsString()
  readonly lastName: string;
  @ApiProperty({ example: 18 })
  @IsInt()
  readonly age: number;
}
