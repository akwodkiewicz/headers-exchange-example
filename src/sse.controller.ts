import { Controller, MessageEvent, Param, Post, Sse } from '@nestjs/common';
import { Observable, Subject, interval, map } from 'rxjs';
import { SseService } from './sse.service';

@Controller()
export class SseController {
  constructor(private readonly service: SseService) {}

  @Sse('updates/:clientId')
  updates(@Param('clientId') clientId: string): Subject<MessageEvent> {
    return this.service.getSubjectForClient(clientId);
  }

  @Post('updates/:clientId')
  sendUpdate(@Param('clientId') clientId: string) {
    this.service
      .getSubjectForClient(clientId)
      .next({ data: { update: 'yes' } });
  }
}
