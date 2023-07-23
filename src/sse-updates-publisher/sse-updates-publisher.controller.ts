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
    const handlerPids = (await this.cache.get(clientId)) as
      | number[]
      | undefined;
    if (!handlerPids) return;
    Logger.debug(`Handler PIDs for client ${clientId} are ${handlerPids}`);
    Logger.log('Publishing message');
    this.publisher.publish({ clientId, someData: Math.random() }, handlerPids);
  }
}
