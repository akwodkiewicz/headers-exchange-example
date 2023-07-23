import { DynamicModule, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { caching } from 'cache-manager';

export const CACHE = Symbol('CACHE');

@Module({})
export class CacheModule {
  static register(): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: CACHE,
          useFactory: async () =>
            caching(
              await redisStore({ socket: { port: 6969, host: 'localhost' } }),
            ),
        },
      ],
      exports: [CACHE],
      global: true,
    };
  }
}
