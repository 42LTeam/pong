import "../css/header.css";

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ChatButton from "../components/ChatButton";
import PlayButton from "../components/PlayButton";
import SettingsButton from "../components/SettingsButton";
import HeaderNavigationIcon from "../components/HeaderNavigationIcon";


const NavigationBubble = () => {
    //const navigate = useNavigate();

    const [state, setState] = useState("/");

    const handleClick = (text) => {
        setState(text);
        //navigate(text);   //Need to configure the routes with React routes
    };
    
    return (
    <div className="navigation bubble">
        <HeaderNavigationIcon handleClick={handleClick} text="/chat" state={state} children={<ChatButton />}></HeaderNavigationIcon>
        <HeaderNavigationIcon handleClick={handleClick} text="/" state={state} children={<PlayButton />}></HeaderNavigationIcon>
        <HeaderNavigationIcon handleClick={handleClick} text="/settings" state={state} children={<SettingsButton />}></HeaderNavigationIcon>
    </div>
    );
};

export default NavigationBubble;