import { Module } from '@nestjs/common';
import { AmqpModule } from './amqp.module';
import { SseUpdatesConsumerService } from './sse-updates-consumer.service';
import { SseUpdatesPublisherService } from './sse-updates-publisher.service';

@Module({
  imports: [AmqpModule],
  providers: [SseUpdatesConsumerService, SseUpdatesPublisherService],
  exports: [SseUpdatesPublisherService],
})
export class SseUpdatesModule {}
