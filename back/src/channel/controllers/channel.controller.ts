import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiProperty, ApiTags} from '@nestjs/swagger';
import {Channel} from '@prisma/client';
import {ChannelService} from '../channel.service';
import {ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from '@nestjs/class-validator';
import {AuthenticatedGuard} from "../../auth/guards/authenticated.guard";

export class CreateChannelDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  conv?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  creatorId: number;


}

export class SendInviteDto {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  ids?: number[];

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  channelId: number;
}

@UseGuards(AuthenticatedGuard)
@ApiTags('channels')
@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}


  @Post()
  @ApiOperation({summary: 'Create a channel'})
  @ApiBody({type: CreateChannelDto})
  async createChannel(@Body() body: CreateChannelDto): Promise<Channel>{
    return this.channelService.createChannel(body);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite a list of user on a channel' })
  @ApiBody({type: SendInviteDto})
  async sendInvites(@Body() body: SendInviteDto, @Req() req){
    return this.channelService.sendInvite(await req.user.id, body);
  }

  @Get('channels')
  @ApiOperation({ summary: 'Get channels of user' })
  async getChannelOfUser(@Req() req): Promise<Channel[]> {
    const user = await req.user;
    return this.channelService.getChannelOfUser(Number(user.id));
  }

  @Get('channel/users')
  @ApiOperation({ summary: 'Get channels of user' })
  async getAllUsersInChannel(@Req() req): Promise<Channel[]> {
    const channel = await req.channel;
    return this.channelService.getAllUsersInChannel(Number(channel.id));
  }

  @Get("/:channelId/members")
  @ApiOperation({ summary: 'Get All users in channel by channel Id' })
  async getChannelAllMembers(@Param('channelId') channelId: number): Promise<any> {
    return await this.channelService.getChannelAllMembers(Number(channelId)); // Assuming the 'users' field contains UserChannel[] data
  }


}