import { Module } from '@nestjs/common';
import { AmqpModule } from '../amqp/amqp.module';
import { SseUpdatesConsumerService } from './sse-updates-consumer.service';
import { SseModule } from '../sse/sse.module';

@Module({
  imports: [AmqpModule, SseModule],
  providers: [SseUpdatesConsumerService],
})
export class SseUpdatesConsumerModule {}
