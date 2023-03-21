import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Pushkin' })
  readonly firstName: string;
  @ApiProperty({ example: 'Katovushkin' })
  readonly lastName: string;
  @ApiProperty({ example: 18 })
  readonly age: number;
}
