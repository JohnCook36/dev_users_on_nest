import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'Pushkin' })
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'Kalatuskin' })
  @IsString()
  lastName: string;
  @ApiProperty({ example: 14 })
  @IsInt()
  age: number;
}
