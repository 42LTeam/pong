import {ForbiddenException, forwardRef, Inject, Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateChannelDto,
  SendInviteDto,
} from "./controllers/channel.controller";
import { FriendService } from "../friend/friend.service";
import { MessageService } from "../message/message.service";
import { Channel } from "@prisma/client";
import { checkPassword, hashPassword } from "../auth/password.utils";

@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FriendService))
    private friendService: FriendService,
    private messageService: MessageService
  ) {}

  async addInvite(id, userId) {
    const newUser = await this.prisma.userChannel.create({
      data: {
        userId: userId,
        channelId: id,
      },
    });
    const channel = await this.prisma.channel.findUnique({
      where: { id: id },
      include: { users: true },
    });

    const updatedChannelUsers = [...channel.users, newUser];
    return this.prisma.channel.update({
      where: { id: id },
      data: { users: { set: updatedChannelUsers } },
    });
  }

  async createChannel(creatorId, body: CreateChannelDto): Promise<any> {
    let { name, password, conv, privated } = body;
    if (password) password = await hashPassword(password);
    return this.prisma.channel.create({
      data: {
        name,
        password,
        conv,
        privated,
        creator: {
          connect: { id: creatorId },
        },
        created_at: new Date(),
        users: {
          create: {
            userId: creatorId,
            isAdmin: true,
            isOwner: true,
          },
        },
      },
      select: {
        id: true,
        creatorId: true,
        users: {
          where: {
            userId: {
              not: creatorId,
            },
          },
        },
        messages: true,
      },
    });
  }

  async sendInvite(body: SendInviteDto) {
    const { ids, channelId, usernames } = body;

    if (usernames) {
      const users = await this.prisma.user.findMany({
        where: {
          username: {
            in: usernames,
          },
        },
        select: {
          id: true,
        },
      });
      for (const i of users.map((c) => c.id)) {
        await this.addInvite(channelId, i);
      }
    }

    for (const i of ids) {
      await this.addInvite(channelId, i);
    }
  }

  // rename with All attribute and not just s
  async getAllUsersInChannel(channelId: number): Promise<any> {
    const channel = await this.prisma.userChannel.findMany({
      where: { channelId },
      select: {
        user: {
          select: {
            id: true,
            avatar: true,
            username: true,
            xp: true,
            status: true,
            session: true,
          },
        },
      },
    });
    return channel.map((current) => current.user);
  }

  async getAllUserChannelsInChannel(channelId: number): Promise<any> {
    return this.prisma.userChannel.findMany({
      where: {
        channelId: channelId,
      },
      select: {
        id: true,
        userId: true,
        isAdmin: true,
        isBlocked: true,
        isMuted: true,
        isBanned: true,
        isOwner: true,
        channel: {
          select: {
            creatorId: true
          }
        },
        user: {
          select: {
            session: true,
            avatar: true,
            username: true,
            status: true,
            id: true,
          },
        },
      },
    });
  }

  //rename getChannelOfuser in getChannelOfUser
  async getChannelOfUser(id: number): Promise<Channel[]> {
    const userChannel = await this.prisma.userChannel.findMany({
      where: {
        userId: id,
      },
      select: {
        channelId: true,
        lastRead: true,
      },
    });
    const ids = userChannel.map((current) => current.channelId);
    const lastRead = userChannel.map((current) => current.lastRead);
    const channels = await this.prisma.channel.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        conv: true,
        name: true,
        users: {
          take: 10,
          where: {
            userId: {
              not: id,
            },
          },
          select: {
            user: {
              select: {
                avatar: true,
                id: true,
                username: true,
              },
            },
          },
        },
        messages: {
          take: 100,
        },
      },
    });

    const mapFunc = async (current) => {
      return {
        ...current,
        lastRead: lastRead[ids.indexOf(current.id)],
        lastMessage: await this.messageService.getLastMessageInChannel(
          current.id
        ),
      };
    };

    return Promise.all(channels.map(mapFunc));
  }

  async getConversation(userId: number, friendId: number): Promise<any> {
    const conversation = await this.prisma.channel.findMany({
      where: {
        conv: true,
        users: {
          some: {
            userId: userId,
          },
        },
        AND: {
          users: {
            some: {
              userId: friendId,
            },
          },
        },
      },
      select: {
        id: true,
        creatorId: true,
        users: true,
        messages: true,
      },
    });
    const validConversation = conversation.filter(
      (conv) => conv.users.length === 2
    );

    if (validConversation.length) return validConversation[0];

    const newConv = await this.prisma.channel.create({
      data: {
        conv: true,
        creator: {
          connect: {
            id: userId,
          },
        },
        created_at: new Date(),
      },
    });
    await this.addInvite(newConv.id, userId);
    return this.addInvite(newConv.id, friendId);
  }

  async removeUserFromChannel(channelId: number, userId: number): Promise<any> {
    // Get the channel and its users
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId },
      include: { users: true },
    });

    // Check if it's a private conversation and there are only two users
    // if (channel.conv && channel.users.length === 2)
    console.log(channel.users.length);
    if (channel.users.length === 2) {
      // Delete all references to the channel in the UserChannel table
      await this.prisma.userChannel.deleteMany({
        where: { channelId: channelId },
      });

      // Delete all messages associated with the channel
      await this.prisma.message.deleteMany({
        where: { channelId: channelId },
      });

      // Delete the channel
      await this.prisma.channel.delete({
        where: { id: channelId },
      });
    } else {
      // Remove the user from the channel
      await this.prisma.userChannel.deleteMany({
        where: {
          channelId: channelId,
          userId: userId,
        },
      });
    }
  }

  async banUserFromChannel(channelId: number, userId: number): Promise<any> {
    return this.prisma.userChannel.updateMany({
      where: {
        channelId: channelId,
        userId: userId,
      },
      data: {
        isBanned: true,
      },
    });
  }

  //TODO if we want to unban
  // async unBanUserFromChannel(channelId: number, userId: number): Promise<any> {
  //   return this.prisma.userChannel.updateMany({
  //     where: {
  //       channelId: channelId,
  //       userId: userId,
  //     },
  //     data: {
  //       isBanned: false
  //     },
  //   });
  // }

  async ownerMakeAdmin(channelId: number, userId: number): Promise<any> {
    return this.prisma.userChannel.updateMany({
      where: {
        channelId: channelId,
        userId: userId,
      },
      data: {
        isAdmin: true,
      },
    });
  }
  async muteUserFromChannel(channelId: number, userId: number): Promise<any> {
    const muteUntil = new Date();
    muteUntil.setMinutes(muteUntil.getMinutes() + 1);
    return this.prisma.userChannel.updateMany({
      where: { channelId: channelId, userId: userId },
      data: { isMuted: muteUntil },
    });
  }

  async isUserMutedFromChannel(
    channelId: number,
    userId: number
  ): Promise<boolean> {
    const userChannel = await this.prisma.userChannel.findFirst({
      where: { channelId: channelId, userId: userId },
    });

    const currentDateTime = new Date();
    const muteUntil = userChannel.isMuted;

    return muteUntil !== null && muteUntil > currentDateTime;
  }

  async setChannelPassword(
    channelId: number,
    newPassword: string
  ): Promise<Channel> {
    const hashedPassword = await hashPassword(newPassword);
    return this.prisma.channel.update({
      where: { id: channelId },
      data: { password: hashedPassword },
    });
  }

  async getPublicChannels(userId: number): Promise<Channel[]> {

    const channels = this.prisma.channel.findMany({
      where: {
        privated: false,
        conv: false,
        NOT: {
          users: {
            some: {
              userId: userId,
            }
          }
        }
      },
    });
    console.log("getPublicChannels => channels:", channels)
    return channels
  }

  async validateChannelPassword(
    channelId: number,
    inputPassword: string
  ): Promise<boolean> {
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId },
    });

    if (!channel || !channel.password) {
      throw new Error("Channel not found or doesn't have a password.");
    }
    return checkPassword(inputPassword, channel.password);
  }

  async joinChannel(channelId: number, userId: number): Promise<any> {
    const existingUserChannel = await this.prisma.userChannel.findMany({
      where: {
        AND: [
          { userId: userId },
          { channelId: channelId },
        ],
      },
    });
    if (Array.isArray(existingUserChannel) && existingUserChannel.length > 0) {
      throw new Error("User is already part of the channel");
    }
    return this.prisma.userChannel.create({
      data: {
        userId: userId,
        channelId: channelId,
      },
    });
  }
}
