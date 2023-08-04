import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {UserFriendship} from '@prisma/client';

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
//TODO check if friendship already exist
async createFriendRequest(initiatorId: number, acceptorId: number): Promise<UserFriendship> {
    if (initiatorId == acceptorId) {
      throw new Error('Both initiatorId and acceptorId shouldn\'t be the same');
    }



    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: initiatorId,
        targetId: acceptorId,
      }
    });

    await this.addFriendship(acceptorId, userFriendship);
    return userFriendship;
  }

  async acceptFriendRequest(acceptorId, friendshipId: number): Promise<UserFriendship> {
    const updatedFriendship = await this.prisma.userFriendship.update({
      where: {
        id: friendshipId
      },
      data: {
        acceptedAt: new Date(),
      }
    })
    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: acceptorId,
        targetId: updatedFriendship.senderId,
        acceptedAt: new Date(),
      }
    });

    await this.addFriendship(updatedFriendship.senderId, userFriendship)
    return userFriendship;
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