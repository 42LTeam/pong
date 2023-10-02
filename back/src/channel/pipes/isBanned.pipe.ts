import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    ForbiddenException, Inject,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'
import {Channel} from "@prisma/client";

@Injectable()
export class isBannedPipe implements PipeTransform {
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

        if (userChannel && userChannel.isBanned === true) {
            throw new ForbiddenException("User is ban of this channel.");
        }

        const channel: Channel | null = await this.prisma.channel.findUnique({
            where: {
                id: channelId,
            },
        });

        if (!channel) {
            throw new ForbiddenException("Channel not found.");
        }
        if (channel.banList.includes(user.id)) {
            throw new ForbiddenException("User is banned from this channel.");
        }

        return channelId

    }
}
//isChannelAdminPipe