import { Logger, MessageEvent } from '@nestjs/common';
import { BehaviorSubject, Subject, finalize } from 'rxjs';

export class SseService {
  private subjects: Map<string, Subject<MessageEvent>> = new Map();

  getSubjectForClient(clientId: string) {
    if (!this.subjects.has(clientId)) {
      Logger.log(`Creating new subject for client ${clientId}`);
      const subject = new BehaviorSubject<MessageEvent>({
        data: 'waiting for updates',
      });
      this.subjects.set(clientId, subject);
      return subject;
    } else {
      Logger.log(`Reusing existing subject for client ${clientId}`);
      return this.subjects.get(clientId);
    }
  }
}
