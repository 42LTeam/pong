import React, { useState, useEffect } from "react";

import "../../css/homepage.css";
import Ball from "../../components/svg/ball";

const states = ["#ECF0F1", //white
"#00BAFF", //blue
"#E74C3C",  //red
"#2ECC71"]; //green

export const BallSkin = () => {
  const [state, setState] = useState(states[0]);
  const [shine, setShine] = useState(false);

  const handleClickLeft = () => {
    const currentIndex = states.indexOf(state);
    const nextIndex = (currentIndex - 1 + states.length) % states.length;
    setState(states[nextIndex]);
  };
  const handleClickRight = () => {
    const currentIndex = states.indexOf(state);
    const nextIndex = (currentIndex + 1) % states.length;
    setState(states[nextIndex]);
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
        onClick={handleClickLeft}
      />
      <div className="ball-glow"><Ball color={state} shine={shine}/></div>
      
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-right.svg"
        onClick={handleClickRight}
      />
    </div>
  );
};