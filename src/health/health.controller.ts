import { Controller ,Get, UseGuards} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import{HealthCheckService,HealthCheck,HttpHealthIndicator, TypeOrmHealthIndicator,MemoryHealthIndicator, DiskHealthIndicator }from '@nestjs/terminus';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuard';

@ApiTags('health')
@UseGuards(JwtAuthGuard)
@Controller('health')
export class HealthController {
    constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
      private memory: MemoryHealthIndicator,
      private disk: DiskHealthIndicator,
  ) {}

  
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([

      () => this.http.pingCheck('google', 'https://google.com'),

   
      () => this.db.pingCheck('database'),

       () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024), // Max 300MB
       
    () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),

         () =>
        this.disk.checkStorage('disk_health', {
          thresholdPercent: 0.9,
          path: '/',
        }),
    ]);
  }
}
