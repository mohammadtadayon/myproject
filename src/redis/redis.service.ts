// src/redis/redis.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis();
  }

  getClient(): Redis {
    return this.client;
  }
}