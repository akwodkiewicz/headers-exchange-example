import { Module } from '@nestjs/common';
import { SseModule } from './sse.module';
import { CacheModule } from './cache.module';

@Module({
  imports: [SseModule, CacheModule.register()],
})
export class AppModule {}
