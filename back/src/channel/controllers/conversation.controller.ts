import {Controller, Post, Body, Req, Get, Param, UseGuards} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Channel} from '@prisma/client';
import { ChannelService } from '../channel.service';
import {
  IsNumber,
} from '@nestjs/class-validator';
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";


export class SendInviteDto {
  @ApiProperty()
  @IsNumber()
  friendId: number;
}

@ApiTags('conversation')
@Controller('conversation')
@UseGuards(AuthenticatedGuard)
export class ConversationController {
  constructor(private channelService: ChannelService) {}


  //TODO Check friendship
  @Get(":friendId")
  @ApiOperation({summary: 'Create or return conversation between friend'})
  async getConversation(@Param('friendId') friendId: number, @Req() req): Promise<Channel>{
    const user = await req.user;
    return this.channelService.getConversation(user.id, Number(friendId));
  }

}