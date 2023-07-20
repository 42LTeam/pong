import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(id: number, username: string, secretO2FA: string, avatar: string, xp: number): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: id,
        username: username,
        secretO2FA: secretO2FA,
        avatar: avatar,
        xp: xp,
      }
    });
  }
  

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUserAvatar(id: number, avatar: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        avatar: avatar
      },
    });
  }

  async updateUserName(id: number, username: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        username: username
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async getFriendsOfUser(id: number): Promise<User[]> {
    const friendships = await this.prisma.userFriendship.findMany({
      where: { userId: id, acceptedAt: { not: null } },
      include: { friendship: true }
    });
  
    const friendshipIds = friendships.map(f => f.friendshipId);
  
    const friendsUserFriendships = await this.prisma.userFriendship.findMany({
      where: {
        friendshipId: { in: friendshipIds },
        userId: { not: id }
      },
    });
  
    const friendUserIds = friendsUserFriendships.map(f => f.userId);
  
    return this.prisma.user.findMany({
      where: { id: { in: friendUserIds } },
    });
  
  }

  async search(query: string): Promise<User[]>{
    return this.prisma.user.findMany({
      where : {
        username: {
          startsWith: query,
        }
      }
    });
  }

  async getBlocksOfUser(id: number): Promise<User[]> {
    const blocks = await this.prisma.block.findMany({
        where: { blockerId: id },
        include: { receivedBy: true }
    });

    if (!blocks) throw new Error("No blocked users found");

    return blocks.map(block => block.receivedBy);

  }
}

