import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {Status, User, UserFriendship} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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




  async getFriendsOfUser(id: number): Promise<UserFriendship[]> {
    const user = this.prisma.user.findUnique({
      where : {
        id
      },
      select: {
        userFriendships: true,
      }
    });
    const friendship = await user.userFriendships();
    return friendship;
  
  }


  async getOnlineFriendsOfUser(id: number) {


    const friendsUserFriendships = await this.prisma.userFriendship.findMany({
      where: {
        senderId: { not: id }
      },
    });


    return this.prisma.user.findMany({
      where: { id: { in: [4] }, status: Status.ONLINE },
    });
  }

  async search(query: string): Promise<User[]>{
    return this.prisma.user.findMany({
      where : {
        username: {
          startsWith: query,
        }
      }
    });
  }

  async getBlocksOfUser(id: number): Promise<User[]> {
    const blocks = await this.prisma.block.findMany({
        where: { blockerId: id },
        include: { receivedBy: true }
    });

    if (!blocks) throw new Error("No blocked users found");

    return blocks.map(block => block.receivedBy);

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

