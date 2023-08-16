import React, {useEffect, useRef, useState} from 'react';
import {socket} from "../../api";

export default function GamePage() {
    const canvas = useRef(null);

    const [playing, setPlaying] = useState(false);

    const [data, setData] = useState({
        playerId: 0,
        moveUp: false,
        moveDown: false
    })

    const [ball, setBall] = useState({
        x: 0.5,
        y: 0.5,
        semiSize: 0
    })
    const [players, setPlayers] = useState({
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
    });

    const draw = () => {
        if (!canvas) return ;
        const c2d = canvas.current.getContext('2d');
        c2d.clearRect(0, 0, c2d.canvas.width, c2d.canvas.height);
        c2d.canvas.width = window.innerWidth * 0.97;
        c2d.canvas.height = window.innerHeight * 0.97;
        c2d.fillStyle='black';
        c2d.fillRect(0, 0, c2d.canvas.width, c2d.canvas.height);
        c2d.fillStyle='white';
        const ballBuffer = {
            ...ball,
        }
        setBall(ballBuffer);
        const playersBuffer = {
            ...players,
        }
        setPlayers(playersBuffer);
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

    useEffect(() => {
        const onGameWait = (args) => {
            console.log('game-wait');
            console.log(args);
        }

        const onGamePlay = (args) => {
            const ballBuffer = {
                ...ball,
                x: args.ball[0],
                y: args.ball[1],
            }
            setBall(ballBuffer);
            const playersBuffer = {
                ...players,
                player0: {
                    ...players.player0,
                    y: args.playerPosY[0],
                },
                player1: {
                    ...players.player1,
                    y: args.playerPosY[1],
                },
            }
            setPlayers(playersBuffer);
            if (playersBuffer.player0.score !== args.score[0] || playersBuffer.player1.score !== args.score[1]) {
                playersBuffer.player0.score = args.score[0];
                playersBuffer.player1.score = args.score[1];
                console.log('Player 0 :', playersBuffer.player0.score, '- Player 1 :', playersBuffer.player1.score);
            }
        };

        const onGameStart = (args) => {
            console.log('game-start');
            console.log('Player 0 :', players.player0.score, '- Player 1 :', players.player1.score);
            const dataBuffer = {
                ...data,
                playerId: args.playerId,
            }
            setData(dataBuffer);
            const ballBuffer = {
                ...ball,
                semiSize: args.ballSemiSize,
            }
            setBall(ballBuffer);
            const playersBuffer = {
                ...players,
                player0: {
                    ...players.player0,
                    x: args.playerPosX[0],
                },
                player1: {
                    ...players.player1,
                    x: args.playerPosX[1],
                },
                semiHeight: args.playerSemiHeight,
            }
            setPlayers(playersBuffer);
            setPlaying(true);
            loop();
        };

        const onError = (args) => {
            console.log('error');
            console.log(args);
            socket.on('spectator', (args) => {
                console.log('spectator');
                const ballBuffer = {
                    ...ball,
                    x: args.ball[0],
                    y: args.ball[1],
                }
                setBall(ballBuffer);
                const playersBuffer = {
                    ...players,
                    player0: {
                        ...players.player0,
                        y: args.playerPosY[0],
                    },
                    player1: {
                        ...players.player1,
                        y: args.playerPosY[1],
                    },
                }
                setPlayers(playersBuffer);
            });
        };

        const onGameFinish = (args) => {
            console.log('game-finish');
            setPlaying(false);
            const ballBuffer = {
                ...ball,
                x: args.ball[0],
                y: args.ball[1],
            }
            setBall(ballBuffer);
            const playersBuffer = {
                ...players,
                player0: {
                    ...players.player0,
                    y: args.playerPosY[0],
                    score: args.score[0],
                },
                player1: {
                    ...players.player1,
                    y: args.playerPosY[1],
                    score: args.score[1],
                },
            }
            setPlayers(playersBuffer);
            console.log('Player 0 :', playersBuffer.player0.score, '- Player 1 :', playersBuffer.player1.score);
            console.log('Player', players.player0.score > players.player1.score ? 0 : 1, 'win!');
        };

        const keyDownHook  = (event) => {
            if (event.key === 'w')
                data.moveUp = true;
            if (event.key === 's')
                data.moveDown = true;
        }

        const keyUpHook = (event) => {
            if (event.key === 'w')
                data.moveUp = false;
            if (event.key === 's')
                data.moveDown = false;
        }

        socket.on('gameplay', onGamePlay);
        socket.on('game-wait', onGameWait);
        socket.on('game-start', onGameStart);
        socket.on('error', onError);
        socket.on('game-finish', onGameFinish);
        document.addEventListener('keydown', keyDownHook);
        document.addEventListener('keyup', keyUpHook);

        return () => {
            socket.emit('leave-game');
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
            socket.emit('join-game', 1)
    }, [canvas])
    return (
        <>
            <canvas ref={canvas}></canvas>
        </>
    )
}