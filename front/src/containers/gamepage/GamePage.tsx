import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotFound from "../NotFound";

export enum gameState {
  CREATING,
  STARTING,
  PLAYING,
  PAUSE,
  FINISH,
}

const dataGame = {
    matchId: 0,
    playerId: 0,
    moveUp: false,
    moveDown: false,
    custom: false,
    finished: false,
    konami: false,
  };

export default function GamePage() {
  const canvas = useRef(null);
  const [searchParams] = useSearchParams();
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
    "Enter",
  ];

  
  const ball = {
    x: 0.5,
    y: 0.5,
    semiSize: 0,
    color: "",
    shine: false,
  };
  const players = {
    player0: {
      x: 0,
      y: 0.5,
      score: 0,
      name: "",
    },
    player1: {
      x: 1,
      y: 0.5,
      score: 0,
      name: "",
    },
    semiHeight: 0,
  };

  const getData = (args) => {
    ball.x = args.ball.x;
    ball.y = args.ball.y;
    players.player0.y = args.player0.y;
    players.player1.y = args.player1.y;
    if (
      players.player0.score !== args.score[0] ||
      players.player1.score !== args.score[1]
    ) {
      players.player0.score = args.score[0];
      players.player1.score = args.score[1];
    }
  };

  const drawBackground = (c2d) => {
    const dpr = window.devicePixelRatio || 1;
    c2d.clearRect(0, 0, c2d.canvas.width, c2d.canvas.height);
    c2d.canvas.width = window.innerWidth * dpr;
    c2d.canvas.height = window.innerHeight * 0.8 * dpr;
    c2d.fillStyle = "black";
    c2d.fillRect(0, 0, c2d.canvas.width, c2d.canvas.height);
  };

  const drawPlayer = (c2d, player, fontSize, custom) => {
    const textPos = fontSize + 5;
    const left = player.x < 0.5;
    c2d.textAlign = left ? "left" : "right";
    c2d.fillText(player.name, c2d.canvas.width * (left ? 0.05 : 0.95), textPos);
    c2d.fillText(
      player.score.toString(),
      c2d.canvas.width * (left ? 0.45 : 0.55),
      textPos
    );
    if (!custom || (custom && 0.35 < ball.x && ball.x < 0.65))
    {
      c2d.fillRect(
        (player.x - ball.semiSize) * c2d.canvas.width,
        (player.y - players.semiHeight) * c2d.canvas.height,
        ball.semiSize * 2 * c2d.canvas.width,
        players.semiHeight * 2 * c2d.canvas.height
      );
    }
  };

  const drawText = (c2d, status, countdown) => {
    c2d.textAlign = "center";
    const width = c2d.canvas.width / 2;
    const height = c2d.canvas.height / 2;
    switch (status) {
      case gameState.CREATING: {
        c2d.fillText("Waiting for player", width, height);
        break;
      }
      case gameState.STARTING: {
        c2d.fillText(countdown, width, height * 0.8);
        break;
      }
      case gameState.PLAYING: {
        if (ball.color === "#000000") {
          c2d.fillText("CHEH Jérôme <3", width, height);
        }
        break;
      }
      case gameState.PAUSE: {
        c2d.fillText("Pause", width, height);
        c2d.fillText("If your opponent does not come back in [" + countdown + "] s", width, height+(height / 5), width * 1.9);
        c2d.fillText("you will win with a score of 5 - 0", width, height+(height / 2.5), width * 1.9);
        break;
      }
      case gameState.FINISH: {
        if (
          players.player0.score > players.player1.score
            ? dataGame.playerId == 0
            : dataGame.playerId == 1
        )
          c2d.fillText("You win!", width, height);
        else c2d.fillText("You lose!", width, height);
        c2d.fillText('Press [esc] to go home', width, height + (height / 5));
        break;
      }
    }
  };

  const drawBall = (c2d) => {
    const ballSize =
      2 * Math.min(c2d.canvas.width, c2d.canvas.height) * ball.semiSize;
    const ballX = ball.x * c2d.canvas.width;
    const ballY = ball.y * c2d.canvas.height;
    c2d.fillStyle = ball.color;
    c2d.beginPath();
    c2d.arc(ballX, ballY, ballSize, 0, 2 * Math.PI);
    c2d.fill();

    if (ball.shine) {
      const gradient = c2d.createRadialGradient(
        ballX,
        ballY,
        0,
        ballX,
        ballY,
        4 * ballSize
      );
      gradient.addColorStop(0, `${ball.color}99`);
      gradient.addColorStop(1, `${ball.color}10`);
      c2d.fillStyle = gradient;

      c2d.beginPath();
      c2d.arc(ballX, ballY, 4 * ballSize, 0, 2 * Math.PI);
      c2d.fill();
    }
  };

  const draw = (status, countdown) => {
    if (!canvas?.current) return;
    const c2d = canvas.current.getContext("2d");
    drawBackground(c2d);
    if (
      players.player0.name === "jjaqueme" ||
      players.player1.name === "jjaqueme"
    )
      c2d.fillStyle = "pink";
    else c2d.fillStyle = "white";
    const fontSize = 0.05 * Math.min(c2d.canvas.width, c2d.canvas.height);
    c2d.font = fontSize + "px monospace";
    drawPlayer(c2d, players.player0, fontSize, dataGame.custom);
    drawPlayer(c2d, players.player1, fontSize, dataGame.custom);
    drawText(c2d, status, countdown);
    drawBall(c2d);
  };

  const [konamiIndex, setKonamiIndex] = useState(0);
  
  const handleKeyDown = (event) => {
    const currentKey = event.key;
    const expectedKey = konamiCode[konamiIndex];

    if (currentKey === expectedKey) {
      if (konamiIndex === konamiCode.length - 1) {
        console.log("Code Konami entré !");
        dataGame.konami = !dataGame.konami;
        setKonamiIndex(0);
      } else {
        setKonamiIndex(konamiIndex + 1);
      }
    } else {
      setKonamiIndex(0);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [konamiIndex]);

  useEffect(() => {
    const onGameWait = () => {
      draw(gameState.CREATING, 0);
    };

    const onGamePlay = (args) => {
      if (args) getData(args);
      draw(gameState.PLAYING, 0);
    };

    const onGameStart = (args) => {
      if (args) {
        getData(args);
        dataGame.matchId = args.matchId;
        dataGame.playerId = args.playerId;
        ball.semiSize = args.ballSemiSize;
        players.player0.x = args.player0.x;
        players.player1.x = args.player1.x;
        players.semiHeight = args.playerSemiHeight;
        players.player0.name = args.player0Name;
        players.player1.name = args.player1Name;
        dataGame.custom = args.custom;
        ball.color = args.colorball;
      }
      draw(gameState.STARTING, args.countdown);
    };

    const onGamePause = (args) => {
      if (args) getData(args);
      draw(gameState.PAUSE, args.countdown);
    };

    const onError = (args) => {
      console.log("error");
    };

    const onGameFinish = (args) => {
      dataGame.finished = true;
      if (args) getData(args);
      draw(gameState.FINISH, 0);
    };

    const onGameNotFound = () => {
      setNotFound(true);
    };

    const keyDownHook = (event) => {
      if (event.key === "w" && !dataGame.moveUp) {
        dataGame.moveUp = true;
        socket.emit("update-input", dataGame);
      }
      if (event.key === "s" && !dataGame.moveDown) {
        dataGame.moveDown = true;
        socket.emit("update-input", dataGame);
      }
      if (event.key === "l") {
        event.preventDefault();
        ball.shine = !ball.shine;
      }
      if (event.key === "Escape" && dataGame.finished) {
          navigate('/');
      }
    };

    const keyUpHook = (event) => {
      if (event.key === "w") {
        dataGame.moveUp = false;
        socket.emit("update-input", dataGame);
      }
      if (event.key === "s") {
        dataGame.moveDown = false;
        socket.emit("update-input", dataGame);
      }
    };

    socket.on("gameplay", onGamePlay);
    socket.on("game-wait", onGameWait);
    socket.on("game-start", onGameStart);
    socket.on("game-pause", onGamePause);
    socket.on("error", onError);
    socket.on("game-finish", onGameFinish);
    socket.on("game-not-found", onGameNotFound);
    document.addEventListener("keydown", keyDownHook);
    document.addEventListener("keyup", keyUpHook);


    return () => {
      socket.emit("leave-game");
      socket.off("gameplay", onGamePlay);
      socket.off("game-wait", onGameWait);
      socket.off("game-start", onGameStart);
      socket.off("game-pause", onGamePause);
      socket.off("error", onError);
      socket.off("game-finish", onGameFinish);
      socket.off("game-not-found", onGameNotFound);
      document.removeEventListener("keydown", keyDownHook);
      document.removeEventListener("keyup", keyUpHook);
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      if (searchParams.size > 3) {
        const player = Object.fromEntries([...searchParams]);
        player.id = Number(player.id);
        socket.emit("invite-game", [player, player.custom]);
      } else if (searchParams.size > 0) {
        const option = Object.fromEntries([...searchParams]);
        socket.emit("join-game", [option.invite, option.custom, option.id]);
      } else socket.emit("join-game", [false, false]);
    }
  }, [canvas]);
  if (notFound === true) return <NotFound />;
  return (
    <>
      <canvas ref={canvas}></canvas>
    </>
  );
}
