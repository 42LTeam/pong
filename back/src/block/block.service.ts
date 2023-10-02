import {Body, Injectable, Put, Req} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Block } from "@prisma/client";
import { User } from "@prisma/client";
import {ApiBody, ApiOperation} from "@nestjs/swagger";
import {UserSerializer} from "../user/user.serializer";

@Injectable()
export class BlockService {
  constructor(private prisma: PrismaService) {}

  async createBlockRequest(
    blockerId: number,
    blockedId: number
  ): Promise<Block> {

    if (blockerId == blockedId) {
      throw new Error("Both blockerId and blockedId shouldn't be the same");
    }
    const existingBlock = await this.prisma.block.findFirst({
      where: {
        blockerId: blockerId,
        blockedId: blockedId,
      },
    });
    if (existingBlock) {
      throw new Error("User is already blocked");
    }
    return this.prisma.block.create({
      data: {
        blockerId,
        blockedId,
      },
    });
  }

  async getBlockedUsers(blockerId: number): Promise<User[]> {
    const blocks = await this.prisma.block.findMany({
      where: { blockerId: blockerId },
      include: { receivedBy: true },
    });

    if (!blocks) throw new Error("No blocked users found");

    return blocks.map((block) => UserSerializer.serialize(block.receivedBy));
  }

  async getBlocksOfUser(id: number): Promise<User[]> {
    const blocks = await this.prisma.block.findMany({
      where: { blockerId: id },
      include: { receivedBy: true },
    });

    if (!blocks) throw new Error("No blocked users found");

    return blocks.map((block) => UserSerializer.serialize(block.receivedBy));
  }


  async removeBlockRequest(
    blockerId: number,
    blockedId: number
  ): Promise<Block> {
    const existingBlock = await this.prisma.block.findFirst({
      where: {
        blockerId: blockerId,
        blockedId: blockedId,
      },
    });

    if (!existingBlock) {
      throw new Error("No block found to remove");
    }

    return this.prisma.block.delete({
      where: {
        id: existingBlock.id,
      },
    });
  }

}




