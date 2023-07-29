import {Controller, Get, Param, Post, Put, Body, Req, UseGuards} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FriendService } from './friend.service';
import { UserFriendship,  User } from '@prisma/client';
import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import {AuthenticatedGuard} from "../auth/guards/authenticated.guard";
import {Roles} from "../auth/roles.decorator";

class AdminCreateFriendRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  initiatorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  acceptorId: number;
}

class CreateFriendRequestDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  acceptorId: number;
}


@ApiTags('friend')
@Controller('friend')
@UseGuards(AuthenticatedGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post('friend-request/admin')
  @Roles(1)
  @ApiOperation({ summary: 'Create a friend request' })
  @ApiBody({ type: AdminCreateFriendRequestDto })
  async createFriendRequest(
    @Body() createFriendRequestDto: AdminCreateFriendRequestDto): Promise<UserFriendship> {
    return this.friendService.createFriendRequest(createFriendRequestDto.initiatorId, createFriendRequestDto.acceptorId);
  }

  @Post('friend-request')
  @Roles(0)
  @ApiOperation({ summary: 'Create a friend request' })
  @ApiBody({ type: CreateFriendRequestDto })
  async sendFriendRequest(
      @Req() req: any,
      @Body() createFriendRequestDto: CreateFriendRequestDto): Promise<UserFriendship> {
    const user = await req.user;
    return this.friendService.createFriendRequest(user.id, createFriendRequestDto.acceptorId);
  }



  @Put('friend-request/accept/:friendshipId')
  @ApiOperation({ summary: 'Accept a friend request' })
  async acceptFriendRequest(
    @Param('friendshipId') friendshipId: number,
    @Req() req: any
  ): Promise<UserFriendship> {
    const user = await req.user;
    return this.friendService.acceptFriendRequest(user.id, Number(friendshipId));
  }


  @Put('friend-request/decline/:friendshipId')
  @ApiOperation({ summary: 'Decline a friend request' })
  async declineFriendRequest(
      @Param('friendshipId') friendshipId: number,
      @Req() req: any
  ) {
    const user = await req.user;
    return this.friendService.declineFriendRequest(user.id, Number(friendshipId));
  }

  @Get('friend-request/pending/:userId')
  @ApiOperation({ summary: 'Get pending request' })
  async getPendingFriends(@Param('userId') userId: number): Promise<any[]> {
    return this.friendService.getPendingFriendRequests(Number(userId));
  }




  // @Get(':userId')
  // @ApiOperation({ summary: 'Get friend' })
  // async getFriends(@Param('userId') userId: number): Promise<User[]> {
  //   return this.friendService.getFriends(Number(userId));
  // }


}
