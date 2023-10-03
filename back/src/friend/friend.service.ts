import { ForbiddenException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { UserFriendship } from "@prisma/client";

@Injectable()
export class FriendService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  async createFriendRequest(
    initiatorId: number,
    acceptorId: number
  ): Promise<UserFriendship> {
    if (initiatorId == acceptorId)
      throw new ForbiddenException("Both initiatorId and acceptorId shouldn't be the same");

    const exists = await this.prisma.user.findUnique({
      where:{
        id: acceptorId,
      }
    });
    if (!exists){
      throw new ForbiddenException("Target of request does not exist");
    }

    const oldFriendship = await this.prisma.userFriendship.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                senderId: initiatorId,
              },
              {
                targetId: acceptorId,
              },
            ],
          },
          {
            AND: [
              {
                targetId: initiatorId,
              },
              {
                senderId: acceptorId,
              },
            ],
          },
        ],
      },
    });
    if (oldFriendship.length > 0) return null;
    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: initiatorId,
        targetId: acceptorId,
      },
    });

    await this.userService.addFriendship(acceptorId, userFriendship);
    return userFriendship;
  }

  async acceptFriendRequest(
    acceptorId,
    friendshipId: number
  ): Promise<UserFriendship> {
    const friendship = await this.prisma.userFriendship.findUnique({
      where: {
        id: friendshipId,
      },
    });
    if (!friendship) {
      throw new ForbiddenException("friendship with this id does not exist");
    }

    if (friendship.targetId != acceptorId)
      throw new ForbiddenException("Both acceptorId and targetId should be the same");
    await this.prisma.userFriendship.update({
      where: {
        id: friendshipId,
      },
      data: {
        acceptedAt: new Date(),
      },
    });
    const userFriendship = await this.prisma.userFriendship.create({
      data: {
        senderId: acceptorId,
        targetId: friendship.senderId,
        acceptedAt: new Date(),
      },
    });

    await this.userService.addFriendship(friendship.senderId, userFriendship);
    return userFriendship;
  }

  async declineFriendRequest(acceptorId, friendshipId: number) {
    const exists = await this.prisma.userFriendship.findUnique({
      where:{
        id: friendshipId,
      }
    });
    if (!exists){
      throw new ForbiddenException("Friendship with this id does not exist");
    }
    
    return this.prisma.userFriendship.delete({
      where: {
        id: friendshipId,
      },
    });
  }

  async getUserFriendships(id: number): Promise<number[]> {
    const friendShips = await this.prisma.userFriendship.findMany({
      where: {
        targetId: id,
        AND: [
          {
            acceptedAt: { not: null },
          },
        ],
      },
      select: { senderId: true },
    });

    return friendShips.map((current) => current.senderId);
  }

  async removeFriendship(removerId: number, friendId: number) {
    await this.prisma.userFriendship.deleteMany({
      where: {
        senderId: friendId,
        AND: [
          {
            targetId: removerId,
          },
        ],
      },
    });
    return this.prisma.userFriendship.deleteMany({
      where: {
        senderId: removerId,
        AND: [
          {
            targetId: friendId,
          },
        ],
      },
    });
  }
}
