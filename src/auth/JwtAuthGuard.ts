import { Injectable,  ExecutionContext,UnauthorizedException, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
 constructor(
    private redisService: RedisService,
    private reflector: Reflector,
  ) {
    super();
  }
   async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (token) {
      const client = this.redisService.getClient();
      const isBlacklisted = await client.get(`blacklist:${token}`);
      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been logged out');
      }
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}