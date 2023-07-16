import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(user: number, channel: number, text: string): Promise<Message> {
    return this.prisma.message.create({
      data: {
        user,
        channel,
        text,
      },
    });
  }

  async getAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany({
      select: {
        id: true,
        user: true,
        channel: true,
        text: true,
        created_at: true
      }
    });
  }
  


  async getMessageById(id: number): Promise<Message> {
    return this.prisma.message.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getMessageByUser(user: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        user: user,
      },
    });
  }

  async getMessageByChannel(channel_requested: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        channel: channel_requested,
      },
      select: {
        id: true,
        user: true,
        channel: true,
        text: true,
        created_at: true
      }
    });
  }
}
