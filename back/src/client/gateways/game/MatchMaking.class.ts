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
        // console.log('MatchMaking : handleLeave of', user?.username);
        if (user)
            this.games.forEach((game) => {
                game.handleLeave(user);
            })
        let index = 0;
        while (index < this.nbOfGames) {
            if (this.games[index].canDelete()) {
                this.games[index].playersLeave();
                // console.log("Game", this.games[index].matchId, "deleted");
                this.games.splice(index, 1);
                this.nbOfGames--;
            }
            else
                index++;
        }
    }

    newGame(user, player, custom) {
        const newGame = new Game(++this.newGameId, player == null, custom, this.server, this.matchService);
        this.games.push(newGame);
        this.nbOfGames++;
        // console.log('MatchMaking : New game', this.newGameId);
        newGame.handleJoin(user, false);
        if (player)
            newGame.handleJoin(player, true);
    }

    handleJoin(user, player, custom) {
        // console.log('MatchMaking : handleJoin of', user.username);
        if (player) {
            for (let game of this.games)
                if (game.canJoinInvite(user)) {
                    game.handleJoin(user, false);
                    return;
                }
            this.server.sockets.sockets.get(user.session)?.emit('game-not-found');
        }
        else {
            for (let game of this.games)
                if (game.onGame(user) && game.started) {
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

    canInvite(user, player) {
        for (let game of this.games)
            if (game.canJoinInvite(user)
                || game.canJoinInvite(player)
                || (game.onGame(player)
                    && game.random))
                return false;
        return true;
    }

    handleInvite(user, player, custom) {
        console.log('MatchMaking : handleInvite');
        if (this.canInvite(user, player)) {
            this.server.sockets.sockets.get(player.session)?.emit('invite-game', [user, player, custom]);
            this.newGame(user, player, custom);
        }
        else
            this.server.sockets.sockets.get(user.session)?.emit('game-not-found');
    }

    updateInput(user, data) {
        const game = this.games.find(g => g.matchId == data.matchId);
        if (game)
            game.updateInput(user, data);
    }
}