import { Controller, Get, Param, Post, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Message } from '@prisma/client';
import { MessageService } from './message.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { IsNotEmpty, IsNumber, IsString  } from '@nestjs/class-validator';

class CreateMessageDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  channelId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

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
    return this.messageService.createMessage(createMessageDto.userId, createMessageDto.channelId, createMessageDto.content);
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

  @Get(':messageId/readBy/:userId')
  async isMessageReadByUser(
    @Param('messageId', ParseIntPipe) messageId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<{read: boolean}> {
    const isRead = await this.messageService.isMessageReadByUser(messageId, userId);
    return { read: isRead };
  }

  @Get('channel/:id/last')
  async getLastMessageInChannel(@Param('id', ParseIntPipe) channelId: number): Promise<Message> {
    return await this.messageService.getLastMessageInChannel(channelId);
  }
  
}
