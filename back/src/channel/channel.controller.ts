import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Channel } from '@prisma/client';
import { ChannelService } from './channel.service';

class CreateChannelDto {
  @ApiProperty()
  creatorId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  privated: boolean;

  @ApiProperty()
  created_at: Date;
}

@ApiTags('channels')
@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  @ApiBody({ type: CreateChannelDto })
  async createChannel(
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<Channel> {
    return this.channelService.createChannel(createChannelDto.name, createChannelDto.password, createChannelDto.creatorId, createChannelDto.privated, createChannelDto.created_at);
  }

  @Get()
  async getAllFriends(): Promise<Channel[]> {
    return this.channelService.getAllChannel();
  }

  @Get('id/:id')
  async getChannelById(@Param('id') id: number): Promise<Channel | null> {
    return this.channelService.getChannelById(Number(id));
  }

  @Get('creatorId/:creatorId')
  async getChannelByUser(@Param('creatorId') creatorId: number): Promise<Channel[] | null> {
    return this.channelService.getChannelByUser(Number(creatorId));
  }

  @Get('messages/:id')
  async getChannelMessages(@Param('id') id: number): Promise<Channel[] | null> {
    return this.channelService.getChannelMessages(Number(id));
  }

}