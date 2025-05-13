import { IsString, MinLength, MaxLength, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'mohammad' })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstname: string;
@ApiProperty({ example: 'tadayon' })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastname: string;

  @ApiProperty({ example: '1995/10/29' })
  @IsDate()
  birthDate: Date;
@ApiProperty({ example: 'mhd_tedi' })
   @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;
@ApiProperty({ example: 'Mohammad...123456' })
   @IsString()
  @MinLength(6)
  password: string;
}
export class FindAllDto {
    @ApiProperty({ example: 'id1...' })
  Id: number;
}
