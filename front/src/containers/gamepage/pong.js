import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io("http://localhost:8001/");
const canvas = document.querySelector("body > canvas")
const c2d = canvas.getContext('2d');
const ball = {
    x: 0.5,
    y: 0.5,
    semiSize: 0
}
const players = {
    player0: {
        x: 0,
        y: 0.5,
        score: 0
    },
    player1: {
        x: 1,
        y: 0.5,
        score: 0
    },
    semiHeight: 0
}
const data = {
    playerId: 0,
    moveUp: false,
    moveDown: false
}
let playing = false;

socket.on('gameplay', (args) => {
    ball.x = args.ball[0];
    ball.y = args.ball[1];
    players.player0.y = args.playerPosY[0];
    players.player1.y = args.playerPosY[1];
    if (players.player0.score !== args.score[0] || players.player1.score !== args.score[1]) {
        players.player0.score = args.score[0];
        players.player1.score = args.score[1];
        console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
    }
});

socket.on('game', (args) => {
    console.log('game');
    console.log(args);
});

socket.on('game-start', (args) => {
    console.log('game-start');
    console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
    data.playerId = args.playerId;
    players.player0.x = args.playerPosX[0];
    players.player1.x = args.playerPosX[1];
    ball.semiSize = args.ballSemiSize;
    players.semiHeight = args.playerSemiHeight;
    playing = true;
    loop();socket.on('gameplay', (args) => {
        ball.x = args.ball[0];
        ball.y = args.ball[1];
        players.player0.y = args.playerPosY[0];
        players.player1.y = args.playerPosY[1];
        if (players.player0.score !== args.score[0] || players.player1.score !== args.score[1]) {
            players.player0.score = args.score[0];
            players.player1.score = args.score[1];
            console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
        }
    });

    socket.on('game', (args) => {
        console.log('game');
        console.log(args);
    });

    socket.on('game-start', (args) => {
        console.log('game-start');
        console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
        data.playerId = args.playerId;
        players.player0.x = args.playerPosX[0];
        players.player1.x = args.playerPosX[1];
        ball.semiSize = args.ballSemiSize;
        players.semiHeight = args.playerSemiHeight;
        playing = true;
        loop();
    });

    socket.on('error', (args) => {
        console.log('error');
        console.log(args);
        socket.on('spectator', (args) => {
            console.log('spectator');
            ball.x = args.ball[0];
            ball.y = args.ball[1];
            players.player0.y = args.playerPosY[1];
            players.player1.y = args.playerPosY[1];
        });
    });

    socket.on('game-finish', (args) => {
        console.log('game-finish');
        playing = false;
        ball.x = args.ball[0];
        ball.y = args.ball[1];
        players.player0.y = args.playerPosY[0];
        players.player1.y = args.playerPosY[1];
        players.player0.score = args.score[0];
        players.player1.score = args.score[1];
        console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
        console.log('Player', players.player0.score > players.player1.score ? 0 : 1, 'win!');
    });

});

socket.on('error', (args) => {
    console.log('error');
    console.log(args);
    socket.on('spectator', (args) => {
        console.log('spectator');
        ball.x = args.ball[0];
        ball.y = args.ball[1];
        players.player0.y = args.playerPosY[1];
        players.player1.y = args.playerPosY[1];
    });
});

socket.on('game-finish', (args) => {
    console.log('game-finish');
    playing = false;
    ball.x = args.ball[0];
    ball.y = args.ball[1];
    players.player0.y = args.playerPosY[0];
    players.player1.y = args.playerPosY[1];
    players.player0.score = args.score[0];
    players.player1.score = args.score[1];
    console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
    console.log('Player', players.player0.score > players.player1.score ? 0 : 1, 'win!');
});

function draw () {
    c2d.clearRect(0, 0, c2d.canvas.width, c2d.canvas.height);
    c2d.canvas.width = window.innerWidth * 0.97;
    c2d.canvas.height = window.innerHeight * 0.97;
    c2d.fillStyle='black';
    c2d.fillRect(0, 0, c2d.canvas.width, c2d.canvas.height);
    c2d.fillStyle='white';
    c2d.fillRect((ball.x - ball.semiSize) * c2d.canvas.width,
        (ball.y - ball.semiSize) * c2d.canvas.height,
        ball.semiSize * 2 * c2d.canvas.width, ball.semiSize * 2 * c2d.canvas.height);
    c2d.fillRect((players.player0.x - ball.semiSize) * c2d.canvas.width,
        (players.player0.y - players.semiHeight) * c2d.canvas.height,
        ball.semiSize * 2 * c2d.canvas.width, players.semiHeight * 2 * c2d.canvas.height);
    c2d.fillRect((players.player1.x - ball.semiSize) * c2d.canvas.width,
        (players.player1.y - players.semiHeight) * c2d.canvas.height,
        ball.semiSize * 2 * c2d.canvas.width, players.semiHeight * 2 * c2d.canvas.height);
}

function loop(){
    socket.emit('keep-alive', data);
    draw();
    if (playing)
        setTimeout(loop, 30);
}

function keyDownHook (event) {
    if (event.key === 'w')
        data.moveUp = true;
    if (event.key === 's')
        data.moveDown = true;
}

function keyUpHook (event) {
    if (event.key === 'w')
        data.moveUp = false;
    if (event.key === 's')
        data.moveDown = false;
}

document.addEventListener('keydown', keyDownHook);
document.addEventListener('keyup', keyUpHook);
