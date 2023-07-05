import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Message } from '@prisma/client';
import { MessageService } from './message.service';
import { channel } from 'diagnostics_channel';

class CreateMessageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user: number;

  @ApiProperty()
  channel: number;

  @ApiProperty()
  text: string;
}

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  @ApiBody({ type: CreateMessageDto })
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    return this.messageService.createMessage(createMessageDto.id, createMessageDto.user, createMessageDto.channel, createMessageDto.text);
  }

  @Get()
  async getAllMessage(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  @Get(':id')
  async getMessageById(@Param('id') id: string): Promise<Message | null> {
    return this.messageService.getMessageById(Number(id));
  }

  @Get(':user')
  async getMessageByUser(@Param('user') user: number): Promise<Message[] | null> {
    return this.messageService.getMessageByUser(Number(user));
  }

  @Get(':channel')
  async getMessageByChannel(@Param('channel') id: number): Promise<Message[] | null> {
    return this.messageService.getMessageByUser(Number(channel));
  }
}