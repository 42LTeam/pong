import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

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



  async getAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany({
    });
  }

  async getMessageById(id: number): Promise<Message> {
    return this.prisma.message.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getMessageByUser(userId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        channel: true,
      }
    });
  }

  async getMessageByChannel(userId: number, channelId: number): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        channelId: channelId,
      },
      include: {
        user: {
          select: {
            avatar: true,
          },
        },
      }
    });

    console.log(messages.sort((a,b) => a.id < b.id ? 1 : -1)[0].id)

    await this.prisma.userChannel.updateMany({
      where: {
        userId: userId,
        AND: [{channelId}]
      },
      data: {
        lastRead: messages.sort((a,b) => a.id < b.id ? 1 : -1)[0].id,
      }
    })

    return messages;
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

