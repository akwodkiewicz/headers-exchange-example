import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AmqpService } from '../amqp/ampq.service';
import { AMQPChannel } from '@cloudamqp/amqp-client';
import { SseService } from '../sse/sse.service';

@Injectable()
export class SseUpdatesConsumerService implements OnModuleInit {
  private exchangeName = 'sse' as const;
  private queueName = `${process.pid}`;

  private channel: undefined | AMQPChannel;
  constructor(
    private readonly amqpService: AmqpService,
    private readonly sseService: SseService,
  ) {}

  async onModuleInit() {
    await this.setupChannel();
    await this.setupExchange();
    await this.setupQueues();
    await this.setupConsumer();
  }

  private async setupChannel() {
    this.channel = await this.amqpService.getChannel();
  }
  private async setupExchange() {
    await this.channel.exchangeDeclare(this.exchangeName, 'headers');
  }
  private async setupQueues() {
    await this.channel.queueDeclare(this.queueName, { exclusive: true });
    await this.channel.queueBind(this.queueName, this.exchangeName, '', {
      'x-match': 'all',
      [`${process.pid}`]: 'true',
    });
  }
  private async setupConsumer() {
    await this.channel.basicConsume(this.queueName, {}, (message) => {
      const body = JSON.parse(message.bodyToString());
      Logger.debug(
        `Received message! Headers: ${JSON.stringify(
          message.properties.headers,
        )}, body: ${message.bodyToString()}`,
      );
      this.sseService
        .getSubjectForClient(body.clientId)
        .next({ data: body.someData.toString() });
    });
  }
}
