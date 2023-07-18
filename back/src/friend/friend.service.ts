import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserFriendship, Friendship } from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async createFriendRequest(initiatorId: number, acceptorId: number): Promise<Friendship> {
    if (initiatorId == acceptorId) {
      throw new Error('Both initiatorId and acceptorId shouldn\'t be the same');
    }

    const newFriendship = await this.prisma.friendship.create({
      data: {},
    });
    await this.prisma.userFriendship.create({
      data: {
        userId: initiatorId,
        friendshipId: newFriendship.id,
      },
    });

    await this.prisma.userFriendship.create({
      data: {
        userId: acceptorId,
        friendshipId: newFriendship.id,
      },
    });

    return newFriendship;
  }

  async acceptFriendRequest(userId: number, friendshipId: number): Promise<UserFriendship> {
    const userFriendship = await this.prisma.userFriendship.findFirst({
      where: {
        userId,
        friendshipId,
      },
    });

    if (!userFriendship) {
      throw new Error('Friend request not found');
    }

    if (userFriendship.acceptedAt) {
      throw new Error('Friend request already accepted');
    }

    return this.prisma.userFriendship.update({
      where: {
        id: userFriendship.id,
      },
      data: {
        acceptedAt: new Date(),
      },
    });
  }

  async getPendingFriendRequests(userId: number): Promise<UserFriendship[]> {
    return this.prisma.userFriendship.findMany({
      where: {
        userId,
        acceptedAt: null,
      },
      include: {
        friendship: true,
      },
    });
  }

  // async getFriends(userId: number): Promise<User[]> {
    // const friendRelations = await this.prisma.userFriendship.findMany({
    //   where: {
    //     userId,
    //     acceptedAt: {
    //       not: null,
    //     },
    //   },
    //   include: {
    //     friendship: {
    //       include: {
    //         users: true,
    //       },
    //     },
    //   },
    // });

    // let friends: User[] = [];

    // for (let relation of friendRelations) {
    //   for (let user of relation.friendship.users) {
    //     if (user.id !== userId) {
    //       friends.push(user);
    //     }
    //   }
    // }

    // return friends;
  // }
}

