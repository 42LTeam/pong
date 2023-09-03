// import { Injectable, PipeTransform, ArgumentMetadata, ForbiddenException } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';

// @Injectable()
// export class IsBannedPipe implements PipeTransform {
//   constructor(private prisma: PrismaService) {}

//   async transform(value: any, _metadata: ArgumentMetadata) {
//     const { channelId, userId } = value;

//     const userChannel = await this.prisma.userChannel.findFirst({
//       where: { channelId: channelId, userId: userId },
//     });

//     if (userChannel.isBanned && new Date(userChannel.isBanned) > new Date()) {
//       throw new ForbiddenException('User is banned from this channel.');
//     }

//     return value;
//   }
// }
