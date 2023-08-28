import { Injectable, PipeTransform, ArgumentMetadata, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IsAdminPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { channelId, userId } = value;

    const userChannel = await this.prisma.userChannel.findFirst({
      where: { channelId: channelId, userId: userId },
    });

    if (!userChannel) {
      throw new ForbiddenException('Channel does not exist or user is not part of the channel.');
    }

    if (!userChannel.isAdmin) {
      throw new ForbiddenException('User is not an admin of this channel.');
    }

    return value;
  }
}
