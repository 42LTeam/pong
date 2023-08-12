import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Channel } from '@prisma/client';
import { CreateChannelDto, SendInviteDto } from "./channel.controller";
import { FriendService } from '../friend/friend.service';

@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FriendService))
    private friendService: FriendService) {}

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

  async createChannel(body : CreateChannelDto): Promise<Channel> {
    const {
      name,
      password,
      creatorId,
    } = body;



    const channel = await this.prisma.channel.create({
      data: {
        name,
        password,
        creator: {
          connect: { id: creatorId },
        },
        created_at: new Date(),
      },
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

  async getUserInChannel(channelId: number): Promise<any> {
    const channel = await this.prisma.userChannel.findMany({
      where: { channelId },
      select: {
        user: true
      }
    });
    return channel.map(current => current.user);
  }

  async getChannelOfuser(id: number): Promise<Channel[]> {
    const userChannel = await this.prisma.userChannel.findMany({
      where: {
        userId: id,
      },

    });

    const ids = userChannel.map(current => current.channelId);
    return this.prisma.channel.findMany({
      where: {
        id: {
          in: ids,
        },
      }
    })
  }

}