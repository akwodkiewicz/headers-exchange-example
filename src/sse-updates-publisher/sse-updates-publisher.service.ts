import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpService } from '../amqp/ampq.service';
import { AMQPChannel } from '@cloudamqp/amqp-client';

@Injectable()
export class SseUpdatesPublisherService implements OnModuleInit {
  private exchangeName = 'sse' as const;

  private channel: undefined | AMQPChannel;
  constructor(private readonly amqpService: AmqpService) {}

  async onModuleInit() {
    await this.setupChannel();
    await this.setupExchange();
  }

  public async publish(data: Record<string, unknown>, forPid: number) {
    await this.channel.basicPublish(
      this.exchangeName,
      '',
      JSON.stringify(data),
      {
        headers: { pid: forPid },
      },
    );
  }

  private async setupChannel() {
    this.channel = await this.amqpService.getChannel();
  }
  private async setupExchange() {
    await this.channel.exchangeDeclare(this.exchangeName, 'headers');
  }
}
