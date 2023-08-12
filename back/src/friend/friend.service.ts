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

    await this.addFriendship(updatedFriendship.senderId, userFriendship);
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

  async getUserFriendships(id: number): Promise<number[]> {
    const friendShips = await this.prisma.userFriendship.findMany({
      where: {
        targetId: id,
        AND: [{
          acceptedAt: { not: null }
        }]
      },
      select: { senderId: true }
    });

    return friendShips.map(current => current.senderId);
  }
  
  async processInvitations(sender: number, ids: number[]): Promise<{ forbidden: number[], sent: number[] }> {
    const forbidden = [];
    const sent = [];

    const friendships = await this.prisma.userFriendship.findMany({
      where: {
        senderId: sender,
        AND: [{
          targetId: {
            in: ids,
          },
        }]
      },
      include: {
        target: true,
      }
    });

    for (const friendship of friendships) {
      if (!friendship.acceptedAt) {
        forbidden.push(friendship.target.id);
      } else if (!forbidden.includes(friendship.target.id)) {
        sent.push(friendship.target.id);
      }
    }

    for (const id of ids) {
      if (!forbidden.includes(id) && !sent.includes(id)) {
        forbidden.push(id);
      }
    }

    return { forbidden, sent };
  }

}