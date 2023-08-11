import React, { useContext } from "react";
import {useState} from "react";

import LeaderboardTab from "./LeaderboardTab";
import { AuthContext } from "../Auth";

import "../../css/leaderboard.css"

export default function LeaderboardTabs(){

    const user = useContext(AuthContext);
    const [state, setState] = useState("Total xp");
    var placement: number = 1;

    function getPlacement() {
        if (state === "Total xp"){
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
                <div className="leaderboard-tabs-text"> {user.username} </div>
            )}

            <div className="leaderboard-tabs-text-place"> #{placement}</div>

            <div className="vertical-separator"></div>
            <LeaderboardTab handleClick={handleClick} text="Total xp" state={state} />
            <LeaderboardTab handleClick={handleClick} text="Victories / defeat ratio" state={state} />
            <LeaderboardTab handleClick={handleClick} text="Average points per match" state={state} />
        </div>
    );
}