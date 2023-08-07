import React from "react";

import QuickInviteButton from "../../components/QuickInviteButton"

import "../../css/homepage.css"

type Props = {
    userID: number;
}


export default function FriendQuickInviteBubble(props: Props) {
    
    var Victory: number = 0;
    var Defeat: number = 0;
    var Username: string = "";

    function getVictory() {
        Victory = 5; // a chopper avec back
    };

    function getDefeat() {
        Defeat = 2; // a chopper avec back
    };

    function getUsername() {
        Username = "Judas"; // a chopper avec back
    };
    
    getVictory();
    getDefeat();
    getUsername();
    
    return (
        <div className="quick-invite-bubble">
            <div className="quick-invite-pp-pseudo-group">
                <div className="quick-invite-profile-picture"></div>
                <div className="quick-invite-pseudo"> {Username} </div>
            </div>
            <div className="quick-invite-ratio"> {Victory} victoires/{Defeat} défaites </div>
            <QuickInviteButton userID={props.userID} />
        </div>
    )
}