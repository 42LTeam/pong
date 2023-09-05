import Game, { gameState } from "./Game.class";
import GameBall from "./GameBall.class";

export default class GameEngine {
  TIME_REFRESH = 20;
  WIN_SCORE = 5;
  ball: GameBall;
  score = [0, 0];

  constructor(public game: Game) {
    this.ball = new GameBall(this.game);
  }

  // printScores() {
  // 	console.log(
  // 		'Game',
  // 		this.game.matchId,
  // 		'# Player 0 :',
  // 		this.score[0],
  // 		'- Player 1 :',
  // 		this.score[1],
  // 	);
  // }

  checkScores() {
    if (this.ball.position.x < this.ball.BALL_SEMI_SIZE * 3) this.score[1]++;
    else if (this.ball.position.x > 1 - this.ball.BALL_SEMI_SIZE * 3)
      this.score[0]++;
    else return false;
    // this.printScores();
    if (this.score[0] == this.WIN_SCORE || this.score[1] == this.WIN_SCORE) {
      // console.log(
      // 	'Game',
      // 	this.game.matchId,
      // 	'# Player',
      // 	this.score[0] == this.WIN_SCORE ? 0 : 1,
      // 	'win!',
      // );
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
      } else {
        this.game.players.forEach((player) => {
          player.send("gameplay", this.getData());
        });
        setTimeout(() => {
          this.loop();
        }, this.TIME_REFRESH);
      }
    } else {
      this.game.players.forEach((player) => {
        player.send("game-pause", this.getData());
      });
    }
  }

  sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async startGame() {
    // this.game.started = true;
    if (this.ball.speed == 0) this.ball.newBall();
    this.game.state = gameState.STARTING;
    // this.printScores();
    for (var i = 4; i--; i > 0) {
      // console.log('game-start', i);
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
        });
      });
      await this.sleep(1000);
    }
    this.game.state = gameState.PLAYING;
    this.loop();
  }
}
