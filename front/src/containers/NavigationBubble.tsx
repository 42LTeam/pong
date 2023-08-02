import "../css/header.css";

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ChatButton from "../components/ChatButton";
import PlayButton from "../components/PlayButton";
import HeaderNavigationIcon from "../components/HeaderNavigationIcon";
import LeaderboardButton from "../components/LeaderboardButton";



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
        <HeaderNavigationIcon handleClick={handleClick} text="/chat"
        state={state} children={<ChatButton />} description="chat"></HeaderNavigationIcon>

        <HeaderNavigationIcon handleClick={handleClick} text="/"
        state={state} children={<PlayButton />} description="home"></HeaderNavigationIcon>

        <HeaderNavigationIcon handleClick={handleClick} text="/leaderboard"
        state={state} children={<LeaderboardButton />} description="leaderboard"></HeaderNavigationIcon>
    </div>
    );
};

export default NavigationBubble;