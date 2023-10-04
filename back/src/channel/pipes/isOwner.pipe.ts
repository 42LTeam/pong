import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ForbiddenException, Inject, NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'

@Injectable()
export class isOwnerPipe implements PipeTransform {
  constructor(
      @Inject(REQUEST) protected readonly request: Request,
      private prisma: PrismaService) {
  }

  async transform(channelId: any, _metadata: ArgumentMetadata) {
    const exist = await this.prisma.userChannel.findFirst({
      where: {
        channelId: channelId,
      },
    })
    if (!exist) {
      throw new NotFoundException("Channel doest not exist");
    }

    let user = await this.request["user"]
    const userChannel = await this.prisma.userChannel.findFirst({
      where: {
        channelId: channelId,
        AND: [{userId: user.id}]
      },
    });
    if (userChannel.isOwner === false) {
      throw new ForbiddenException("User is ban of this channel.");
    }
    return channelId
  }
}
