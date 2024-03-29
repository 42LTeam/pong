import Game from "./Game.class";
import { MatchService } from "../../../match/match.service";
import { UserService } from "src/user/user.service";

export default class MatchMaking {
  games: Game[] = [];
  newGameId = 0;
  nbOfGames = 0;

  constructor(
    private server,
    private matchService: MatchService,
    private userService: UserService
  ) {}

  handleLeave(user) {
    if (user)
      this.games.forEach((game) => {
        game.handleLeave(user);
      });
    let index = 0;
    while (index < this.nbOfGames) {
      if (this.games[index].canDelete()) {
        this.games[index].playersLeave();
        this.games.splice(index, 1);
        this.nbOfGames--;
      } else index++;
    }
  }

  newGame(user, player, custom) {
    const newGame = new Game(
      ++this.newGameId,
      player == null,
      custom,
      this.server,
      this.matchService,
      this.userService
    );
    this.games.push(newGame);
    this.nbOfGames++;
    newGame.handleJoin(user, false);
    if (player) newGame.handleJoin(player, true);
  }

  handleJoin(user, invite, custom, playerId) {
    if (invite) {
      for (let game of this.games)
        if (game.canJoinInvite(user.id, playerId, custom)) {
          game.handleJoin(user, false);
          return;
        }
      this.server.sockets.sockets.get(user.session)?.emit("game-not-found");
    } else {
      for (let game of this.games)
        if (game.onGame(user.id) /* && game.started*/) {
          game.handleJoin(user, false);
          return;
        }
      for (let game of this.games)
        if (game.canJoinRandom(custom)) {
          game.handleJoin(user, false);
          return;
        }
      this.newGame(user, null, custom);
    }
  }

  handleInvite(user, player, custom) {
    for (let game of this.games) {
      if (game.canJoinInvite(user.id, player.id, custom)) {
        game.handleJoin(user, false);
        return;
      }
      if (game.wrongCustom(user.id, player.id, custom)) {
        this.server.sockets.sockets.get(user.session)?.emit("game-not-found");
        return;
      }
    }
    this.server.sockets.sockets
      .get(player.session)
      ?.emit("invite-game", [user, player, custom]);
    this.newGame(user, player, custom);
  }

  updateInput(user, data) {
    const game = this.games.find((g) => g.matchId == data.matchId);
    if (game) game.updateInput(user, data);
  }
}
