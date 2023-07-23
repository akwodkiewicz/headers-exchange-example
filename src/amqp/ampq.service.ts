import { Inject, Injectable, Logger } from '@nestjs/common';
import { AMQPClient } from '@cloudamqp/amqp-client';
import { AMQP_CONNECTION } from './amqp.token';

@Injectable()
export class AmqpService {
  constructor(
    @Inject(AMQP_CONNECTION) private readonly connection: AMQPClient,
  ) {}

  getChannel() {
    const channel = this.connection.channel();
    Logger.log('Channel created');
    return channel;
  }
}
