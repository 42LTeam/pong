import React, { useContext, useState } from "react";

import LeaderboardTab from "./LeaderboardTab";
import { AuthContext } from "../Auth";

import "../../css/leaderboard.css"
import ToggleButton from "../../components/utils/ToggleButton";

const addStates = [
    {
        background: '#2ECC71',
        color: 'white',
    },
    {
        color: '#2ECC71',
        background: 'none',
    }
]

const tabState = [
    {
        background: 'none',
        color: '#7F8C8D',
    },
    {
        borderRadius: '10px',
        background: '#2D3843',
        color: '#7F8C8D',
    }
]

type Props = {
    states : string[];
    handleClick : any;
    state : string;
    placement : number;
}

export default function LeaderboardTabs(props: Props) {

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

            <div className="leaderboard-tabs-text-place"> #{props.placement}</div>

            <div className="vertical-separator"></div>

            {props.states.map((current) => {
                    return (<ToggleButton key={current+"friendtab"}
                                          handleClick={props.handleClick}
                                          text={current}
                                          states={current == "Ajouter" ? addStates : tabState}
                                          current={props.state}
                                          hoverProps={current == "Ajouter" ? null : {background: '#34495E'}}
                    ></ToggleButton>);
            })}
        </div>
    );
}