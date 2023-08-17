import Game from "./Game.class";

export default class GamePlayer {

	PLAYER_SPEED = 0.01;


	position: { x: number, y: number };
	moveUp: boolean;
	moveDown: boolean;

	constructor(
		public userId: number,
		public socket,
		private game: Game,
		public playerOne: boolean,
	) {
		this.moveDown = false;
		this.moveUp = false;
		this.position = {
			x: this.playerOne ? 0.015 : 0.985,
			y: 0.5,
		}
	}


	update(){
		if (
			this.moveUp &&
			!this.moveDown &&
			this.position.y -
			this.game.engine.playerSemiHeight -
			this.PLAYER_SPEED >=
			0
		)
			this.position.y -= this.PLAYER_SPEED;
		else if (
			this.moveDown &&
			!this.moveUp &&
			this.position.y +
			this.game.engine.playerSemiHeight +
			this.PLAYER_SPEED <=
			1
		)
			this.position.y += this.PLAYER_SPEED;
	}

	send(event, data) {
		return this.socket.emit(event, data);
	}
}