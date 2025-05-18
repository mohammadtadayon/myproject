import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [   //TypeOrmModule.forFeature([User]),
     // UsersModule,
      TerminusModule,
      HttpModule
    ],
  controllers: [HealthController]
})
export class HealthModule {}
