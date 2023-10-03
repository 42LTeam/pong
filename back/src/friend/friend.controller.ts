import {
  Controller,
  Param,
  Post,
  Put,
  Body,
  Req,
  UseGuards,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { FriendService } from "./friend.service";
import { UserFriendship } from "@prisma/client";
import { IsNotEmpty, IsNumber } from "@nestjs/class-validator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { Roles } from "../auth/roles.decorator";

class CreateFriendRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  acceptorId: number;
}

@ApiTags("friend")
@Controller("friend")
@UseGuards(AuthenticatedGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post("friend-request")
  @Roles(0)
  @ApiOperation({ summary: "Create a friend request" })
  @ApiBody({ type: CreateFriendRequestDto })
  async sendFriendRequest(
    @Req() req: any,
    @Body() createFriendRequestDto: CreateFriendRequestDto
  ): Promise<UserFriendship> {
    const user = await req.user;
    return this.friendService.createFriendRequest(
      user.id,
      createFriendRequestDto.acceptorId
    );
  }

  @Put("friend-request/accept/:friendshipId")
  @ApiOperation({ summary: "Accept a friend request" })
  async acceptFriendRequest(
    @Param("friendshipId", ParseIntPipe) friendshipId: number,
    @Req() req: any
  ): Promise<UserFriendship> {
    const user = await req.user;
    return this.friendService.acceptFriendRequest(
      user.id,
      Number(friendshipId)
    );
  }

  @Put("friend-request/decline/:friendshipId")
  @ApiOperation({ summary: "Decline a friend request" })
  async declineFriendRequest(
    @Param("friendshipId", ParseIntPipe) friendshipId: number,
    @Req() req: any
  ) {
    const user = await req.user;
    return this.friendService.declineFriendRequest(
      user.id,
      Number(friendshipId)
    );
  }

  @Delete("/friendship/:friendId")
  @ApiOperation({ summary: "remove a friendship" })
  async removeFriendship(
    @Param("friendId", ParseIntPipe) friendId: number,
    @Req() req: any
  ) {
    const user = await req.user;
    return this.friendService.removeFriendship(user.id, Number(friendId));
  }
}
