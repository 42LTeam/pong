import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ForbiddenException, Inject,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'

@Injectable()
export class isMutedPipe implements PipeTransform {
  constructor(
      @Inject(REQUEST) protected readonly request: Request,
      private prisma: PrismaService) {}

  async transform(channelId: any, _metadata: ArgumentMetadata) {
    let user = await this.request["user"]
    const Until = new Date();
    Until.setMinutes(Until.getMinutes());

    const userChannel = await this.prisma.userChannel.findFirst({
      where: {
        channelId: channelId,
        AND: [{userId: user.id}]
      },
    });


    if (userChannel.isMuted || userChannel.isMuted < Until) {
      throw new ForbiddenException("User is muted for a while in this channel.");
    }
    return channelId;
  }
}
