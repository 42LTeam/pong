import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  async createMessage(userId: number, channelId: number, content: string): Promise<Message> {
    return this.prisma.message.create({
      data: {
        userId,
        channelId,
        content,
        readBy: {
          connect: {
            id: userId
          },
        },
      },
      include: {
        user: {
          select: {
            avatar: true,
            username: true,
          },
        },
      }
    });
  }



  async getAllMessages(page: number = 1): Promise<Message[]> {
    const skip = (page - 1) * 100;
    return this.prisma.message.findMany({
      skip: skip,
      take: 100,
    });
  }


  async getMessageById(id: number): Promise<Message> {
    return this.prisma.message.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getMessageByUser(userId: number, page: number = 1): Promise<Message[]> {
    const skip = (page - 1) * 100;
    return this.prisma.message.findMany({
      where: {
        userId: userId,
      },
      skip: skip,
      take: 100,
      include: {
        user: true,
        channel: true,
      }
    });
  }


  async getMessageByChannel(channelId: number, page: number = 1): Promise<Message[]> {
    const skip = (page - 1) * 100;
    return this.prisma.message.findMany({
      where: {
        channelId: channelId,
      },
      skip: skip,
      take: 100,
      include: {
        user: {
          select: {
            avatar: true,
          },
        },
      }
    });
  }


  async isMessageReadByUser(messageId: number, userId: number): Promise<boolean> {
    const message = await this.prisma.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        readBy: true,
      },
    });

    if (!message) {
      throw new Error('Message not found');
    }

    return message.readBy.some(user => user.id === userId);
  }

  async getLastMessageInChannel(channelId: number) {
    const lastMessage = await this.prisma.message.findFirst({
      where: { channelId },
      orderBy: { created_at: 'desc' },
    });

    if (!lastMessage) {
      throw new Error(`No messages found for channel id: ${channelId}`);
    }

    return lastMessage;
  }
}

