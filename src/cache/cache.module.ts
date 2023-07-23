import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { caching } from 'cache-manager';

export const CACHE = Symbol('CACHE');

@Module({
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
})
export class CacheModule {}
