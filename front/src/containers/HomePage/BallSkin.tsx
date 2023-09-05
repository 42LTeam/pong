import React from "react";

import "../../css/homepage.css";

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
      <img className="rectangle" alt="ball" src="/svg/ball.svg" />
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-right.svg"
        onClick={handleClickRight}
      />
    </div>
  );
};
