import Game from "./Game.class";
import GameBall from "./GameBall.class";

export default class GameEngine {

	TIME_REFRESH = 10;
	WIN_SCORE = 5;
	ball: GameBall;
	score = [0, 0];
	playing = false;

	constructor(
		public game : Game,
	) {
		this.ball = new GameBall(this.game);
	}

	checkScores() {
		if (this.ball.position.x < this.ball.BALL_SEMI_SIZE * 3) this.score[1]++;
		else if (this.ball.position.x > 1 - this.ball.BALL_SEMI_SIZE * 3)
			this.score[0]++;
		else return false;
		if (
			this.score[0] === this.WIN_SCORE ||
			this.score[1] === this.WIN_SCORE
		) {
			console.log(
				'Player 0 :',
				this.score[0],
				'- Player 1 :',
				this.score[1],
			);
			console.log(
				'Player',
				this.score[0] === this.WIN_SCORE ? 0 : 1,
				'win!',
			);
			return true;
		}
		this.ball.newBall();
		return false;
	}

	getData() {
		return {
			ball: this.ball.position,
			player0: this.game.players[0].position,
			player1: this.game.players[1].position,
			score: this.score,
		}
	}

	loop() {
		this.game.players.forEach(p => p.update())
		this.ball.update();
		if (this.checkScores())
			this.game.players.forEach((player) => {
				player.send('game-finish', this.getData());
			});
		else {
			this.game.players.forEach((player) => {
				player.send('gameplay', this.getData());
				player.send('spectator', this.getData());
			});
			setTimeout(() => {
				this.loop();
			}, this.TIME_REFRESH);
		}
	}

	startGame() {
		this.game.players.forEach((player) => {
			player.send('game-start', {
				playerId: Number(!player.playerLeft),
				ballSemiSize: this.ball.BALL_SEMI_SIZE,
				player0: this.game.players[0].position,
				player1: this.game.players[1].position,
				playerSemiHeight: this.game.players[0].PLAYER_SEMI_HEIGHT,
			});
		});
		this.playing = true;
		this.ball.newBall();
		this.loop();
	}
}