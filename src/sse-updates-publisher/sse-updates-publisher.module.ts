import { Module } from '@nestjs/common';
import { AmqpModule } from '../amqp/amqp.module';
import { SseUpdatesPublisherService } from './sse-updates-publisher.service';
import { SseUpdatesPublisherController } from './sse-updates-publisher.controller';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [AmqpModule, CacheModule],
  controllers: [SseUpdatesPublisherController],
  providers: [SseUpdatesPublisherService],
})
export class SseUpdatesPublisherModule {}
