import React, { useEffect, useState } from "react";

import "../../css/homepage.css";
import Button from "../../components/utils/Button";
import { useNavigate } from "react-router-dom";
import FriendQuickInvite from "./FriendQuickInvite";
import Ball from "../../components/svg/Ball";
import Test from "./Test";

const colors = ["#ECF0F1", //white
"#00BAFF", //blue
"#E74C3C",  //red
"#2ECC71"]; //green

export default function HomePage() {
  const navigate = useNavigate();
  const handlePlayerClickLeft = () => {
    console.log("click on gauche #PlayerSkin");
  };
  const handlePlayerClickRight = () => {
    console.log("click on droite #PlayerSkin");
  };
  const [color, setColor] = useState(colors[0]);
  const [shine, setShine] = useState(false);

  const handleBallClickLeft = () => {
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex - 1 + colors.length) % colors.length;
    setColor(colors[nextIndex]);
  };
  const handleBallClickRight = () => {
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    setColor(colors[nextIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.key === "l" || event.key === "L") &&
      event.target.tagName !== "INPUT" &&
      event.target.tagName !== "TEXTAREA"
      ) {
        setShine(!shine);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [shine]);

  return (
    <>
      <div className="frame">
        <div className="frame-left">
          <div className="skin-selection">
          <div className="player-skin">
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-left.svg"
        onClick={handlePlayerClickLeft}
      />
      <img className="rectangle" alt="Rectangle" src="/svg/barre.svg" />
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-right.svg"
        onClick={handlePlayerClickRight}
      />
    </div>
    <div className="ball-skin">
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-left.svg"
        onClick={handleBallClickLeft}
      />
      <div className="ball-glow"><Ball color={color} shine={shine}/></div>
      
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-right.svg"
        onClick={handleBallClickRight}
      />
    </div>
    <Button
      handleClick={() => navigate("/game", { state: { color: color, shine } })}
      text={"PLAY"}
      clickable
      buttonProps={{
        style: {
          width: "220px",
          height: "60px",
          fontSize: "37px",
        },
      }}
    ></Button>
    <Button
      handleClick={() => navigate("/game?custom=true", { state: { color: color, shine } })}
      text={"CUSTOM"}
      clickable
      buttonProps={{
        style: {
          width: "220px",
          height: "60px",
          fontSize: "37px",
        },
      }}
    ></Button>
  </div>
</div>
<div className="frame-right">
  <FriendQuickInvite></FriendQuickInvite>
</div>
</div>
</>
);
}