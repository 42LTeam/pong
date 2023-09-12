import Game from "./Game.class";

export enum playerStatus {
  ONLINE,
  OFFLINE,
}

export default class GamePlayer {
  PLAYER_SPEED = 0.01;
  PLAYER_SEMI_HEIGHT = 0.05;
  position: { x: number; y: number };
  moveUp = false;
  moveDown = false;
  status = playerStatus.ONLINE;

  constructor(
    public userId: number,
    public name: string,
    public socket,
    public playerLeft: boolean,
    private ballSemiSize: number,
    public colorball: string
  ) {
    this.position = {
      x: this.playerLeft ? 3 * ballSemiSize : 1 - 3 * ballSemiSize,
      y: 0.5,
    };
  }

  update() {
    if (
      this.moveUp &&
      !this.moveDown &&
      this.position.y - this.PLAYER_SEMI_HEIGHT - this.PLAYER_SPEED >= 0
    )
      this.position.y -= this.PLAYER_SPEED;
    else if (
      this.moveDown &&
      !this.moveUp &&
      this.position.y + this.PLAYER_SEMI_HEIGHT + this.PLAYER_SPEED <= 1
    )
      this.position.y += this.PLAYER_SPEED;
  }

  send(event, data) {
    if (this.socket) return this.socket.emit(event, data);
  }
}
