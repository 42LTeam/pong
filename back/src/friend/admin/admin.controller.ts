import { ApiBody, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../../auth/guards/authenticated.guard";
import { FriendService } from "../friend.service";
import { IsNotEmpty, IsNumber } from "@nestjs/class-validator";
import { Roles } from "../../auth/roles.decorator";
import { UserFriendship } from "@prisma/client";

class CreateFriendshipDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  initiatorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  acceptorId: number;
}

@ApiTags("admin/friend")
@Controller("admin/friend")
@UseGuards(AuthenticatedGuard)
export class AdminController {
  constructor(private friendService: FriendService) {}

  @Post("friendship")
  @Roles(1)
  @ApiOperation({ summary: "Create a friendship" })
  @ApiBody({ type: CreateFriendshipDto })
  async createFriendship(
    @Body() body: CreateFriendshipDto
  ): Promise<UserFriendship> {
    const friendship = await this.friendService.createFriendRequest(
      body.initiatorId,
      body.acceptorId
    );
    return this.friendService.acceptFriendRequest(
      body.acceptorId,
      friendship.id
    );
  }
}
