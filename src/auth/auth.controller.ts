import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, TokenResponseDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto, FindAllDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @ApiBody({ type: CreateUserDto })
  @Post('register')
  @ApiOperation({ summary: ' register' })
  @ApiResponse({
    status: 201,
    description: 'Registered ',
      schema: {
    example: {
      message: 'registered'
    }
  }
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
    @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'logged in Success & Token Resived',
    type: TokenResponseDto,
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
    @Get('google')
    @ApiOperation({ summary: 'User Login with Google' })
    @ApiResponse({
    status: 302,
    description: 'google page',
    type: TokenResponseDto,
  })
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
   
  }

  @Get('google/redirect')
    @ApiOperation({ summary: 'User Login with Google & token ' })
  @ApiResponse({
    status: 200,
    description: 'logged in Success & Token Resived',
    type: TokenResponseDto,
  })
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return req.user;
  }
}