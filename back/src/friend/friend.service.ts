import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {UserFriendship, User} from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async addFriendship(id, friendship){


    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: { userFriendships: true },
    });

    const updatedFriendships = [...user.userFriendships, friendship];
    await this.prisma.user.update({
      where: { id: id },
      data: { userFriendships: { set: updatedFriendships } },
    });
  }

  async createFriendRequest(initiatorId: number, targetId: number): Promise<UserFriendship> {
    if (initiatorId == targetId) {
      throw new Error('Both initiatorId and targetId shouldn\'t be the same');
    }
  
    const existingFriendship = await this.prisma.userFriendship.findFirst({
      where: {
        OR: [
          {
            senderId: initiatorId,
            targetId: targetId
          },
          {
            senderId: targetId,
            targetId: initiatorId
          }
        ]
      }
    });
  
    if (existingFriendship) {
      if (existingFriendship.acceptedAt == null) {
        throw new Error('A friend request is still pending between these users');
      } else {
        throw new Error('A friendship already exists between these users');
      }
    }
  
    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: initiatorId,
        targetId: targetId,
      }
    });
  
    await this.addFriendship(targetId, userFriendship);
    return userFriendship;
  }
  

  
  async acceptFriendRequest(targetId, friendshipId: number): Promise<UserFriendship> {
    const updatedFriendship = await this.prisma.userFriendship.update({
      where: {
        id: friendshipId
      },
      data: {
        acceptedAt: new Date(),
      }
    })
    // const userFriendship = await this.prisma.userFriendship.create({
    //   data: {
    //     senderId: targetId,
    //     targetId: updatedFriendship.senderId,
    //     acceptedAt: new Date(),
    //   }
    // });

    // await this.addFriendship(updatedFriendship.senderId, userFriendship)
    return updatedFriendship;
  }


  declineFriendRequest(acceptorId, friendshipId: number) {
    return this.prisma.userFriendship.delete({
      where: {
        id: friendshipId,
      }
    })
  }

  async getPendingFriendRequests(senderId: number): Promise<any[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: senderId,
      },
      include: {
        userFriendships: {
          where: {
            acceptedAt: null,
          }
        }
      }
    });

    const pending = await user.userFriendships.map(current => current.senderId);
    return (await this.prisma.user.findMany({
      where: {
        id: {
          in: pending,
        }
      }
    })).map(current => {
          return {
            ...current,
            friendShipId: user.userFriendships.filter(c => c.senderId == current.id)[0].id
          }
        }
    );
  }
}