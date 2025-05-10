import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
 constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
 
  
  async register(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

    async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });

    if (!user || user.password !== loginUserDto.password) {
      throw new Error('Invalid username or password');
    }

    /* user.lastLogin = new Date();
    await this.userRepository.save(user);

    return { message: 'Login successful', user };
  }*/
     const previousLogin = user.lastLogin; 
     user.lastLogin = new Date();
      await this.userRepository.save(user);
        return {
      message: 'Login successful',
       user,
          lastLogin: previousLogin,
             };
          }
 async logout(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return { message: 'Logout successful' };
  }
}
