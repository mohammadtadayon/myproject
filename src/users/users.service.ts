import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
 constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
     private jwtService: JwtService,
  ) {}
 
  
  async register(createUserDto: CreateUserDto) {

     const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
    password: hashedPassword,
  });
    return await this.userRepository.save(user);
  }
  //این بدون jwt 
/*
    async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });
//بدون هش 
   if (!user || user.password !== loginUserDto.password) {
      throw new Error('Invalid username or password');
    }*/
   
//تاریخ موجود میزد 
    /* user.lastLogin = new Date();
    await this.userRepository.save(user);

    return { message: 'Login successful', user };
  }
 
     const previousLogin = user.lastLogin; 
     user.lastLogin = new Date();
      await this.userRepository.save(user);
        return {
      message: 'Login successful',
       user,
          lastLogin: previousLogin,
   
             };
          }
          */
 async logout(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return { message: 'Logout successful' };
  }
  findByUsername(username:string){
    return this.userRepository.findOne({where:{username}});
  }
 async finnAll(): Promise<User[]> {
  return this.userRepository.find();
 }
}
