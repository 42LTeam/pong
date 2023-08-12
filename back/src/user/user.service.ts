import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {Channel, Status, User} from '@prisma/client';
import { FriendService } from 'src/friend/friend.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private friendService: FriendService) {}

  async createUser(id: number, username: string, secretO2FA: string, avatar: string, xp: number): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: id,
        username: username,
        secretO2FA: secretO2FA,
        avatar: avatar,
        xp: xp,
      }
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUserAvatar(id: number, avatar: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        avatar: avatar
      },
    });
  }

  async updateUserName(id: number, username: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        username: username
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async getFriendsOfUser(id: number, options: { startWith?: string, online?: boolean } = {}): Promise<User[]> {
    const ids = await this.friendService.getUserFriendships(id);

    return this.prisma.user.findMany({
      where: {
        id: { in: ids },
        AND: [
            (options.online ? { status: "ONLINE" } : {}), 
            (options.startWith ? { username: { startsWith: options.startWith } } : {})
        ]
      }
    });
  }

  async search(id, query: string): Promise<User[]>{
    return this.prisma.user.findMany({
      where : {
        username: {
          startsWith: query,
        },
        AND: [{
          id: {
            not: id,
          }
        }]

      }
    });
  }

  async getUserStatusById(id: number): Promise<Status> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!user) {
      throw new Error(`No user found for id: ${id}`);
    }

    return user.status;
  }

  async updateUserStatusById(id: number, newStatus: Status): Promise<Status> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { status: newStatus },
    });

    return user.status;
  }

}

