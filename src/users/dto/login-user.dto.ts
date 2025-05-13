import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
   @ApiProperty({ example: 'user@example.com', description: ' User Email' })
  @IsString()
  username: string;

   @ApiProperty({ example: 'Mohammad...123456', description: 'User password'  })
  @IsString()
  password: string;
}
export class TokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;
}