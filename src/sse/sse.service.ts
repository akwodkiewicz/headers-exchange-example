import { Inject, Logger, MessageEvent, OnModuleDestroy } from '@nestjs/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE } from '../cache/cache.module';

export class SseService implements OnModuleDestroy {
  private subjects: Map<string, Subject<MessageEvent>> = new Map();

  constructor(@Inject(CACHE) private readonly cache: Cache) {}

  async onModuleDestroy() {
    Logger.log('Resetting cache');
    const keys = await this.cache.store.keys('client_*');
    Logger.debug(`keys: ${keys}`);
    for (const key of keys) {
      await this.cache.del(key);
    }
  }

  async getSubjectForClient(clientId: string) {
    const existingValue = await this.cache.get('client_' + clientId);
    Logger.log(
      `Client ${clientId} currently handled by PID=${existingValue}.` +
        `Adding ${process.pid} to set of handlers`,
    );
    this.cache.set(
      'client_' + clientId,
      ((existingValue as number[]) ?? [])
        .filter((v) => v !== process.pid)
        .concat(process.pid),
    );

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
