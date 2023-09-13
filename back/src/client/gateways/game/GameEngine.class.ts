import Game, { gameState } from "./Game.class";
import GameBall from "./GameBall.class";

export default class GameEngine {
  TIME_REFRESH = 20;
  WIN_SCORE = 5;
  ball: GameBall;
  score = [0, 0];
  countdown : number = 0;

  constructor(public game: Game) {
    this.ball = new GameBall(this.game);
  }

  sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  checkScores() {
    if (this.ball.position.x < this.ball.BALL_SEMI_SIZE * 3) this.score[1]++;
    else if (this.ball.position.x > 1 - this.ball.BALL_SEMI_SIZE * 3)
      this.score[0]++;
    else return false;
    if (this.score[0] == this.WIN_SCORE || this.score[1] == this.WIN_SCORE) {
      this.game.state = gameState.FINISH;
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
    };
  }

  async loop() {
    if (this.game.state == gameState.PLAYING) {
      this.game.players.forEach((p) => p.update());
      this.ball.update();
      if (this.checkScores()) {
        this.game.players.forEach((player) => {
          player.send("game-finish", this.getData());
        });
        await this.game.matchService.createMatch(
          [this.game.players[0].userId, this.game.players[1].userId],
          this.score,
          [this.score[0] === 5, this.score[1] === 5]
        );
        await this.game.userService.updateUserXP(
          this.game.players[0].userId,
          (this.score[0] === 5 ? 50 : 10) + this.score[0] * 10
        );
        await this.game.userService.updateUserXP(
          this.game.players[1].userId,
          (this.score[1] === 5 ? 50 : 10) + this.score[1] * 10
        );
      } else {
        this.game.players.forEach((player) => {
          player.send("gameplay", this.getData());
        });
        setTimeout(() => {
          this.loop();
        }, this.TIME_REFRESH);
      }
    } else if (this.game.state == gameState.PAUSE){

      this.countdown = 10;

      for (; this.countdown > 0; this.countdown--) {
        if (this.game.players[0] === undefined || this.game.players[1] === undefined)
          return ;
        this.game.players.forEach((player) => {
          // status = 0 // c'est bien
          // status = 1 // c'est le leaver
          if (this.game.players[0].status === 1 || this.game.players[1].status === 1){
            player.send("game-pause", {
              ball: this.ball.position,
              player0: this.game.players[0].position,
              player1: this.game.players[1].position,
              score: this.score,
              player0status: this.game.players[0].status,
              player1status: this.game.players[1].status,
              countdown: this.countdown
            });
          }
          else {
            this.countdown = -1;
          }
        });
        await this.sleep(1000);
      }
      if (this.countdown === 0 && (this.game.players[0].status === 1 || this.game.players[1].status === 1)) {
        this.score[0] = (this.game.players[0].status === 1 ? 0 : 5);
        this.score[1] = (this.game.players[1].status === 1 ? 0 : 5);
        this.game.state = gameState.FINISH

        this.game.players.forEach((player) => {
          player.send("game-finish", this.getData());
        });
        await this.game.matchService.createMatch(
          [this.game.players[0].userId, this.game.players[1].userId],
          this.score,
          [this.score[0] === 5, this.score[1] === 5]
        );
        await this.game.userService.updateUserXP(
          this.game.players[0].userId,
          (this.score[0] === 5 ? 50 : 10) + this.score[0] * 10
        );
        await this.game.userService.updateUserXP(
          this.game.players[1].userId,
          (this.score[1] === 5 ? 50 : 10) + this.score[1] * 10
        );
      }
    }
  }

  async startGame() {
    if (this.ball.speed == 0) this.ball.newBall();
    this.game.state = gameState.STARTING;
    for (var i = 4; i--; i > 0) {
      this.game.players.forEach((player) => {
        player.send("game-start", {
          matchId: this.game.matchId,
          ball: this.ball.position,
          player0: this.game.players[0].position,
          player1: this.game.players[1].position,
          score: this.score,
          playerId: Number(!player.playerLeft),
          ballSemiSize: this.ball.BALL_SEMI_SIZE,
          playerSemiHeight: this.game.players[0].PLAYER_SEMI_HEIGHT,
          player0Name: this.game.players[0].name,
          player1Name: this.game.players[1].name,
          countdown: i,
          custom: this.game.custom,
          colorball: this.game.players[player.playerLeft ? 0 : 1].colorball,
        });
      });
      await this.sleep(1000);
    }
    this.game.state = gameState.PLAYING;
    this.loop();
  }
}
