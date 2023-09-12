import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Message } from "@prisma/client";

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(
    userId: number,
    channelId: number,
    content: string
  ): Promise<Message> {
    return this.prisma.message.create({
      data: {
        userId,
        channelId,
        content,
        readBy: {
          connect: {
            id: userId,
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
      },
    });
  }

  async getAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany({});
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
      },
    });
  }

  async getMessageByChannel(
    userId: number,
    channelId: number
  ): Promise<{ lastRead: number; messages: Message[] }> {
    const messages = await this.prisma.message.findMany({
      where: {
        channelId: channelId,
      },
      include: {
        user: {
          select: {
            avatar: true,
            id: true,
          },
        },
      },
    });
    const userChanel = await this.prisma.userChannel.findFirst({
      where: {
        userId,
        channelId,
      },
      select: {
        lastRead: true,
      },
    });
    if (!userChanel) {
      return { lastRead: null, messages: [] };
    }
    const lastRead = userChanel?.lastRead || 0;

    if (messages.length == 0) return { messages: [], lastRead };

    return { lastRead, messages };
  }

  async isMessageReadByUser(
    messageId: number,
    userId: number
  ): Promise<boolean> {
    const message = await this.prisma.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        readBy: true,
      },
    });

    if (!message) {
      throw new Error("Message not found");
    }

    return message.readBy.some((user) => user.id === userId);
  }

  async getLastMessageInChannel(channelId: number): Promise<any> {
    const lastMessage = await this.prisma.message.findMany({
      where: { channelId },
      orderBy: [
        {
          id: "desc",
        },
      ],
    });

    if (!lastMessage) {
      return null;
    }

    return lastMessage[0];
  }

  async readMessage(id, body) {
    return this.prisma.userChannel.updateMany({
      where: {
        userId: id,
        AND: [
          {
            channelId: body.channelId,
          },
        ],
      },
      data: {
        lastRead: body.messageId,
      },
    });
  }
}
