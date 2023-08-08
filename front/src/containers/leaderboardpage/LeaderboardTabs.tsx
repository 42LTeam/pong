import React from "react";
import {useState} from "react";

import LeaderboardTab from "./LeaderboardTab";

import "../../css/leaderboard.css"

export default function LeaderboardTabs({user}){
    const [state, setState] = useState("Total victories");
    var placement: number = 1;

    function getPlacement() {
        if (state === "Total victories"){
            placement = 1;  //a chopper en back
        }
        else if (state === "Victories / defeat ratio"){
            placement = 2;  //a chopper en back
        }
        else if (state === "Average points per match"){
            placement = 3;  //a chopper en back
        }
    }

    const handleClick = (text) => {
        setState(text);
    }

    getPlacement();

    return (
        <div className="leaderboard-tabs">
            
            {user?.avatar && (
                <div
                    className="leaderboard-profile-picture"
                    style={{ backgroundImage: `url(${user.avatar})` }}
                />
            )}
            {user?.username && (
                <div className="leaderboard-tabs-text"></div>
            )}

            <div className="leaderboard-tabs-text-place"> #{placement}</div>

            <div className="vertical-separator"></div>
            <LeaderboardTab handleClick={handleClick} text="Total victories" state={state} />
            <LeaderboardTab handleClick={handleClick} text="Victories / defeat ratio" state={state} />
            <LeaderboardTab handleClick={handleClick} text="Average points per match" state={state} />
        </div>
    );
}