import {
    Injectable,
    PipeTransform,
    ArgumentMetadata,
    ForbiddenException, Inject,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { REQUEST } from '@nestjs/core'

@Injectable()
export class isBannedPipe implements PipeTransform {
    constructor(
        @Inject(REQUEST) protected readonly request: Request,
        private prisma: PrismaService) {
    }

    async transform(channelId: any, _metadata: ArgumentMetadata) {

        let user = await this.request["user"]
        console.log("log isBannedPipe - User from request = ", user)
        console.log("log isBannedPipe - User.id = ", user.id)
        const userChannel = await this.prisma.userChannel.findFirst({
            where: {channelId: channelId, userId: user.id},
        });

        console.log("isBannedPipe: userChannel = ", userChannel)

        if (userChannel.isBanned === true) {
            throw new ForbiddenException("User is ban of this channel.");
        }
        return channelId
    }
}
//isChannelAdminPipe