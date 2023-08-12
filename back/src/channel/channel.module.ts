import {Module} from "@nestjs/common";
import {ChannelController} from "./channel.controller";
import {ChannelService} from "./channel.service";
import {PrismaModule} from "../prisma/prisma.module";
import { FriendService } from "src/friend/friend.service";

@Module({
    controllers: [ChannelController],
    providers: [ChannelService, FriendService],
    imports: [PrismaModule],
    exports: [ChannelService]

})
export class ChannelModule {}