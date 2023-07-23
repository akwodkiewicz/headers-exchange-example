import { Module } from '@nestjs/common';
import { AmqpModule } from './amqp.module';
import { SseUpdatesConsumerService } from './sse-updates-consumer.service';
import { SseModule } from './sse.module';

@Module({
  imports: [AmqpModule, SseModule],
  providers: [SseUpdatesConsumerService],
})
export class SseUpdatesConsumerModule {}
