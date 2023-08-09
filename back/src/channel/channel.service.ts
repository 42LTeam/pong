import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Channel } from '@prisma/client';
import {CreateChannelDto, SendInviteDto} from "./channel.controller";

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

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
    const response = {
      forbidden: [],
      sent: [],
      success: []
    }

    const {ids, channelId} = body;

    const forbidden = await this.prisma.userFriendship.findMany({
      where: {
        senderId: sender,
        AND: [{
          targetId: {
            in: ids,
          },
        },
        ]
      },
      include: {
        target: true,
      }
    });
    response.forbidden = forbidden.map(f => {
      if(!f.acceptedAt) return f.target.id;
    });
    response.sent = forbidden.map(f => {
      if (!response.forbidden.includes(f.target.id)) return f.target.id;
    });
    response.forbidden = [...response.forbidden, ids.filter(current => {
      if (!response.forbidden.includes(current)
          && !response.sent.includes(current)
          && ids.includes(current)) return current;
    })]

    for(const i of response.sent) {
      await this.addInvite(channelId, i);
      response.success.push(i);
    }
    return response;
  }

  /*

  async createChannel(name: string, password: string, creatorId: number, privated: boolean, created_at: Date): Promise<Channel> {
    return this.prisma.channel.create({
      data: {
        name,
        password,
        creator: {
          connect: { id: creatorId },
        },
        privated,
        created_at,
      },
    });
  }

  async addUserToChannel(userId: number, channelId: number): Promise<UserChannel> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  
    const channel = await this.prisma.channel.findUnique({
      where: { id: channelId },
    });
  
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${channelId} not found.`);
    }
  
    return this.prisma.userChannel.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        channel: {
          connect: {
            id: channelId,
          },
        },
        isAdmin: false,
        isBlocked: false,
        exited: false,
      },
    });
  }
  
  
  
  

  async getAllChannel(): Promise<Channel[]> {
    return this.prisma.channel.findMany({
    });
  }

  async getChannelById(id: number): Promise<Channel | null> {
    return this.prisma.channel.findUnique({
      where: {
        id: id,
      }
    });
  }

  async getChannelByUser(creatorId: number): Promise<Channel[]> {
    return this.prisma.channel.findMany({
        where: {
            creatorId: creatorId,
        }
    });
  }

  async getChannelMessages(id: number): Promise<Channel[]> {
    return this.prisma.channel.findMany({
        where: {
            id: id,
        },
        include: {
            messages: true,
        }
    });
  }
  */

}