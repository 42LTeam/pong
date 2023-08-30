
import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Channel } from '@prisma/client';
import { CreateChannelDto, SendInviteDto } from "./controllers/channel.controller";
import { FriendService } from '../friend/friend.service';
import { MessageService } from "../message/message.service";


@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FriendService))
    private friendService: FriendService,
    private messageService: MessageService
  ) {}

  async addInvite(id, userId){
    const newUser = await this.prisma.userChannel.create({
      data: {
        userId: userId,
        channelId: id,
      }
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

  async createChannel(body : CreateChannelDto): Promise<any> {
    const {
      name,
      password,
      conv,
      creatorId,
    } = body;
  
    const channel = await this.prisma.channel.create({
      data: {
        name,
        password,
        conv,
        creator: {
          connect: { id: creatorId },
        },
        created_at: new Date(),
        users: {
          create: {
            userId: creatorId,
            isAdmin: true,
          }
        }
      },
      select: {
        id: true,
        creatorId: true,
        users: {
          where: {
            userId: {
              not: creatorId,
            }
          }
        },
        messages: true,
      }
    });
    return this.addInvite(channel.id, creatorId);
  }
  


  async sendInvite(sender: number, body: SendInviteDto) {
    const { ids, channelId } = body;

    const { forbidden, sent } = await this.friendService.processInvitations(sender, ids);
    
    const success = [];
    for (const i of sent) {
      await this.addInvite(channelId, i);
      success.push(i);
    }

    return {
      forbidden,
      sent,
      success
    };
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
          }
        }
      }
    });
    return channel.map(current => current.user);
  }

  async getChannelAllMembers(channelId: number): Promise<any> {
    return this.prisma.userChannel.findMany({
      where: {
        channelId: channelId,
      },
      include: {
        user: {
          select: {
            avatar: true,
            username: true,
            status: true,
          },
        },
      }
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
      }
    });
    const ids = userChannel.map(current => current.channelId);
    const lastRead = userChannel.map(current => current.lastRead);
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
            }
          },
          select: {
            user: {
              select: {
                avatar: true,
                id: true,
                username: true,
              }
            },
          }
        },
        messages: {
          take: 100,
        },
      }
    });

    const mapFunc = async (current) => {
      return {
        ...current,
        lastRead: lastRead[ids.indexOf(current.id)],
        lastMessage: (await this.messageService.getLastMessageInChannel(current.id))}
    }

    return Promise.all(channels.map(mapFunc));
  }

    async getConversation(userId: number, friendId: number): Promise<any> {
      const conversation = await this.prisma.channel.findMany({
        where: {
          conv: true,
          AND: [{
            creatorId: {
              in: [userId, friendId]
            }
          }]
        },
        select: {
          id: true,
          creatorId: true,
          users: {
            where:{
              id: {
                not: userId,
              }
            }
          },
          messages: true,
        }
      });

      if (conversation.length) return conversation[0];


      const newConv = await this.prisma.channel.create({
        data: {
          conv: true,
          creator: {
            connect: {
              id: userId,
            }
          },
          created_at: new Date(),
        }
      });
      await this.addInvite(newConv.id, userId);
      return this.addInvite(newConv.id, friendId);
    }

    async banUserFromChannel(channelId: number, userId: number): Promise<any> {
      const banUntil = new Date();
      banUntil.setMinutes(banUntil.getMinutes() + 5);
    
      return this.prisma.userChannel.updateMany({
        where: { channelId: channelId, userId: userId },
        data: { isBanned: banUntil },
      });
    }
    
    async isUserBannedFromChannel(channelId: number, userId: number): Promise<boolean> {
      const userChannel = await this.prisma.userChannel.findFirst({
        where: { channelId: channelId, userId: userId },
      });
      
      const currentDateTime = new Date();
      const banUntil = userChannel.isBanned;
    
      return banUntil !== null && banUntil > currentDateTime;
    }
  
    async muteUserFromChannel(channelId: number, userId: number): Promise<any> {
      const muteUntil = new Date();
      muteUntil.setMinutes(muteUntil.getMinutes() + 5);
    
      return this.prisma.userChannel.updateMany({
        where: { channelId: channelId, userId: userId },
        data: { isMuted: muteUntil },
      });
    }

    async isUserMutedFromChannel(channelId: number, userId: number): Promise<boolean> {
      const userChannel = await this.prisma.userChannel.findFirst({
        where: { channelId: channelId, userId: userId },
      });
      
      const currentDateTime = new Date();
      const muteUntil = userChannel.isMuted;
    
      return muteUntil !== null && muteUntil > currentDateTime;
    }
}