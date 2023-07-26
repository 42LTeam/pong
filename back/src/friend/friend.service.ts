import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserFriendship,  User } from '@prisma/client';
import {use} from "passport";

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  //TODO check that isn't already pending

  async createFriendRequest(initiatorId: number, acceptorId: number): Promise<UserFriendship> {
    if (initiatorId == acceptorId) {
      throw new Error('Both initiatorId and acceptorId shouldn\'t be the same');
    }

    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: initiatorId,
      }
    });
    await this.prisma.user.update({
      where: {
        id: acceptorId,
      },
      data: {
        userFriendships: {
          push: userFriendship,
        }
      },
    })
    return userFriendship;
  }

  async acceptFriendRequest(acceptorId: number, friendshipId: number): Promise<UserFriendship> {
    const acceptedFriendship = await this.prisma.userFriendship.update({
      where: {
        id: friendshipId
      },
      data: {
        acceptedAt: new Date(),
      },
      include: {
        sender: true,
      }
    })
    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: acceptorId,
        acceptedAt: new Date(),
      }
    });

    await this.prisma.user.update({
      where: {
        id: acceptedFriendship.sender.id,
      },
      data: {
        push: {
          userFriendships: userFriendship,
        }
      }
    })

    return userFriendship;
  }

  async getPendingFriendRequests(senderId: number): Promise<User[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: senderId,
      },
      include: {
        userFriendships: true,
      }
    });

    const userFriendships = await user.userFriendships();
    const pending = userFriendships.map(current => current.senderId);
    return this.prisma.user.findMany({
      where: {
        id: {
          in: pending,
        }
      }
    })
  }

  // async getFriends(userId: number): Promise<User[]> {
    // const friendRelations = await this.prisma.userFriendship.findMany({
    //   where: {eewiuwwehh
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

    // let friend: User[] = [];

    // for (let relation of friendRelations) {
    //   for (let user of relation.friendship.users) {
    //     if (user.id !== userId) {
    //       friend.push(user);
    //     }
    //   }
    // }

    // return friend;
  // }
}

