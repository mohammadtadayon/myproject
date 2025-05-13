import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, FindAllDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //برای قبل
/*
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
    */

  @Post('logout/:id')
  async logout(@Param('id') id: number) {
    return this.userService.logout(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('Findall')
   @ApiBearerAuth() 
  @ApiOperation({ summary: 'need jwt token' })
  @ApiResponse({
  status: 200,
  description: 'finded',
  type:  FindAllDto ,
})
  async findAll(){
    return this.userService.finnAll()
  }
}