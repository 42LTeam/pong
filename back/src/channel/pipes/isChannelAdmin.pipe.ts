import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ForbiddenException, Inject,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'

@Injectable()
export class isChannelAdminPipe implements PipeTransform {
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


    if (!userChannel.isAdmin) {
      throw new ForbiddenException("User is not an admin of this channel.");
    }
    return channelId;
  }
}
