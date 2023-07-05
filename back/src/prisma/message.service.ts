import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(id: number, user: number, channel: number, text: string): Promise<Message> {
    return this.prisma.message.create({
      data: {
        id,
        user,
        channel,
        text,
      },
    });
  }

  async getAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany();
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

  async getMessageByChannel(channel: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        channel: channel,
      },
    });
  }
}
