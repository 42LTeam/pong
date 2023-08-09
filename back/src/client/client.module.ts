import {Module} from "@nestjs/common";
import {ClientGateway} from "./client.gateway";
import {ClientService} from "./client.service";
import {MessageModule} from "../message/message.module";
import {PrismaModule} from "../prisma/prisma.module";
import {ChannelModule} from "../channel/channel.module";


@Module({
    providers: [ClientService, ClientGateway],
    exports: [ClientService],
    imports: [PrismaModule, MessageModule, ChannelModule]
})
export class ClientModule {}