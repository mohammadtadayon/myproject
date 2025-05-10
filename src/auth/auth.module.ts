import { Module } from '@nestjs/common';
import { UsersModule } from 'src//users/users.module'; 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
 imports: [
    PassportModule,
    ConfigModule,
    /*JwtModule.register({
      secret: 'your_jwt_secret_key', // 
      signOptions: { expiresIn: '60m' }, 
      }),*/
      JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
        useFactory:  (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {expiresIn: configService.get('JWT_EXPIRES_IN') }, 
      }),
    
    
  }),
      TypeOrmModule.forFeature([User]),
    UsersModule
  ],
  providers: [AuthService, JwtStrategy,UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}