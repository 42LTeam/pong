import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import { WSAuthenticatedGuard } from "../../auth/guards/wsauthenticated.guard";
import { ClientService } from "../client.service";
import MatchMaking from "./game/MatchMaking.class";
import { MatchService } from "../../match/match.service";
import { UserService } from "../../user/user.service";

@WebSocketGateway({
  cors: true,
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private matchMaking = null;

  @WebSocketServer()
  server;

  constructor(
    private clientService: ClientService,
    private matchService: MatchService,
    private userService: UserService
  ) {}

  async handleConnection(client: any, ...args): Promise<any> {
    if (!this.matchMaking)
      this.matchMaking = new MatchMaking(
        this.server,
        this.matchService,
        this.userService
      );
  }

  async handleDisconnect(client: any) {
    const user = await this.clientService.getClientById(client.id);
    this.matchMaking.handleLeave(user);
  }

  @SubscribeMessage("join-game")
  @UseGuards(WSAuthenticatedGuard)
  async joinGame(client, data): Promise<void> {
    const user = await this.clientService.getClientById(client.id);
    if (user)
      this.matchMaking.handleJoin(user, data[0], data[1] == "true", data[2]);
  }

  @SubscribeMessage("leave-game")
  @UseGuards(WSAuthenticatedGuard)
  async properLeaveGame(client): Promise<void> {
    const user = await this.clientService.getClientById(client.id);
    this.matchMaking.handleLeave(user);
  }

  @SubscribeMessage("update-input")
  @UseGuards(WSAuthenticatedGuard)
  async updateInput(client, data): Promise<void> {
    const user = await this.clientService.getClientById(client.id);
    if (user) this.matchMaking.updateInput(user, data);
  }

  @SubscribeMessage("invite-game")
  @UseGuards(WSAuthenticatedGuard)
  async inviteGame(client, data): Promise<void> {
    const user = await this.clientService.getClientById(client.id);
    if (user && data)
      this.matchMaking.handleInvite(user, data[0], data[1] == "true");
  }
}
