import Game from "./Game.class";

export default class GamePlayer {

	position;
	constructor(
		public userId: number,
		public socket,
		private game: Game,
	) {
	}


	send(event, data) {
		return this.socket.emit(event, data);
	}
}