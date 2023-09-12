import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ForbiddenException, Inject,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'

@Injectable()
export class IsInChannelPipe implements PipeTransform {
  constructor(
      @Inject(REQUEST) protected readonly request: Request,
      private prisma: PrismaService) {}

  async transform(value: any, _metadata: ArgumentMetadata) {
    const {channelId} = value;
    let user = this.request["user"]
    console.log("isInChannelPipe: User from request = ", user, " User.id = ", user.id)
    const userChannel = await this.prisma.userChannel.findFirst({
      where: {channelId: channelId, userId: user.id},
    });

    if (!userChannel) {
      throw new ForbiddenException("User is not in this channel.");
    }
    return value;
  }
}
