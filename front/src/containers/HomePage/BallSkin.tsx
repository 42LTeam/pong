import React from "react";

import "../../css/homepage.css";
import Ball from "../../components/svg/ball";

export const BallSkin = () => {
  const handleClickLeft = () => {
    console.log("click on gauche #BallSkin");
  };
  const handleClickRight = () => {
    console.log("click on droite #BallSkin");
  };

  return (
    <div className="ball-skin">
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-left.svg"
        onClick={handleClickLeft}
      />
      <div className="ball-glow"><Ball /></div>
      
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-right.svg"
        onClick={handleClickRight}
      />
    </div>
  );
};
