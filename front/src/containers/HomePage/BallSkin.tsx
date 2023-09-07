import React, { useState, useEffect } from "react";

import "../../css/homepage.css";
import Ball from "../../components/svg/Ball";

const colors = ["#ECF0F1", //white
"#00BAFF", //blue
"#E74C3C",  //red
"#2ECC71"]; //green

export const BallSkin = () => {
  const [state, setState] = useState(colors[0]);
  const [shine, setShine] = useState(false);

  const handleBallClickLeft = () => {
    const currentIndex = colors.indexOf(state);
    const nextIndex = (currentIndex - 1 + colors.length) % colors.length;
    setState(colors[nextIndex]);
  };
  const handleBallClickRight = () => {
    const currentIndex = colors.indexOf(state);
    const nextIndex = (currentIndex + 1) % colors.length;
    setState(colors[nextIndex]);
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
    <div className="ball-skin">
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-left.svg"
        onClick={handleBallClickLeft}
      />
      <div className="ball-glow"><Ball color={state} shine={shine}/></div>
      
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-right.svg"
        onClick={handleBallClickRight}
      />
    </div>
  );
};