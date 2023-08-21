
import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Channel } from '@prisma/client';
import { CreateChannelDto, SendInviteDto } from "./controllers/channel.controller";
import { FriendService } from '../friend/friend.service';
import { MessageService } from "../message/message.service";
import { FriendService } from '../friend/friend.service';


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
    await this.prisma.channel.update({
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
      },
      select: {
        id: true,
        creatorId: true,
        users: true,
        messages: true,
      }
    });
    await this.addInvite(channel.id, creatorId);
    return channel;
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
          users: true,
          messages: true,
        }
      });

      for (const conversationElement of conversation) {
        const other = conversationElement.creatorId == userId ? friendId : userId;
        const ret = await this.prisma.userChannel.findFirst({
          where: {
            channelId: conversationElement.id,
            AND: [{
              userId: other,
            }]
          },
          select: {
            channel: true,
          }
        });
        if (ret) return conversationElement;
      }

      const newConv = await this.createChannel({conv: true, creatorId: userId});
      await this.sendInvite(userId, {channelId: newConv.id, ids: [friendId]});
      return newConv;
    }
}