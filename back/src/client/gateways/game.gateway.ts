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
import Game from "./game/Game.class";

@WebSocketGateway(8001, {
    cors: true,
})

// TODO creer un systeme comme pour les roles pour que uniquement les personnes en state INGAME puisse interagir avec les endpoints
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private clientService: ClientService) {}

    @WebSocketServer()
    server;
    games: any = {}
    async handleDisconnect(client: any) {
        //TODO handleLeave if client is in a game
    }

    async handleConnection(client: any, ...args): Promise<any> {
         // this.player = [];
    }

    @SubscribeMessage('join-game')
    @UseGuards(WSAuthenticatedGuard)
    async joinGame(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        const {matchId} = data;
        const game = this.games[matchId] ? this.games[matchId] : new Game(this.server, matchId);
        if (!this.games[matchId]) this.games[matchId] = game;
        game.handleJoin(user);
    }

    @SubscribeMessage('leave-game')
    @UseGuards(WSAuthenticatedGuard)
    async properLeaveGame(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        const game = this.games[data.matchId];
        if (game)
            game.handleLeave(user);
    }

    @SubscribeMessage('update-input')
    @UseGuards(WSAuthenticatedGuard)
    async updateInput(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        const game : Game = this.games[data.matchId];
        game.updateInput(user, data);
    }
}
