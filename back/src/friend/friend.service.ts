import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {UserFriendship} from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class FriendService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService) {}

async createFriendRequest(initiatorId: number, acceptorId: number): Promise<UserFriendship> {
    if (initiatorId == acceptorId)
      throw new Error('Both initiatorId and acceptorId shouldn\'t be the same');

    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: initiatorId,
        targetId: acceptorId,
      }
    });

    await this.userService.addFriendship(acceptorId, userFriendship);
    return userFriendship;
  }

  async acceptFriendRequest(acceptorId, friendshipId: number): Promise<UserFriendship> {

    const friendship = await this.prisma.userFriendship.findUnique({
      where: {
        id: friendshipId
      },
    });
    if (friendship.targetId != acceptorId)
      throw new Error('Both acceptorId and targetId should be the same');
    await this.prisma.userFriendship.update({
      where: {
        id: friendshipId
      },
      data:{
        acceptedAt: new Date(),
      }
    })
    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: acceptorId,
        targetId: friendship.senderId,
        acceptedAt: new Date(),
      }
    });

    await this.userService.addFriendship(friendship.senderId, userFriendship);
    return userFriendship;
  }


  declineFriendRequest(acceptorId, friendshipId: number) {
    return this.prisma.userFriendship.delete({
      where: {
        id: friendshipId,
      }
    })
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


  async removeFriendship(removerId: number, friendId: number) {
    await this.prisma.userFriendship.deleteMany({
      where: {
        senderId: friendId,
        AND: [{
          targetId: removerId,
        }]
      }
    });
    return this.prisma.userFriendship.deleteMany({
      where: {
        senderId: removerId,
        AND: [{
          targetId: friendId,
        }]
      }
    });
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