

import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { Queue } from 'bull';

@Injectable()
export class BullHealthIndicator extends HealthIndicator {
  constructor(private readonly queue: Queue) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const isReady = await this.queue.isReady();
      if (isReady) {
        return this.getStatus(key, true);
      }
      throw new Error('Queue not ready');
    } catch (error) {
      throw new HealthCheckError('Bull health check failed', this.getStatus(key, false));
    }
  }
}
