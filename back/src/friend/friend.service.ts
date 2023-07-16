import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Friendship } from '@prisma/client';
import { User } from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async createFriendRequest(initiatorId: number, acceptorId: number): Promise<Friendship> {
    if (initiatorId == acceptorId) {
      throw new Error('Both initiatorId and acceptorId shouldn\'t be the same');
    }
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { initiatorId: initiatorId, acceptorId: acceptorId },
          { initiatorId: acceptorId, acceptorId: initiatorId },
        ],
      },
    });
    if (existingFriendship) {
      if (existingFriendship.acceptedAt) {
        throw new Error('Users are already friends');
      } else {
        throw new Error('Friend request already sent');
      }
    }
    return this.prisma.friendship.create({
      data: {
        initiatorId,
        acceptorId,
      },
    });
  }
  

  async acceptFriendRequest(id: number): Promise<Friendship> {
    const friendshipExists = await this.prisma.friendship.findUnique({
      where: { id: id },
    });
  
    if (!friendshipExists) {
      throw new Error('Friendship with provided ID not found');
    }
  
    return this.prisma.friendship.update({
      where: { id: id },
      data: { acceptedAt: new Date() },
    });
  }
  
  
  async getPendingFriendRequests(userId: number): Promise<Friendship[]> {
    return this.prisma.friendship.findMany({
      where: {
        OR: [
          { acceptorId: userId, acceptedAt: null },
          { initiatorId: userId, acceptedAt: null },
        ]
      },
    });
  }
  
  
  async getFriends(userId: number): Promise<User[]> {
  const initiatedFriendships = await this.prisma.friendship.findMany({
    where: { initiatorId: userId, acceptedAt: { not: null } },
    include: { acceptedBy: true },
  });

  const acceptedFriendships = await this.prisma.friendship.findMany({
    where: { acceptorId: userId, acceptedAt: { not: null } },
    include: { initiatedBy: true },
  });

  return [
    ...initiatedFriendships.map(friendship => friendship.acceptedBy),
    ...acceptedFriendships.map(friendship => friendship.initiatedBy),
  ];
}

  
}