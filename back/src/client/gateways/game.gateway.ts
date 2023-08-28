import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {UseGuards} from '@nestjs/common';
import {WSAuthenticatedGuard} from "../../auth/guards/wsauthenticated.guard";
import {ClientService} from "../client.service";
import MatchMaking from "./game/MatchMaking.class";
import {MatchService} from "../../match/match.service";

@WebSocketGateway(8001, {
    cors: true,
})

// TODO creer un systeme comme pour les roles pour que uniquement les personnes en state INGAME puisse interagir avec les endpoints
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    private matchMaking = null;

    @WebSocketServer()
    server;

    constructor(
        private clientService: ClientService,
        private matchService: MatchService
    ) {}

    async handleConnection(client: any, ...args): Promise<any> {
        if (!this.matchMaking)
            this.matchMaking = new MatchMaking(this.server, this.matchService);
    }

    async handleDisconnect(client: any) {
        //TODO handleLeave if client is in a game
        const user = await this.clientService.getClientById(client.id);
        console.log('Gateway : handleDisconnect from', user?.username);
        this.matchMaking.handleLeave(user);
    }

    @SubscribeMessage('join-game')
    @UseGuards(WSAuthenticatedGuard)
    async joinGame(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        if (user)
            this.matchMaking.handleJoin(user, data);
    }

    @SubscribeMessage('leave-game')
    @UseGuards(WSAuthenticatedGuard)
    async properLeaveGame(client): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        console.log('Gateway : properLeaveGame from', user?.username);
        this.matchMaking.handleLeave(user);
    }

    @SubscribeMessage('update-input')
    @UseGuards(WSAuthenticatedGuard)
    async updateInput(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        if (user)
            this.matchMaking.updateInput(user, data);
    }

    @SubscribeMessage('invite-game')
    @UseGuards(WSAuthenticatedGuard)
    async inviteGame(client, data) : Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        console.log('Gateway : invite-game from', user?.username, 'to', data.username);
        if (user && data)
            this.matchMaking.handleInvite(user, data);
    }
}
