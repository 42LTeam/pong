import React from "react";

import "../../css/homepage.css";

export const PlayerSkin = () => {
  const handleClickLeft = () => {
    console.log("click on gauche #PlayerSkin");
  };
  const handleClickRight = () => {
    console.log("click on droite #PlayerSkin");
  };

  return (
    <div className="player-skin">
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-left.svg"
        onClick={handleClickLeft}
      />
      <img className="rectangle" alt="Rectangle" src="/svg/barre.svg" />
      <img
        className="vector"
        alt="Vector"
        src="/svg/vector-right.svg"
        onClick={handleClickRight}
      />
    </div>
  );
};
