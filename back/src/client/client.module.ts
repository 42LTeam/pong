import { Module } from "@nestjs/common";
import { ClientGateway } from "./gateways/client.gateway";
import { ClientService } from "./client.service";
import { MessageModule } from "../message/message.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ChannelModule } from "../channel/channel.module";
import { GameGateway } from "./gateways/game.gateway";
import { MatchModule } from "../match/match.module";
import { MatchService } from "../match/match.service";
import { UserService } from "src/user/user.service";
import { FriendService } from "src/friend/friend.service";

@Module({
  providers: [
    ClientService,
    MatchService,
    ClientGateway,
    GameGateway,
    UserService,
    FriendService,
  ],
  exports: [ClientService],
  imports: [PrismaModule, MessageModule, ChannelModule, MatchModule],
})
export class ClientModule {}
