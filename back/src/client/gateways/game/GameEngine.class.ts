import Game from "./Game.class";
import GameBall from "./GameBall.class";

export default class GameEngine {

	ball: GameBall;

	constructor(
		public game : Game,
		public playerSemiHeight: number,
		public ballSemiSize: number,
	) {
		this.ball = new GameBall(this, this.game, this.BALL_START_SPEED);
		this.playerSemiHeight = 0.05;
		this.ballSemiSize = 0.005;
	}

	score = [0, 0];
	playing = false;

	BALL_START_SPEED = 0.0002;
	TIME_REFRESH = 15;
	WIN_SCORE = 5;


	checkScores() {
		if (this.ball.position.x < this.ballSemiSize * 3) this.score[1]++;
		else if (this.ball.position.x > 1 - this.ballSemiSize * 3)
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
				playerId: Number(player.playerOne),
				ballSemiSize: this.ballSemiSize,
				player0: this.game.players[0].position,
				player1: this.game.players[1].position,
				playerSemiHeight: this.playerSemiHeight,
			});
		});
		this.playing = true;
		this.ball.velocity = {x: 0, y: 2};
		this.game.players.forEach(p => {p.moveUp = false; p.moveDown = false});
		this.score = [0, 0];
		this.game.players.forEach(p => {p.position.y = 0.5});
		this.ball.newBall();
		this.loop();
	}
}