import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FriendService } from './friend.service';
import { User, Friendship } from '@prisma/client';

class CreateFriendRequestDto {
  @ApiProperty()
  initiatorId: number;

  @ApiProperty()
  acceptorId: number;
}

class AcceptFriendRequestDto {
  @ApiProperty()
  id: number;
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

  @Put('friend-request/accept')
  @ApiOperation({ summary: 'Accept a friend request' })
  @ApiBody({ type: AcceptFriendRequestDto })
  async acceptFriendRequest(
    @Body() acceptFriendRequestDto: AcceptFriendRequestDto,
  ): Promise<Friendship> {
    return this.friendService.acceptFriendRequest(acceptFriendRequestDto.id);
  }

  @Get('friend-request/pending/:userId')
  @ApiOperation({ summary: 'Get pending request' })
  async getPendingFriendRequests(@Param('userId') userId: number): Promise<Friendship[]> {
    return this.friendService.getPendingFriendRequests(Number(userId));
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get friendships' })
  async getFriends(@Param('userId') userId: number): Promise<User[]> {
    return this.friendService.getFriends(Number(userId));
  }
}
