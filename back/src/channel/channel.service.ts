import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Channel } from '@prisma/client';

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