import React from "react";

import "../../css/homepage.css";
import { useNavigate } from "react-router-dom";

export const LaunchButton = (): JSX.Element => {
  const navigate = useNavigate();
  const searchGame = () => {
    navigate("/game");
    //to code with back (ev some more front)
  };

  return (
    <button className="play-button" onClick={searchGame}>
      PLAY{" "}
    </button>
  );
};
