import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Friendship, Block } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(id: number, username: string, secretO2FA: string, avatar: string, xp: number): Promise<User> {
    console.log(id, username, secretO2FA, avatar, xp);
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
    const initiatedFriends = await this.prisma.friendship.findMany({
      where: { initiatorId: id },
      include: { acceptedBy: true }
    });
  
    const acceptedFriends = await this.prisma.friendship.findMany({
      where: { acceptorId: id },
      include: { initiatedBy: true }
    });
  
    const allFriends = [
      ...initiatedFriends.map(friendship => friendship.acceptedBy).filter(friend => friend.id !== id),
      ...acceptedFriends.map(friendship => friendship.initiatedBy).filter(friend => friend.id !== id)
    ];

    const uniqueFriends = Array.from(new Set(allFriends.map(friend => friend.id)))
    .map(id => {
      return allFriends.find(friend => friend.id === id)
    })

  return uniqueFriends;
}

  async getBlocksOfUser(id: number): Promise<User[]> {
    const blocks = await this.prisma.block.findMany({
        where: { blockerId: id },
        include: { receivedBy: true }
    });

    if (!blocks) throw new Error("No blocked users found");

    const blockedUsers = blocks.map(block => block.receivedBy);

    return blockedUsers;
}

  
  
  
}
