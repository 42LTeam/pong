import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Friends } from '@prisma/client';
import { FriendService } from './friend.service';

class CreateFriendDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_1: number;

  @ApiProperty()
  user_2: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  created_at: Date;

}

@ApiTags('friends')
@Controller('friends')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post()
  @ApiBody({ type: CreateFriendDto })
  async createFriend(
    @Body() createFriendDto: CreateFriendDto,
  ): Promise<Friends> {
    return this.friendService.createFriend(createFriendDto.id, createFriendDto.user_1, createFriendDto.user_2, createFriendDto.status, createFriendDto.created_at);
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