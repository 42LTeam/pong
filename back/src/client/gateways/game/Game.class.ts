import {WebSocketServer} from "@nestjs/websockets";
import GamePlayer from "./GamePlayer.class";
import GameEngine from "./GameEngine.class";

export default class Game {

	private engine : GameEngine;
	players : GamePlayer[] = [];

	constructor(
				private server,
				private matchId: number,
	) {
		this.engine = new GameEngine(this, this.server);
		console.log('New gane ', this.matchId);
	}

	MATCH_ROOM = "Match-" + this.matchId;

	private isWhitelisted(user) {
		return true;
	}

	//TODO matchService
	handleJoin(user) {
		const socket = this.server.sockets.sockets.get(user.session);
		if (this.players.length >= 2 || this.isWhitelisted(user)) {
			socket?.emit('error', 'Forbidden');
			// socket?.emit('spectator');
			return ;
		}
		const player = new GamePlayer(user.id, socket, this);
		this.players.push(player);
		console.log('New connection, total :', this.players.length, ' matchId:', this.MATCH_ROOM);
		socket?.join(this.MATCH_ROOM);
		if (this.players.length == 1) {
			player.send('game-wait', 'Waiting for player');
		} else if (!this.engine.playing) {
			this.engine.startGame();
		}
	}

	//TODO check state and pause if needed
	handleLeave(user) {
		const index = this.players.findIndex(p => p.userId == user.id);
		this.players.splice(index, 1);
		console.log('New deconnection, total :', this.players.length);
		if (this.players.length != 2) this.engine.playing = false;
	}

	keepAlive(user, data) {
		if (this.isWhitelisted(user) && this.engine.playing) {
			this.engine.playerMoveUp[user.session] = data.moveUp;
			this.engine.playerMoveDown[user.session] = data.moveDown;
		}
	}
}