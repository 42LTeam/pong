import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import HeaderNavigationIcon from "./HeaderNavigationIcon";

import "../../css/header.css";
import ChatIcon from "../../components/svg/ChatIcon";
import PlayIcon from "../../components/svg/PlayIcon";
import LeaderboardIcon from "../../components/svg/LeaderboardIcon";

const NavigationBubble = () => {
  const navigate = useNavigate();
  let location = useLocation();

  const [state, setState] = useState(location.pathname);

  const handleClick = (text) => {
    setState(text);
    navigate(text);
  };

  useEffect(() => {
    setState(location.pathname);
  }, [location.pathname]);

  return (
    <div className="navigation bubble">
      <HeaderNavigationIcon
        handleClick={handleClick}
        text="/social"
        state={state}
        children={<ChatIcon />}
        description="Social"
      ></HeaderNavigationIcon>

      <HeaderNavigationIcon
        handleClick={handleClick}
        text="/"
        state={state}
        children={<PlayIcon />}
        description="Accueil"
      ></HeaderNavigationIcon>

      <HeaderNavigationIcon
        handleClick={handleClick}
        text="/leaderboard"
        state={state}
        children={<LeaderboardIcon />}
        description="Leaderboard"
      ></HeaderNavigationIcon>
    </div>
  );
};

export default NavigationBubble;
