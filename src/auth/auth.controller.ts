import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
   @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // این متد کار خاصی نمی‌کند، فقط کاربر را به گوگل هدایت می‌کند
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    // وقتی گوگل کاربر را برگشت می‌دهد، اینجا اطلاعات کاربر را می‌گیریم
    return req.user;
  }
}