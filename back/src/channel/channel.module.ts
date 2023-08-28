import { forwardRef, Module } from '@nestjs/common';
import { ChannelController } from "./controllers/channel.controller";
import { ChannelService } from "./channel.service";
import { PrismaModule } from "../prisma/prisma.module";
import { FriendService } from '../friend/friend.service';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';
import {ConversationController} from "./controllers/conversation.controller";
import {MessageModule} from "../message/message.module";
import {MessageService} from "../message/message.service";
import { IsAdminPipe } from './pipes/isAdmin.pipe';

@Module({
    controllers: [ChannelController, ConversationController],
    providers: [ChannelService, FriendService, MessageService, IsAdminPipe],
    imports: [PrismaModule, forwardRef(() => FriendModule), UserModule, MessageModule],
    exports: [ChannelService]
})
export class ChannelModule {}
