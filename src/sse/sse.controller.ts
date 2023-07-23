import { Controller, MessageEvent, Param, Sse } from '@nestjs/common';
import { Subject } from 'rxjs';
import { SseService } from './sse.service';

@Controller('updates')
export class SseController {
  constructor(private readonly service: SseService) {}

  @Sse(':clientId')
  async updates(
    @Param('clientId') clientId: string,
  ): Promise<Subject<MessageEvent>> {
    return this.service.getSubjectForClient(clientId);
  }
}
