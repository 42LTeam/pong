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

    let testAdminUser = await this.request["user"]
    const isAdminInChannelId = await this.prisma.userChannel.findFirst({
      where: {channelId: channelId, userId: testAdminUser.id},
    });

    // console.log("log- IsChannelAdminPipe => testAdminUser = ", testAdminUser)
    // console.log("log- IsChannelAdminPipe => isAdminInChannelId = ", isAdminInChannelId)
    // console.log("log- IsChannelAdminPipe => isAdminInChannelId.isAdmin = ", isAdminInChannelId.isAdmin)

    if (!isAdminInChannelId.isAdmin) {
      throw new ForbiddenException("User is not an admin of this channel.");
    }
    return channelId;
  }
}
