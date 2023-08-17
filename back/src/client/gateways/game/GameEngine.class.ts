import Game from "./Game.class";

export default class GameEngine {


	constructor(
		public game : Game,
		private server,
	) {
	}

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

	loop() {
		this.updatePlayers();
		this.updateBall();
		if (this.checkScores())
			this.game.players.forEach((player) => {
				player.send('game-finish', this.data);
			});
		else {
			this.game.players.forEach((player) => {
				player.send('gameplay', this.data);
				player.send('spectator', this.data);
			});
			setTimeout(() => {
				this.loop();
			}, this.TIME_REFRESH);
		}
	}

	startGame() {
		this.game.players.forEach((player) => {
			player.send('game-start', this.start);
			this.start.playerId++; // pk
		});
		this.playing = true;
		this.ballVelocity = [];
		this.playerMoveUp = [];
		this.playerMoveDown = [];
		this.data.score = [0, 0];
		this.data.playerPosY = [0.5, 0.5];
		this.newBall();
		this.loop();
	}
}