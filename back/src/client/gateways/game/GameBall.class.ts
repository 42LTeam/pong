import Game from "./Game.class";
import GameEngine from "./GameEngine.class";

export default class GameBall {

	BALL_MAX_SPEED = 0.0008;
	BALL_SPEED_INCREASE = 0.00004;
	MAX_BOUNCE_ANGLE = 1.3;

	position: {x: number, y: number};
	angle = 0;
	speed = 0;
	velocity: {x: number, y: number};

	constructor(
		private engine: GameEngine,
		private game: Game,
		speed: number) {
		this.position = {
			x: 0.5,
			y: 0.5,
		}
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.angle = 0;
		this.speed = speed;
	}
	updateSpeed(newBall) {
		if (newBall) this.speed = this.engine.BALL_START_SPEED;
		else if (this.speed < this.BALL_MAX_SPEED)
			this.speed += this.BALL_SPEED_INCREASE;
		this.velocity.x = Math.cos(this.angle) * this.speed;
		this.velocity.y = -Math.sin(this.angle) * this.speed;
	}

	newBall() {
		do {
			this.angle = Math.random() * Math.PI * 2 - Math.PI;
		} while (
			this.MAX_BOUNCE_ANGLE <= Math.abs(this.angle) &&
			Math.abs(this.angle) <= Math.PI - this.MAX_BOUNCE_ANGLE
			);
		this.updateSpeed(true);
		this.position.x = 0.5;
		this.position.y = 0.5;
	}



	update() {
		if (
			this.position.y - this.engine.ballSemiSize <= 0 ||
			1 <= this.position.y + this.engine.ballSemiSize
		) {
			this.velocity.y *= -1;
			this.angle *= -1;
		} else if (
			this.position.x <= this.engine.ballSemiSize * 5 &&
			this.game.players[0].position.y - this.engine.playerSemiHeight <=
			this.position.y + this.engine.ballSemiSize &&
			this.position.y - this.engine.ballSemiSize <=
			this.game.players[0].position.y + this.engine.playerSemiHeight
		) {
			this.angle =
				(this.position.y - this.game.players[0].position.y) *
				(-this.MAX_BOUNCE_ANGLE /
					(this.engine.playerSemiHeight + this.engine.ballSemiSize));
			this.updateSpeed(false);
		} else if (
			this.position.x >= 1 - this.engine.ballSemiSize * 5 &&
			this.game.players[1].position.y - this.engine.playerSemiHeight <=
			this.position.y + this.engine.ballSemiSize &&
			this.position.y - this.engine.ballSemiSize <=
			this.game.players[1].position.y + this.engine.playerSemiHeight
		) {
			this.angle =
				(this.position.y - this.game.players[1].position.y) *
				(this.MAX_BOUNCE_ANGLE /
					(this.engine.playerSemiHeight + this.engine.ballSemiSize)) +
				Math.PI;
			this.updateSpeed(false);
		}
		this.position.x += this.velocity.x * this.engine.TIME_REFRESH;
		this.position.y += this.velocity.y * this.engine.TIME_REFRESH;
	}

}