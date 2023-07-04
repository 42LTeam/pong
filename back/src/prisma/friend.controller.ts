import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Friends } from '@prisma/client';
import { FriendService } from './friend.service';

@Controller('friends')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post()
  async createFriend(
    @Body('id') id: number,
    @Body('user_1') user_1: string,
    @Body('user_2') user_2: string,
    @Body('status') status: string,
    @Body('created_at') created_at: string,
  ): Promise<Friends> {
    return this.friendService.createFriend(id, user_1, user_2, status, created_at);
  }

  @Get()
  async getAllUsers(): Promise<Friends[]> {
    return this.friendService.getAllFriends();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Friends | null> {
    return this.friendService.getFriendById(Number(id));
  }
}