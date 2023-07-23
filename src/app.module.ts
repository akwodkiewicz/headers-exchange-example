import { Module } from '@nestjs/common';
import { SseModule } from './sse.module';
import { SseUpdatesPublisherModule } from './sse-updates-publisher.module';
import { SseUpdatesConsumerModule } from './sse-updates-consumer.module';

@Module({
  imports: [SseModule, SseUpdatesPublisherModule, SseUpdatesConsumerModule],
})
export class AppModule {}
