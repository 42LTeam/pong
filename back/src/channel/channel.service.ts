import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Channel, UserChannel } from '@prisma/client';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

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
}