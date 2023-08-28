// import { Injectable, PipeTransform, ArgumentMetadata, ForbiddenException } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';

// @Injectable()
// export class IsAdminPipe implements PipeTransform {
//   constructor(private prisma: PrismaService) {}

//   async transform(value: any, metadata: ArgumentMetadata) {
//     const { channelId, userId } = value;

//     const channel = await this.prisma.channel.findUnique({
//       where: { id: channelId },
//       include: { admins: true },
//     });

//     if (!channel) {
//       throw new ForbiddenException('Channel does not exist.');
//     }

//     const isAdmin = channel.admins.some(admin => admin.id === userId);

//     if (!isAdmin) {
//       throw new ForbiddenException('User is not an admin of this channel.');
//     }

//     return value;
//   }
// }
