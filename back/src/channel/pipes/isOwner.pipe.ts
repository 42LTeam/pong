import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ForbiddenException, Inject,
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

    let user = await this.request["user"]
    const userChannel = await this.prisma.userChannel.findFirst({
      where: {
        channelId: channelId,
        AND: [{userId: user.id}]
      },
    });
    console.log ("log- isOwner => userChannel.id = ", user.id, " ==? channelId.creatorId = ", channelId.creatorId)
    console.log ("log- isOwner => userChannel.id = ", userChannel.id, " ==? channelId.creatorId = ", channelId.creatorId)
    if (userChannel.id !== user.creatorId) {
      throw new ForbiddenException("User is not the owner of this channel.");
    }
    return channelId;
  }
}
