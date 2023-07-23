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
  async updates(
    @Param('clientId') clientId: string,
  ): Promise<Subject<MessageEvent>> {
    const existingValue = await this.cache.get(clientId);
    Logger.log(
      `Client ${clientId} currently handled by PID=${existingValue}.` +
        `Adding ${process.pid} to set of handlers`,
    );
    this.cache.set(
      clientId,
      ((existingValue as number[]) ?? [])
        .filter((v) => v !== process.pid)
        .concat(process.pid),
    );

    return this.service.getSubjectForClient(clientId);
  }
}
