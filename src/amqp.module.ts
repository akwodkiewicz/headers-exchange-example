import { Module } from '@nestjs/common';
import { AMQPClient } from '@cloudamqp/amqp-client';
import { AmqpService } from './ampq.service';
import { AMQP_CONNECTION } from './amqp.token';

@Module({
  providers: [
    {
      provide: AMQP_CONNECTION,
      useFactory: async () => {
        {
          const amqp = new AMQPClient('amqp://localhost:5420');
          return amqp.connect();
        }
      },
    },
    AmqpService,
  ],
  exports: [AmqpService],
})
export class AmqpModule {}
