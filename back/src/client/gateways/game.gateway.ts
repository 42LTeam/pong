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

    games : Game[] = [];
    nbOfGames = 0;

    constructor(private clientService: ClientService) {}

    @WebSocketServer()
    server;

    async handleDisconnect(client: any) {
        //TODO handleLeave if client is in a game
        const user = await this.clientService.getClientById(client.id);
        if (user)
            this.games.forEach((game) => {
                game.handleLeave(user);
            })
    }

    async handleConnection(client: any, ...args): Promise<any> {
         // this.player = [];
    }

    @SubscribeMessage('join-game')
    @UseGuards(WSAuthenticatedGuard)
    async joinGame(client): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        for (let game of this.games) {
            if (game.canJoin(user)) {
                game.handleJoin(user);
                return;
            }
        }
        const newGame = new Game(this.server, this.nbOfGames++);
        this.games.push(newGame);
        if (newGame.canJoin(user))
            newGame.handleJoin(user);
    }

    //TODO used when?
    @SubscribeMessage('leave-game')
    @UseGuards(WSAuthenticatedGuard)
    async properLeaveGame(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        const game = this.games.find(g => g.matchId == data.matchId);
        if (game)
            game.handleLeave(user);
    }

    @SubscribeMessage('update-input')
    @UseGuards(WSAuthenticatedGuard)
    async updateInput(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        const game = this.games.find(g => g.matchId == data.matchId);
        if (game)
            game.updateInput(user, data);
    }
}
