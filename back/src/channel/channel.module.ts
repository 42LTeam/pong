import { forwardRef, Module } from '@nestjs/common';
import { ChannelController } from "./controllers/channel.controller";
import { ChannelService } from "./channel.service";
import { PrismaModule } from "../prisma/prisma.module";
import { FriendService } from '../friend/friend.service';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';
import {ConversationController} from "./controllers/conversation.controller";

@Module({
    controllers: [ChannelController, ConversationController],
    providers: [ChannelService, FriendService],
    imports: [PrismaModule, forwardRef(() => FriendModule), UserModule],
    exports: [ChannelService]
})
export class ChannelModule {}
