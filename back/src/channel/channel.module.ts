import { forwardRef, Module } from '@nestjs/common';
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { PrismaModule } from "../prisma/prisma.module";
import { FriendService } from '../friend/friend.service';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';

@Module({
    controllers: [ChannelController],
    providers: [ChannelService, FriendService],
    imports: [PrismaModule, forwardRef(() => FriendModule), UserModule],
    exports: [ChannelService]
})
export class ChannelModule {}
