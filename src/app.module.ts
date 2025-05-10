import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
  envFilePath: '.env',  
  isGlobal: true,       
}), 
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username:  configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      synchronize: true, 
    }),
    inject: [ConfigService],
    
  }),
  TypeOrmModule.forFeature( [User]),
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
