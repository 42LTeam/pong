import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FriendService } from './friend.service';
import { UserFriendship, Friendship, User } from '@prisma/client';
import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';

class CreateFriendRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  initiatorId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  acceptorId: number;
}

class AcceptFriendRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  friendshipId: number;
}

@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post('friend-request')
  @ApiOperation({ summary: 'Create a friend request' })
  @ApiBody({ type: CreateFriendRequestDto })
  async createFriendRequest(
    @Body() createFriendRequestDto: CreateFriendRequestDto,
  ): Promise<Friendship> {
    return this.friendService.createFriendRequest(createFriendRequestDto.initiatorId, createFriendRequestDto.acceptorId);
  }

  @Put('friend-request/accept/:friendshipId')
  @ApiOperation({ summary: 'Accept a friend request' })
  async acceptFriendRequest(
    @Param('friendshipId') friendshipId: number,
    @Body('userId') userId: number,
  ): Promise<UserFriendship> {
    return this.friendService.acceptFriendRequest(userId, Number(friendshipId));
  }

  @Get('friend-request/pending/:userId')
  @ApiOperation({ summary: 'Get pending request' })
  async getPendingFriendRequests(@Param('userId') userId: number): Promise<User[]> {
    return this.friendService.getPendingFriendRequests(Number(userId));
  }

  // @Get(':userId')
  // @ApiOperation({ summary: 'Get friend' })
  // async getFriends(@Param('userId') userId: number): Promise<User[]> {
  //   return this.friendService.getFriends(Number(userId));
  // }
}
