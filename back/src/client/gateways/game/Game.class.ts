import GamePlayer, {playerStatus} from "./GamePlayer.class";
import GameEngine from "./GameEngine.class";

export enum gameState {
	CREATING,
STARTING,
	PLAYING,
	PAUSE,
	FINISH
}

export default class Game {

	public engine : GameEngine;
	players : GamePlayer[] = [];
	public state : gameState = gameState.CREATING;

	constructor(
				private server,
				private matchId: number,
	) {
		this.engine = new GameEngine(this);
		console.log('New game ', this.matchId);
	}

	MATCH_ROOM = "Match-" + this.matchId;
	private isWhitelisted(user) {
		return true;
	}

	//TODO matchService
	handleJoin(user) {
		console.log('handleJoin');
		const socket = this.server.sockets.sockets.get(user.session);
		if (!this.isWhitelisted(user) || this.state == gameState.FINISH)
			socket?.emit('error', 'Forbidden');
		else if (this.players.length >= 2 && this.players[0].userId != user.id && this.players[1].userId != user.id)
			socket?.emit('spectator');
		else {
			const index = this.players.findIndex(p => p.userId == user.id);
			if (index < 0) {
				const player = new GamePlayer(user.id, user.username, socket, !Boolean(this.players.length), this.engine.ball.BALL_SEMI_SIZE);
				this.players.push(player);
				console.log('Player', this.players[this.players.length - 1].name, 'join');
				console.log('New connection, total :', this.players.length, ' matchId:', this.MATCH_ROOM);
				socket?.join(this.MATCH_ROOM);
				if (this.players.length == 1)
					player.send('game-wait', null);
				else if (this.state == gameState.CREATING)
					this.engine.startGame(true);
			} else {
				this.players[index].status = playerStatus.ONLINE;
				this.players[index].socket = socket;
				if (this.players[0].status == this.players[1].status)
					this.engine.startGame(false);
			}
		}
	}

	//TODO check state and pause if needed
	handleLeave(user) {
		console.log('handleLeave');
		const index = this.players.findIndex(p => p.userId == user.id);
		if (index >= 0) {
			console.log('Player', this.players[index].name, 'left');
			if (this.state == gameState.FINISH) {
				this.players.splice(index, 1);
				console.log('New deconnection, total :', this.players.length);
			} else {
				this.players[index].status = playerStatus.OFFLINE;
				console.log('New deconnection, total :', this.players.length);
				if (this.state != gameState.PAUSE) {
					this.state = gameState.PAUSE;
					console.log('The game is on pause');
				}
			}
		}
	}

	updateInput(user, data) {
		if (this.isWhitelisted(user) && this.state == gameState.PLAYING) {
			const index = this.players.findIndex(c => c.userId == user.id);
			this.players[index].moveUp = data.moveUp;
			this.players[index].moveDown = data.moveDown;
		}
	}
}