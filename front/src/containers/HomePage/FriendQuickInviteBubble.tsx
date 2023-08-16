import React from "react";

import QuickInviteButton from "./QuickInviteButton"

import "../../css/homepage.css"
import { User } from "../Auth";

type Props = {
    user: User;
}


export default function FriendQuickInviteBubble(props: Props) {
    
    var Victory: number = 0;
    var Defeat: number = 0;

    function getVictory() {
        Victory = 5; // a chopper avec back
    };

    function getDefeat() {
        Defeat = 2; // a chopper avec back
    };
    
    getVictory();
    getDefeat();
    
    return (
        <div className="quick-invite-bubble">
            <div className="quick-invite-pp-pseudo-group">
                <div className="quick-invite-profile-picture"
                    style={{ backgroundImage: `url(${props.user.avatar})` }}>
                </div>
                <div className="quick-invite-pseudo"> {props.user.username} </div>
            </div>
            <div className="quick-invite-ratio"> {Victory} victoires/{Defeat} défaites </div>
            <QuickInviteButton userID={props.user.id} />
        </div>
    )
}