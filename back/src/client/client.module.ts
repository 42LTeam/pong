import {Module} from "@nestjs/common";
import {ClientGateway} from "./gateways/client.gateway";
import {ClientService} from "./client.service";
import {MessageModule} from "../message/message.module";
import {PrismaModule} from "../prisma/prisma.module";
import {ChannelModule} from "../channel/channel.module";
import {GameGateway} from "./gateways/game.gateway";
import {MatchModule} from "../match/match.module";
import {MatchService} from "../match/match.service";

@Module({
    providers: [ClientService, MatchService, ClientGateway, GameGateway],
    exports: [ClientService],
    imports: [PrismaModule, MessageModule, ChannelModule, MatchModule]
})
export class ClientModule {}