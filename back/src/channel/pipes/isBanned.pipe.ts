import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    ForbiddenException, Inject,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'

@Injectable()
export class IsChannelAdminPipe implements PipeTransform {
    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        private prisma: PrismaService) {
    }

    async transform(value: any, _metadata: ArgumentMetadata) {
        const {channelId, userId} = value;
        let user = this.request["user"]
        console.log("User from request = ", user, " User.id = ", user.id)
        const selectBanUser = await this.prisma.userChannel.findFirst({
            where: {channelId: channelId, userId: user.id},
        });

        const userChannel = await this.prisma.userChannel.findFirst({
            where: {channelId: channelId, userId: userId},
        });

        if (!userChannel.isAdmin) {
            throw new ForbiddenException("User is not an admin of this channel.");
        }
        return value
    }
}
//isChannelAdminPipe