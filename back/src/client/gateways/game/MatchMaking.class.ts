import Game from "./Game.class";
import {MatchService} from "../../../match/match.service";

export default class MatchMaking {

    games : Game[] = [];
    newGameId = 0;
    nbOfGames = 0;

    constructor(
        private server,
        private matchService: MatchService
    ) {}

    handleLeave(user) {
        if (user)
            this.games.forEach((game) => {
                game.handleLeave(user);
            })
        let index = 0;
        while (index < this.nbOfGames) {
            if (this.games[index].canDelete()) {
                this.games[index].playersLeave();
                this.games.splice(index, 1);
                this.nbOfGames--;
            }
            else
                index++;
        }
    }

    canInvite(user, player) {
        for (let game of this.games)
            if (game.canJoinInvite(user) && game.canJoinInvite(player))
                return false;
        return true;
    }

    newGame(user, data) {
        const newGame = new Game(this.server, ++this.newGameId, data == null, this.matchService);
        this.games.push(newGame);
        this.nbOfGames++;
        newGame.handleJoin(user, false);
        if (data && data.length >= 2)
            newGame.handleJoin(data[1], true);
    }

    handleJoin(user, data) {
        if (data/* && data.user[0].id == user.id*/) {
            for (let game of this.games)
                if (game.canJoinInvite(user)) {
                    game.handleJoin(user, false);
                    return;
                }
            this.newGame(user, data);
        }
        else {
            for (let game of this.games)
                if (game.onGame(user) && game.started) {
                    game.handleJoin(user, false);
                    return;
                }
            for (let game of this.games)
                if (game.canJoinRandom()) {
                    game.handleJoin(user, false);
                    return;
                }
            this.newGame(user, null);
        }
    }

    updateInput(user, data) {
        const game = this.games.find(g => g.matchId == data.matchId);
        if (game)
            game.updateInput(user, data);
    }
}