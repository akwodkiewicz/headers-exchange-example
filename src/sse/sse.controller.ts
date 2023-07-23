import {
  Controller,
  Inject,
  Logger,
  MessageEvent,
  Param,
  Sse,
} from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseService } from './sse.service';
import { CACHE } from '../cache/cache.module';
import { Cache } from 'cache-manager';

@Controller('updates')
export class SseController {
  constructor(
    private readonly service: SseService,
    @Inject(CACHE) private readonly cache: Cache,
  ) {}

  @Sse(':clientId')
  updates(@Param('clientId') clientId: string): Subject<MessageEvent> {
    Logger.debug(
      `Setting PID=${process.pid} as SSE handler for client ${clientId}`,
    );
    this.cache.set(clientId, process.pid);
    return this.service.getSubjectForClient(clientId);
  }
}
