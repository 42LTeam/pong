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

@WebSocketGateway(8001, {
    cors: true,
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private clientService: ClientService) {}

    @WebSocketServer()
    server;

    data = {
        ball: [0.5, 0.5],
        playerPosY: [0.5, 0.5],
        score: [0, 0],
    };
    start = {
        playerId: 0,
        playerPosX: [0.015, 0.985],
        ballSemiSize: 0.005,
        playerSemiHeight: 0.05,
    };
    back = {
        player: [],
    };
    playing = false;
    ballAngle = 0;
    ballSpeed = 0;
    ballVelocity: number[];
    playerMoveUp: boolean[];
    playerMoveDown: boolean[];
    BALL_START_SPEED = 0.0002;
    BALL_MAX_SPEED = 0.0008;
    BALL_SPEED_INCREASE = 0.00004;
    PLAYER_SPEED = 0.01;
    MAX_BOUNCE_ANGLE = 1.3;
    TIME_REFRESH = 15;
    WIN_SCORE = 5;

    updatePlayers() {
        if (
            this.playerMoveUp[0] &&
            !this.playerMoveDown[0] &&
            this.data.playerPosY[0] -
            this.start.playerSemiHeight -
            this.PLAYER_SPEED >=
            0
        )
            this.data.playerPosY[0] -= this.PLAYER_SPEED;
        else if (
            this.playerMoveDown[0] &&
            !this.playerMoveUp[0] &&
            this.data.playerPosY[0] +
            this.start.playerSemiHeight +
            this.PLAYER_SPEED <=
            1
        )
            this.data.playerPosY[0] += this.PLAYER_SPEED;

        if (
            this.playerMoveUp[1] &&
            !this.playerMoveDown[1] &&
            this.data.playerPosY[1] -
            this.start.playerSemiHeight -
            this.PLAYER_SPEED >=
            0
        )
            this.data.playerPosY[1] -= this.PLAYER_SPEED;
        else if (
            this.playerMoveDown[1] &&
            !this.playerMoveUp[1] &&
            this.data.playerPosY[1] +
            this.start.playerSemiHeight +
            this.PLAYER_SPEED <=
            1
        )
            this.data.playerPosY[1] += this.PLAYER_SPEED;
    }

    updateSpeed(newBall) {
        if (newBall) this.ballSpeed = this.BALL_START_SPEED;
        else if (this.ballSpeed < this.BALL_MAX_SPEED)
            this.ballSpeed += this.BALL_SPEED_INCREASE;
        this.ballVelocity[0] = Math.cos(this.ballAngle) * this.ballSpeed;
        this.ballVelocity[1] = -Math.sin(this.ballAngle) * this.ballSpeed;
    }

    newBall() {
        do {
            this.ballAngle = Math.random() * Math.PI * 2 - Math.PI;
        } while (
            this.MAX_BOUNCE_ANGLE <= Math.abs(this.ballAngle) &&
            Math.abs(this.ballAngle) <= Math.PI - this.MAX_BOUNCE_ANGLE
            );
        this.updateSpeed(true);
        this.data.ball[0] = 0.5;
        this.data.ball[1] = 0.5;
        console.log(
            'Player 0 :',
            this.data.score[0],
            '- Player 1 :',
            this.data.score[1],
        );
    }

    updateBall() {
        if (
            this.data.ball[1] - this.start.ballSemiSize <= 0 ||
            1 <= this.data.ball[1] + this.start.ballSemiSize
        ) {
            this.ballVelocity[1] *= -1;
            this.ballAngle *= -1;
        } else if (
            this.data.ball[0] <= this.start.ballSemiSize * 5 &&
            this.data.playerPosY[0] - this.start.playerSemiHeight <=
            this.data.ball[1] + this.start.ballSemiSize &&
            this.data.ball[1] - this.start.ballSemiSize <=
            this.data.playerPosY[0] + this.start.playerSemiHeight
        ) {
            this.ballAngle =
                (this.data.ball[1] - this.data.playerPosY[0]) *
                (-this.MAX_BOUNCE_ANGLE /
                    (this.start.playerSemiHeight + this.start.ballSemiSize));
            this.updateSpeed(false);
        } else if (
            this.data.ball[0] >= 1 - this.start.ballSemiSize * 5 &&
            this.data.playerPosY[1] - this.start.playerSemiHeight <=
            this.data.ball[1] + this.start.ballSemiSize &&
            this.data.ball[1] - this.start.ballSemiSize <=
            this.data.playerPosY[1] + this.start.playerSemiHeight
        ) {
            this.ballAngle =
                (this.data.ball[1] - this.data.playerPosY[1]) *
                (this.MAX_BOUNCE_ANGLE /
                    (this.start.playerSemiHeight + this.start.ballSemiSize)) +
                Math.PI;
            this.updateSpeed(false);
        }
        this.data.ball[0] += this.ballVelocity[0] * this.TIME_REFRESH;
        this.data.ball[1] += this.ballVelocity[1] * this.TIME_REFRESH;
    }

    checkScores() {
        if (this.data.ball[0] < this.start.ballSemiSize * 3) this.data.score[1]++;
        else if (this.data.ball[0] > 1 - this.start.ballSemiSize * 3)
            this.data.score[0]++;
        else return false;
        if (
            this.data.score[0] === this.WIN_SCORE ||
            this.data.score[1] === this.WIN_SCORE
        ) {
            console.log(
                'Player 0 :',
                this.data.score[0],
                '- Player 1 :',
                this.data.score[1],
            );
            console.log(
                'Player',
                this.data.score[0] === this.WIN_SCORE ? 0 : 1,
                'win!',
            );
            return true;
        }
        this.newBall();
        return false;
    }

    loop(data) {
        this.updatePlayers();
        this.updateBall();
        if (this.checkScores())
            this.back.player.forEach((element) => {
                this.server.sockets.sockets.get(element)?.emit('game-finish', data);
            });
        else {
            this.back.player.forEach((element) => {
                this.server.sockets.sockets.get(element)?.emit('gameplay', data);
                this.server.sockets.sockets.get(element)?.emit('spectator', data);
            });
            setTimeout(() => {
                this.loop(data);
            }, this.TIME_REFRESH);
        }
    }

    startGame() {
        this.back.player.forEach((element) => {
            this.server.sockets.sockets.get(element)?.emit('game-start', this.start);
            this.start.playerId++;
        });
        this.playing = true;
        this.ballVelocity = [];
        this.playerMoveUp = [];
        this.playerMoveDown = [];
        this.data.score = [0, 0];
        this.data.playerPosY = [0.5, 0.5];
        this.newBall();
        this.loop(this.data);
    }

    async handleDisconnect(client: any) {}

    async handleConnection(client: any, ...args): Promise<any> {
         // this.player = [];
    }

    @SubscribeMessage('join-game')
    @UseGuards(WSAuthenticatedGuard)
    async joinGame(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        if (this.back.player.length >= 2) {
            this.server.sockets.sockets.get(user.session)?.emit('error', 'too much player');
            this.server.sockets.sockets.get(user.session)?.emit('spectator');
            return ;
        }
        this.back.player.push(user.session);
        this.back.player.forEach((element) => {
            console.log('Connection id :', element);
        });
        console.log('New connection, total :', this.back.player.length);
        this.server.sockets.sockets.get(user.session)?.join('game');
        if (this.back.player.length == 1) {
            this.server.sockets.sockets.get(user.session)?.emit('game-wait', 'Waiting for player');
        } else if (!this.playing) {
            this.startGame();
        }
    }

    @SubscribeMessage('leave-game')
    @UseGuards(WSAuthenticatedGuard)
    async leaveGame(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        const index = this.back.player.indexOf(user.session);
        this.back.player.splice(index, 1);
        console.log('New deconnection, total :', this.back.player.length);
        if (this.back.player.length != 2) this.playing = false;
    }

    @SubscribeMessage('keep-alive')
    @UseGuards(WSAuthenticatedGuard)
    async keepAlive(client, data): Promise<void> {
        const user = await this.clientService.getClientById(client.id);
        if (this.playing) {
            this.playerMoveUp[data.playerId] = data.moveUp;
            this.playerMoveDown[data.playerId] = data.moveDown;
        }
    }
}
