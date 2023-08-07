import React from "react";

import "../css/profile.css"
import DefeatIcon from "./DefeatIcon";
import VictoryIcon from "./VictoryIcon";

type Props = {
    user: any;
    matchID: number;
}


export default function MatchHistoryBubble(props: Props) {
    
    var OpponentPicture: string = "";
    var OpponentUsername: string = "";
    var scoreUser: number = 0;
    var scoreOpponent: number = 0;
    var time: string = ""; //pas sur de ça

    function getPicture() {
        OpponentPicture =
    "https://cdn.intra.42.fr/users/70f64fba2e18a69e9bef1f5baf2f49db/lzima.jpg"; // a chopper avec back
    };

    function getUsername() {
        OpponentUsername = "lzima <3"; // a chopper avec back
    };

    function getScoreUser() {
        scoreUser = 2; // a chopper avec back
        
        if (props.matchID < 5){
            scoreUser = 6;          //pour avoir des victoire et des défaites
        } 
    };

    function getScoreOpponent() {
        scoreOpponent = 4; // a chopper avec back
    }

    function getTime() {
        time = "02.08.23 04:20"; // a chopper avec back
    }
    
    getPicture();
    getUsername();
    getScoreUser();
    getScoreOpponent();
    getTime();
    
    return (
        <div className="match-history-bubble">
            <div className="match-history-pp-pseudo-group">
                <div className="match-history-profile-picture"
                style={{ backgroundImage: `url(${OpponentPicture})` }}>
                </div>
                <div className="match-history-opponent-pseudo"> {OpponentUsername} </div>
            </div>

            <div className="match-history-data"> {scoreUser} / {scoreOpponent} </div>

            <div className="match-history-data"> {time} </div>

            {scoreUser > scoreOpponent ? <VictoryIcon /> : <DefeatIcon/>}
        </div>
    )
}