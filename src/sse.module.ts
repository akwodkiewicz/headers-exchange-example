import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';
import { CacheModule } from './cache.module';
import { SseUpdatesModule } from './sse-updates.module';

@Module({
  imports: [CacheModule, SseUpdatesModule],
  controllers: [SseController],
  providers: [SseService],
  exports: [SseService],
})
export class SseModule {}
