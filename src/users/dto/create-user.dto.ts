import { IsString, MinLength, MaxLength, IsDate } from 'class-validator';
export class CreateUserDto {

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastname: string;

  
  @IsDate()
  birthDate: Date;

   @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

   @IsString()
  @MinLength(6)
  password: string;
}
