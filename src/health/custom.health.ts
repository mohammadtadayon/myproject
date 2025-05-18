import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';

@Injectable()
export class CustomHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    // منطق بررسی سلامت سرویس
    const isHealthy = true; // اینجا منطق واقعی بررسی سلامت را قرار دهید

    const result = this.getStatus(key, isHealthy);

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Custom health check failed', result);
  }
}
