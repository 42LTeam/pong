import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Friends } from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async createFriend(id: number, user_1: string, user_2: string, status: string, created_at: string): Promise<Friend> {
    return this.prisma.friend.create({
      data: {
        id,
        user_1,
        user_2,
        status,
        created_at,
      },
    });
  }

  async getAllFriends(): Promise<Friends[]> {
    return this.prisma.friend.findMany();
  }

  async getFriendById(id: number): Promise<Friends | null> {
    return this.prisma.friend.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateFriendStatus(id: number, status: string): Promise<Friends> {
    return this.prisma.friends.update({
      where: {
        id_count: id,
      },
      data: {
        status,
      },
    });
  }
}
