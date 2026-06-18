import { Controller, Post, Delete, Body, Param, Get, UseGuards } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

interface AddSubscriberDto {
  email: string;
}

interface UnsubscribeDto {
  email: string;
}

@Controller('subscribers')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  async add(@Body() dto: AddSubscriberDto) {
    return this.subscriberService.addSubscriber(dto.email);
  }

  @Post('unsubscribe')
  async unsubscribe(@Body() dto: UnsubscribeDto) {
    return this.subscriberService.unsubscribe(dto.email);
  }

  @UseGuards(ApiKeyGuard)
  @Get('list')
  async listAll() {
    return this.subscriberService.findAll();
  }

}
