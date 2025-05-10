import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByUsername(loginUserDto.username);

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    const previousLogin = user.lastLogin; 
     user.lastLogin = new Date();
      await this.userRepository.save(user);

    return { accessToken,
      lastLogin: previousLogin,
     };
  }

  async register(createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
