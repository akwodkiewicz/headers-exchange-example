import { Controller, Inject, Logger, Param, Post } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { CACHE } from '../cache/cache.module';
import { SseUpdatesPublisherService } from './sse-updates-publisher.service';

@Controller('updates')
export class SseUpdatesPublisherController {
  constructor(
    private readonly publisher: SseUpdatesPublisherService,
    @Inject(CACHE) private readonly cache: Cache,
  ) {}

  @Post(':clientId')
  async sendUpdate(@Param('clientId') clientId: string) {
    const handlerPid = await this.cache.get(clientId);
    Logger.debug(
      `Handler PID for client ${clientId} is ${handlerPid}, current PID=${process.pid}`,
    );
    Logger.log('Publishing message');
    this.publisher.publish(
      { clientId, someData: Math.random() },
      handlerPid as number,
    );
  }
}
