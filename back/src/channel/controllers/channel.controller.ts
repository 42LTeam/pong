import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  ImATeapotException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from "@nestjs/swagger";
import { Channel } from "@prisma/client";
import { ChannelService } from "../channel.service";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "@nestjs/class-validator";
import { AuthenticatedGuard } from "../../auth/guards/authenticated.guard";
import {isChannelAdminPipe} from "../pipes/isChannelAdmin.pipe";
import {isInChannelPipe} from "../pipes/isInChannel.pipe";
import {isBannedPipe} from "../pipes/isBanned.pipe";
import {isOwnerPipe} from "../pipes/isOwner.pipe";
import { ChannelSerializer } from "./channel.serializer";


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
  @IsBoolean()
  @IsOptional()
  passworded?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  privated?: boolean;
}

export class SendInviteDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  ids?: number[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  usernames?: string[];

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  channelId: number;
}

export class EdiChannelDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  passworded: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  privated?: boolean;


}

export class UpdateChannelPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ValidateChannelPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}


@UseGuards(AuthenticatedGuard)
@ApiTags("channels")
@Controller("channels")
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  @ApiOperation({ summary: "Create a channel" })
  @ApiBody({ type: CreateChannelDto })
  async createChannel(
    @Body() body: CreateChannelDto,
    @Req() req
  ): Promise<Channel> {
    const user = await req.user;
    return this.channelService.createChannel(user.id, body);
  }

  @Get("channels")
  @ApiOperation({ summary: "Get channels of user" })
  async getChannelOfUser(@Req() req): Promise<Channel[]> {
    const user = await req.user;
    return this.channelService.getChannelOfUser(Number(user.id));
  }

  @Get("/:channelId/members")
  @ApiOperation({ summary: "Get All users in channel by channel Id" })
  async getChannelAllMembers(
    @Param("channelId", ParseIntPipe, ParseIntPipe, isInChannelPipe) channelId: number
  ): Promise<any> {
    if (channelId > Number.MAX_SAFE_INTEGER) {
      throw new BadRequestException("ID is too large");
    }
    return await this.channelService.getAllUserchannels(Number(channelId));
  }

  @Post("/:channelId/quit/:userId")
  @ApiOperation({ summary: "Remove a user from a channel (User perspective)" })
  async removeUserFromChannel(
    @Param("channelId", ParseIntPipe, ParseIntPipe, isInChannelPipe) channelId: number,
    @Param("userId", ParseIntPipe, ParseIntPipe) userId: number,
    @Req () request
  ): Promise<any> {
    const user = await request.user;
    if (user.id != userId) {
      throw new ForbiddenException("Usurpation d'identité ? C'est beau ça...");
    }
    return this.channelService.removeUserFromChannel(channelId, userId);
  }

  @Post("/:channelId/admin-quit/:userId")
  @UsePipes()
  @ApiOperation({ summary: "Remove a user from a channel (Admin perspective)" })
  async removeUserAdminFromChannel(
    @Param("channelId", ParseIntPipe, ParseIntPipe, isChannelAdminPipe) channelId: number,
    @Param("userId", ParseIntPipe, ParseIntPipe) userId: number
  ): Promise<any> {
    return this.channelService.removeUserFromChannel(channelId, userId);
  }

  @Post("/:channelId/owner-make-admin/:userId")
  @UsePipes()
  @ApiOperation({ summary: "Make a User Admin (Admin privilege)" })
  async ownerMakeAdmin(
      @Param("channelId", ParseIntPipe, ParseIntPipe, isOwnerPipe) channelId: number,
      @Param("userId", ParseIntPipe, ParseIntPipe) userId: number
  ): Promise<any> {
    return this.channelService.ownerMakeAdmin(channelId, userId);
  }


  @Post("/:channelId/ban/:userId")
  @ApiOperation({ summary: "Ban a user from a channel" })
  async banUserFromChannel(
    @Param("channelId", ParseIntPipe, ParseIntPipe, isChannelAdminPipe) channelId: number,
    @Param("userId", ParseIntPipe, ParseIntPipe) userId: number
  ): Promise<any> {
    await this.channelService.banUserFromChannel(channelId, userId);
    await this.channelService.removeUserFromChannel(channelId, userId);
    return;
  }

  @Post("/:channelId/mute/:userId")
  @ApiOperation({ summary: "Mute a user from a channel" })
  async muteUserFromChannel(
    @Param("channelId", ParseIntPipe, ParseIntPipe, isChannelAdminPipe) channelId: number,
    @Param("userId", ParseIntPipe, ParseIntPipe) userId: number
  ): Promise<any> {
    return this.channelService.muteUserFromChannel(channelId, userId);
  }

  @Get("/:channelId/is-muted/:userId")
  @ApiOperation({ summary: "Check if a user is muted from a channel" })
  async isUserMutedFromChannel(
    @Param("channelId", ParseIntPipe, ParseIntPipe) channelId: number,
    @Param("userId", ParseIntPipe, ParseIntPipe) userId: number
  ): Promise<any> {
    return this.channelService.isUserMutedFromChannel(channelId, userId);
  }

  @Post("/:channelId/set-password")
  @ApiOperation({ summary: "Set or Update password for a channel" })
  @ApiBody({ type: UpdateChannelPasswordDto })
  async setChannelPassword(
    @Param("channelId", ParseIntPipe, ParseIntPipe, isChannelAdminPipe) channelId: number,
    @Body() updatePasswordDto: UpdateChannelPasswordDto
  ): Promise<Channel> {
    return this.channelService.setChannelPassword(
      channelId,
      updatePasswordDto.password
    );
  }

  @Get('/public-channels/:userId')
  @ApiOperation({ summary: 'Get all public channels the user is not already in' })
  async getPublicChannels(
      @Param('userId', ParseIntPipe, ParseIntPipe) userId: number,
      @Req() request
  ): Promise<Channel[]> {
    const user = await request.user;
    if (user.id != userId) {
      throw new ForbiddenException("Usurpation d'identité ? C'est beau ça...");
    }

    const channels =  await this.channelService.getPublicChannels(userId);
    return channels.map(ChannelSerializer.serialize);
  }

  @Post("/:channelId/validate-password")
  @ApiOperation({ summary: "Validate password for a channel" })
  @ApiBody({ type: ValidateChannelPasswordDto })
  async validateChannelPassword(
    @Param("channelId", ParseIntPipe, ParseIntPipe) channelId: number,
    @Body() validatePasswordDto: ValidateChannelPasswordDto
  ): Promise<{ isValid: boolean }> {
    const isValid = await this.channelService.validateChannelPassword(
      channelId,
      validatePasswordDto.password
    );
    return { isValid };
  }

  @Post("/:channelId/join")
  @ApiOperation({ summary: "Join a channel" })
  @ApiParam({
    name: "channelId",
    required: true,
    type: Number,
    description: "ID of the channel to join",
  })
  async joinChannel(
    @Param("channelId", ParseIntPipe, ParseIntPipe, isBannedPipe) channelId: number,
    @Req() req
  ): Promise<any> {
    const user = await req.user;
    return this.channelService.joinChannel(channelId, user.id);
  }


  @Post("/edit/:channelId")
  @ApiParam({
    name: "channelId",
    required: true,
    type: Number,
    description: "ID of the channel to edit",
  })
  @ApiOperation({summary: "Edit a channel"})
  @ApiBody( {type: EdiChannelDto})
  async editChannel(
    @Body() body: EdiChannelDto,
    @Param("channelId", ParseIntPipe, ParseIntPipe, isChannelAdminPipe) channelId
  ){
    if (body.passworded && !body.password
      || body.password && !body.passworded
      || body.privated && body.passworded
      || body.privated && body.password) {
        throw new ImATeapotException("Ce que tu fais n'a aucun sens");
    }

    if (body.name)
      await this.channelService.setChannelName(channelId, body.name)
    if (body.password)
      await this.channelService.setChannelPassword(channelId, body.password)
    else
      await this.channelService.setChannelPassword(channelId, null)
    await this.channelService.setChannelPassworded(channelId, body.passworded)
    await this.channelService.setChannelPrivated(channelId, body.privated)
    return 'ok';
  }
}
