import '../css/playbutton.css'
import React from "react";
import {searchForWorkspaceRoot} from "vite";


export const LaunchButton = (): JSX.Element => {
    const searchGame = () => {
        console.log("i wanna play");
        //to code with back (and ev. some more front)
    };

    return (
        <button className="play-button" onClick={searchGame}>
            PLAY </button>
    );
};