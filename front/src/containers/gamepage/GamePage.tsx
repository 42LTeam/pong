import React, { useContext, useEffect, useRef } from "react";
import { socket } from "../../api";
import { useSearchParams } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";

export enum gameState {
  CREATING,
  STARTING,
  PLAYING,
  PAUSE,
  FINISH,
}

export default function GamePage() {
  const canvas = useRef(null);
  const [searchParams] = useSearchParams();

  const dataGame = {
    matchId: 0,
    playerId: 0,
    moveUp: false,
    moveDown: false,
  };
  const ball = {
    x: 0.5,
    y: 0.5,
    semiSize: 0,
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

  const drawPlayer = (c2d, player, fontSize) => {
    const textPos = fontSize + 5;
    const left = player.x < 0.5;
    c2d.textAlign = left ? "left" : "right";
    c2d.fillText(player.name, c2d.canvas.width * (left ? 0.1 : 0.9), textPos);
    c2d.fillText(
      player.score.toString(),
      c2d.canvas.width * (left ? 0.375 : 0.625),
      textPos,
    );
    c2d.fillRect(
      (player.x - ball.semiSize) * c2d.canvas.width,
      (player.y - players.semiHeight) * c2d.canvas.height,
      ball.semiSize * 2 * c2d.canvas.width,
      players.semiHeight * 2 * c2d.canvas.height,
    );
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
        c2d.fillText(countdown, width, height);
        break;
      }
      case gameState.PAUSE: {
        c2d.fillText("Pause", width, height);
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
        break;
      }
    }
  };

  const draw = (status, countdown) => {
    if (!canvas?.current) return;
    const c2d = canvas.current.getContext("2d");
    drawBackground(c2d);
    c2d.fillStyle = "white";
    const fontSize = Math.min(c2d.canvas.width, c2d.canvas.height) * 0.05;
    c2d.font = fontSize + "px monospace";
    drawPlayer(c2d, players.player0, fontSize);
    drawPlayer(c2d, players.player1, fontSize);
    drawText(c2d, status, countdown);
    c2d.fillRect(
      (ball.x - ball.semiSize) * c2d.canvas.width,
      (ball.y - ball.semiSize) * c2d.canvas.height,
      ball.semiSize * 2 * c2d.canvas.width,
      ball.semiSize * 2 * c2d.canvas.height,
    );
  };

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
      }
      draw(gameState.STARTING, args.countdown);
    };

    const onGamePause = (args) => {
      if (args) getData(args);
      draw(gameState.PAUSE, 0);
    };

    const onError = (args) => {
      console.log("error");
      if (args) console.log(args);
    };

    const onGameFinish = (args) => {
      if (args) getData(args);
      draw(gameState.FINISH, 0);
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
      document.removeEventListener("keydown", keyDownHook);
      document.removeEventListener("keyup", keyUpHook);
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      if (searchParams.size > 3) {
        let player = Object.fromEntries([...searchParams]);
        player.id = Number(player.id);
        socket.emit("invite-game", [player, player.custom]);
      } else if (searchParams.size > 0) {
        let option = Object.fromEntries([...searchParams]);
        console.log("Game Page :", option.invite, option.custom, option.id);
        socket.emit("join-game", [option.invite, option.custom, option.id]);
      } else socket.emit("join-game", [false, false]);
    }
  }, [canvas]);
  return (
    <>
      <canvas ref={canvas}></canvas>
    </>
  );
}
