import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Friends } from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async createFriend(id: number, user_1: number, user_2: number, status: string, created_at: Date): Promise<Friends> {
    return this.prisma.friends.create({
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
    return this.prisma.friends.findMany();
  }

  async getFriendById(id: number): Promise<Friends | null> {
    return this.prisma.friends.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateFriendStatus(id: number, status: string): Promise<Friends> {
    return this.prisma.friends.update({
      where: {
        id: id,
      },
      data: {
        status,
      },
    });
  }
}
