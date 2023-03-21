import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Pushkin' })
  firstName: string;
  @ApiProperty({ example: 'Kalatuskin' })
  lastName: string;
  @ApiProperty({ example: 14 })
  age: number;
}
