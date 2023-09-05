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
    console.log("MatchMaking : handleLeave of", user?.username);
    if (user)
      this.games.forEach((game) => {
        game.handleLeave(user);
      });
    let index = 0;
    while (index < this.nbOfGames) {
      if (this.games[index].canDelete()) {
        this.games[index].playersLeave();
        console.log("Game", this.games[index].matchId, "deleted");
        this.games.splice(index, 1);
        this.nbOfGames--;
      } else index++;
    }
  }
}
