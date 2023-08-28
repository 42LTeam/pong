import React from "react";

import '../../css/homepage.css'
import {useNavigate} from "react-router-dom";

export const LaunchCustomButton = (): JSX.Element => {
    const navigate = useNavigate();
    const searchGame = () => {
        navigate('/game?custom=true');
        //to code with back (ev some more front)
    };

    return (
        <button className="play-button" onClick={searchGame}>
            CUSTOM </button>
    );
};