import React, { useContext, useEffect, useState } from "react";
import { AuthContext, User } from "../Auth";

import "../../css/leaderboard.css"
import ToggleButton from "../../components/utils/ToggleButton";
import { getUserMatches } from "../../api";

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
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        getUserMatches(user?.id)
            .then(function (response) {
                setMatches(response.data);
            })
            .catch(function (error) {
                console.error('Error fetching user matches:', error);
            });
    }, [user])

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

            <div className="leaderboard-tabs-text-place">
                {matches.length > 0 ? `#${props.placement}` : "-" }
            </div>

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