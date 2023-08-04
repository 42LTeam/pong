import {Controller, Post, Body, Req} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Channel} from '@prisma/client';
import { ChannelService } from './channel.service';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  ArrayMinSize, IsArray
} from '@nestjs/class-validator';
/*
class CreateChannelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  creatorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  privated: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  created_at: Date;
}

class CreateUserChannelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  channelId: number;
}*/

export class CreateChannelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  creatorId: number;

  @ApiProperty()
  @IsBoolean()
  privated?: boolean;

}

export class SendInviteDto {
  @IsNumber({}, {each: true})
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  ids: number[];

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  channelId;
}

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


/*
  @Post()
  @ApiOperation({ summary: 'Create a Channel to a channel' })
  @ApiBody({ type: CreateChannelDto })
  async createChannel(
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<Channel> {
    return this.channelService.createChannel(createChannelDto.name, createChannelDto.password, createChannelDto.creatorId, createChannelDto.privated, createChannelDto.created_at);
  }

  @Post('add-user')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: CreateUserChannelDto })
  @ApiOperation({ summary: 'Add a user to a channel' })
  async addUserToChannel(@Body() createUserChannelDto: CreateUserChannelDto): Promise<UserChannel> {
    return this.channelService.addUserToChannel(
      createUserChannelDto.userId,
      createUserChannelDto.channelId
    );
  }
  
  @Get()
  async getAllChannels(): Promise<Channel[]> {
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
*/
}