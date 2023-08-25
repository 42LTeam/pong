import GamePlayer, {playerStatus} from "./GamePlayer.class";
import GameEngine from "./GameEngine.class";
import {MatchService} from "../../../match/match.service";

export enum gameState {
	CREATING,
	STARTING,
	PLAYING,
	PAUSE,
	FINISH
}


export default class Game {

	public engine : GameEngine;
	public players : GamePlayer[] = [];
	public state : gameState = gameState.CREATING;

	constructor(
				private server,
				public matchId: number,
				public matchService: MatchService
	) {
		this.engine = new GameEngine(this);
		console.log('New game ', this.matchId);
	}

	MATCH_ROOM = "Match-" + this.matchId;

	onGame(user) {
		return (this.state != gameState.FINISH
			&& (this.players[0].userId == user.id
				|| (this.players.length > 1 && this.players[1].userId == user.id)
			)
		);
	}

	canJoin(user) {
		return (this.players.length < 2 || this.onGame(user));
	}

	//TODO matchService
	handleJoin(user, invite: Boolean) {
		console.log('handleJoin');
		const socket = this.server.sockets.sockets.get(user.session);
		let player = this.players.find(p => p.userId == user.id);
		if (!player) {
			player = new GamePlayer(user.id, user.username, socket, !Boolean(this.players.length), this.engine.ball.BALL_SEMI_SIZE);
			this.players.push(player);
			socket?.join(this.MATCH_ROOM);
			if (invite)
				player.status = playerStatus.OFFLINE;
			else {
				console.log('Player', player.name, 'join game', this.matchId);
				console.log('New connection, total :', this.players.length, 'matchId:', this.MATCH_ROOM);
			}
		} else {
			player.status = playerStatus.ONLINE;
			player.socket = socket;
			console.log('Player', player.name, 're-join game', this.matchId);
			console.log('New connection, total :', this.players.length, 'matchId:', this.MATCH_ROOM);
		}
		if (this.players.length == 1)
			player.send('game-wait', null);
		else if (this.players[0].status != this.players[1].status)
			player.send('game-pause', null);
		else
			this.engine.startGame();
	}

	canDelete() {
		return (this.state == gameState.FINISH);
	}

	playersLeave() {
		this.players.forEach((player) => {
			player.socket.leave(this.MATCH_ROOM);
		})
	}

	//TODO check state and pause if needed
	handleLeave(user) {
		const index = this.players.findIndex(p => p.userId == user.id);
		console.log('handleLeave of index', index);
		if (index >= 0) {
			console.log('Player', this.players[index].name, 'left');
			if (this.state == gameState.FINISH) {
				this.players.splice(index, 1);
				console.log('New deconnection, total :', this.players.length, 'matchId:', this.MATCH_ROOM);

			} else {
				this.players[index].status = playerStatus.OFFLINE;
				console.log('New deconnection, total :', this.players.length, 'matchId:', this.MATCH_ROOM);
				if (this.state != gameState.PAUSE) {
					this.state = gameState.PAUSE;
					console.log('The game', this.matchId, 'is on pause');
				}
			}
		}
	}

	updateInput(user, data) {
		if (this.state == gameState.PLAYING) {
			const index = this.players.findIndex(c => c.userId == user.id);
			this.players[index].moveUp = data.moveUp;
			this.players[index].moveDown = data.moveDown;
		}
	}
}