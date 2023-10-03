import {
  Controller,
  Req,
  Get,
  Param,
  UseGuards,
  BadRequestException,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Channel } from "@prisma/client";
import { ChannelService } from "../channel.service";
import { IsNumber } from "@nestjs/class-validator";
import { AuthenticatedGuard } from "../../auth/guards/authenticated.guard";

export class SendInviteDto {
  @ApiProperty()
  @IsNumber()
  friendId: number;
}

@ApiTags("conversation")
@Controller("conversation")
@UseGuards(AuthenticatedGuard)
export class ConversationController {
  constructor(private channelService: ChannelService) {}

  //TODO check if blocked
  @Get(":userId")
  @ApiOperation({ summary: "Create or return conversation between people" })
  async getConversation(
    @Param("userId", ParseIntPipe) userId: number,
    @Req() req
  ): Promise<Channel> {
    const user = await req.user;
    if (Number(userId) == user.id) {
      throw new BadRequestException(
        "Invalid operation: Cannot create a conversation with oneself."
      );
    }
    return this.channelService.getConversation(user.id, Number(userId));
  }
}
