import React from "react";

import TextIcon from "../../components/TextIcon";

import "../../css/profile.css"
import { MatchResume } from "./ProfilePage";


type Props = {
    user: any;
    matchResume: MatchResume;
}


export default function MatchHistoryBubble(props: Props) {
    
    return (
        <div className="match-history-bubble">
            <div className="match-history-pp-pseudo-group">
                <div className="match-history-profile-picture"
                style={{ backgroundImage: `url(${props.matchResume.OpponentAvatar})` }}>
                </div>
                <div className="match-history-opponent-pseudo"> {props.matchResume.OpponentUsername} </div>
            </div>

            <div className="match-history-data"> {props.matchResume.UserScore} / {props.matchResume.OpponentScore} </div>

            {/* <div className="match-history-data"> {time} </div> */}

            {props.matchResume.UserScore > props.matchResume.OpponentScore ?
            <TextIcon style={"victory-icon"} text={"Victory"} /> :
            <TextIcon style={"defeat-icon"} text={"Defeat"} />}
        </div>
    )
}