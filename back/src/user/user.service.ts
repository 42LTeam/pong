import {Injectable, ParseIntPipe, Query} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(@Query('id', ParseIntPipe) id: number, username: string, secretO2FA: string, avatar: string, xp: number): Promise<any> {
    const uniq = await this.getUserById(id);
    if (!uniq)
      return this.prisma.user.create({
        data: {
          id,
          username,
          secretO2FA,
          avatar,
          xp
        },
      });
    return 'ID already taken';
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }


  async getUserById(@Query('id', ParseIntPipe) id: any) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
