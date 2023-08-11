import {Module} from "@nestjs/common";
import {ChannelController} from "./channel.controller";
import {ChannelService} from "./channel.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    controllers: [ChannelController],
    providers: [ChannelService],
    imports: [PrismaModule],
    exports: [ChannelService]

})
export class ChannelModule {}