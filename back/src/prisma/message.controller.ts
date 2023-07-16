import {Controller, Get, Param, Post, Body, UseGuards} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Message } from '@prisma/client';
import { MessageService } from './message.service';
import {AuthenticatedGuard} from "../auth/guards/authenticated.guard";

class CreateMessageDto {

  @ApiProperty()
  user: number;

  @ApiProperty()
  channel: number;

  @ApiProperty()
  text: string;

}

@ApiTags('message')
@Controller('message')
@UseGuards(AuthenticatedGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  @ApiBody({ type: CreateMessageDto })
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    return this.messageService.createMessage(createMessageDto.user, createMessageDto.channel, createMessageDto.text);
  }

  @Get()
  async getAllMessage(): Promise<Message[]> {
    return this.messageService.getAllMessages();
  }

  @Get('id/:id')
  async getMessageById(@Param('id') id: number): Promise<Message | null> {
    return this.messageService.getMessageById(Number(id));
  }

  @Get('user/:user')
  async getMessageByUser(@Param('user') user: number): Promise<Message[] | null> {
    return this.messageService.getMessageByUser(Number(user));
  }

  @Get('channel/:channel')
  async getMessageByChannel(@Param('channel') channel: number): Promise<Message[] | null> {
    return this.messageService.getMessageByChannel(Number(channel));
  }

}
