import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ForbiddenException, Inject,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'

@Injectable()
export class isInChannelPipe implements PipeTransform {
  constructor(
      @Inject(REQUEST) protected readonly request: Request,
      private prisma: PrismaService) {}

  async transform(channelId: any, _metadata: ArgumentMetadata) {
    let user = await this.request["user"]

    console.log("isInChannelPipe: User from request = ", user)
    const userChannel = await this.prisma.userChannel.findFirst({
      where: {
        channelId: channelId,
        AND: [{userId: user.id}]
      },
    });

    console.log("isInChannelPipe: userChannel = ", userChannel)

    if (!userChannel || userChannel.isBanned) {
      throw new ForbiddenException("User is not in this channel.");
    }
    return channelId;
  }
}
