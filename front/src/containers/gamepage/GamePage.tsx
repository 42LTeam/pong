import React, {useEffect, useRef} from 'react';
import {socket} from "../../api";

export default function GamePage() {
    const canvas = useRef(null);

    const data={
        matchId: 1,
        playerId: 0,
        moveUp: false,
        moveDown: false
    };
    const ball = {
        x: 0.5,
        y: 0.5,
        semiSize: 0
    };
    const players={
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
    };

    const draw = () => {
        if (!canvas?.current) return ;
        const c2d = canvas.current.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        c2d.clearRect(0, 0, c2d.canvas.width, c2d.canvas.height);
        c2d.canvas.width = window.innerWidth * dpr;
        c2d.canvas.height = window.innerHeight * 0.8 * dpr;
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

    const getData = (args) => {
        ball.x = args.ball.x;
        ball.y = args.ball.y;
        players.player0.y = args.player0.y;
        players.player1.y = args.player1.y;
        if (players.player0.score !== args.score[0] || players.player1.score !== args.score[1]) {
            players.player0.score = args.score[0];
            players.player1.score = args.score[1];
            console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
        }
    }

    useEffect(() => {
        const onGameWait = (args) => {
            console.log('game-wait');
            console.log(args);
        }

        const onGamePlay = (args) => {
            getData(args);
            draw();
        };

        const onGameStart = (args) => {
            console.log('game-start');
            data.playerId = args.playerId;
            ball.semiSize = args.ballSemiSize;
            players.player0.x = args.player0.x;
            players.player1.x = args.player1.x;
            players.semiHeight = args.playerSemiHeight;
            console.log('You are Player', data.playerId, '(', data.playerId === 0 ? 'left' : 'right', ')');
            console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
        };

        const onError = (args) => {
            console.log('error');
            console.log(args);
            // socket.on('spectator', (args) => {
            //     console.log('spectator');
            //     getData(args);
            // });
        };

        const onGameFinish = (args) => {
            console.log('game-finish');
            getData(args);
            if (players.player0.score > players.player1.score ? data.playerId === 0 : data.playerId === 1)
                console.log('You win!');
            else
                console.log('You lose!');
        };

        const keyDownHook  = (event) => {
            if (event.key === 'w' && !data.moveUp) {
                data.moveUp = true;
                socket.emit('update-input', data);
            }
            if (event.key === 's' && !data.moveDown) {
                data.moveDown = true;
                socket.emit('update-input', data);
            }
        }

        const keyUpHook = (event) => {
            if (event.key === 'w') {
                data.moveUp = false;
                socket.emit('update-input', data);
            }
            if (event.key === 's') {
                data.moveDown = false;
                socket.emit('update-input', data);
            }
        }

        socket.on('gameplay', onGamePlay);
        socket.on('game-wait', onGameWait);
        socket.on('game-start', onGameStart);
        socket.on('error', onError);
        socket.on('game-finish', onGameFinish);
        document.addEventListener('keydown', keyDownHook);
        document.addEventListener('keyup', keyUpHook);

        return () => {
            socket.emit('leave-game', {matchId: 1});
            socket.off('gameplay', onGamePlay);
            socket.off('game-wait', onGameWait);
            socket.off('game-start', onGameStart);
            socket.off('error', onError);
            socket.off('game-finish', onGameFinish);
            document.removeEventListener('keydown', keyDownHook);
            document.removeEventListener('keyup', keyUpHook);
        }
    },[]);

    useEffect(() => {
        if (canvas)
            socket.emit('join-game', {matchId: 1})
    }, [canvas])
    return (
        <>
            <canvas ref={canvas}></canvas>
        </>
    )
}