import {
  Controller,
  Inject,
  Logger,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseService } from './sse.service';
import { CACHE } from './cache.module';
import { Cache } from 'cache-manager';
import { SseUpdatesPublisherService } from './sse-updates-publisher.service';

@Controller()
export class SseController {
  constructor(
    private readonly service: SseService,
    private readonly publisher: SseUpdatesPublisherService,
    @Inject(CACHE) private readonly cache: Cache,
  ) {}

  @Sse('updates/:clientId')
  updates(@Param('clientId') clientId: string): Subject<MessageEvent> {
    Logger.debug(
      `Setting PID=${process.pid} as SSE handler for client ${clientId}`,
    );
    this.cache.set(clientId, process.pid);
    return this.service.getSubjectForClient(clientId);
  }

  @Post('updates/:clientId')
  async sendUpdate(@Param('clientId') clientId: string) {
    const handlerPid = await this.cache.get(clientId);
    Logger.debug(
      `Handler PID for client ${clientId} is ${handlerPid}, current PID=${process.pid}`,
    );
    this.publisher.publish({ data: 'update' }, handlerPid as number);
  }
}
