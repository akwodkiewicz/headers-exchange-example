import { Module } from '@nestjs/common';
import { SseModule } from './sse.module';
import { CacheModule } from './cache.module';
import { SseUpdatesModule } from './sse-updates.module';

@Module({
  imports: [SseModule, SseUpdatesModule],
})
export class AppModule {}
