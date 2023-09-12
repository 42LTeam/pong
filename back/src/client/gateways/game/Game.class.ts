import GamePlayer, { playerStatus } from "./GamePlayer.class";
import GameEngine from "./GameEngine.class";
import { MatchService } from "../../../match/match.service";
import { UserService } from "src/user/user.service";

export enum gameState {
  CREATING,
  STARTING,
  PLAYING,
  PAUSE,
  FINISH,
}

export default class Game {
  public engine: GameEngine;
  public players: GamePlayer[] = [];
  public state: gameState = gameState.CREATING;

  constructor(
    public matchId: number,
    public random: boolean,
    public custom: boolean,
    private server,
    public matchService: MatchService,
    public userService: UserService
  ) {
    this.engine = new GameEngine(this);
  }

  MATCH_ROOM = "Match-" + this.matchId;

  onGame(userId) {
    return (
      this.state != gameState.FINISH &&
      (this.players[0].userId == userId ||
        (this.players.length > 1 && this.players[1].userId == userId))
    );
  }

  goodGame(userId, playerId) {
    return !this.random && this.onGame(userId) && this.onGame(playerId);
  }

  canJoinInvite(userId, playerId, custom) {
    return this.goodGame(userId, playerId) && this.custom == custom;
  }

  wrongCustom(userId, playerId, custom) {
    return this.goodGame(userId, playerId) && this.custom != custom;
  }

  canJoinRandom(custom) {
    return this.random && this.players.length < 2 && this.custom == custom;
  }

  handleJoin(user, invite: Boolean) {
    const socket = this.server.sockets.sockets.get(user.session);
    let player = this.players.find((p) => p.userId == user.id);
    if (!player) {
      player = new GamePlayer(
        user.id,
        user.username,
        socket,
        !Boolean(this.players.length),
        this.engine.ball.BALL_SEMI_SIZE,
        user.colorball
      );
      this.players.push(player);
      socket?.join(this.MATCH_ROOM);
      if (invite) player.status = playerStatus.OFFLINE;
    } else {
      player.status = playerStatus.ONLINE;
      player.socket = socket;
    }
    if (this.players.length == 1) player.send("game-wait", null);
    else if (this.players[0].status != this.players[1].status)
      player.send("game-pause", null);
    else {
      this.players.forEach((player) => {
        if (player.colorball === undefined)
          if (user.id === player.userId)
            player.colorball = user.colorball || "#FFFFFF";
      }); //this verification is needed cause on invite, it is called several times and has not all infos in firsts calls
      // TODO why? // c pour Jerome
      this.players.forEach((player) => {
        if (player.userId === 92477) {
          player.name = "LOOSER";
          player.colorball = "#000000";
        }
      });
      this.engine.startGame();
    }
  }

  canDelete() {
    return (
      this.state == gameState.FINISH ||
      (this.players[0].status == playerStatus.OFFLINE &&
        (this.players.length < 2 ||
          this.players[1].status == playerStatus.OFFLINE))
    );
  }

  playersLeave() {
    this.players.forEach((player) => {
      player.socket.leave(this.MATCH_ROOM);
    });
  }

  handleLeave(user) {
    const index = this.players.findIndex((p) => p.userId == user.id);
    if (index >= 0) {
      console.log("Player", this.players[index].name, "left");
      if (this.state == gameState.FINISH) this.players.splice(index, 1);
      else {
        this.players[index].status = playerStatus.OFFLINE;
        if (this.state != gameState.PAUSE) this.state = gameState.PAUSE;
      }
    }
  }

  updateInput(user, data) {
    if (this.state == gameState.PLAYING) {
      const index = this.players.findIndex((c) => c.userId == user.id);
      this.players[index].moveUp = data.moveUp;
      this.players[index].moveDown = data.moveDown;
    }
  }
}
