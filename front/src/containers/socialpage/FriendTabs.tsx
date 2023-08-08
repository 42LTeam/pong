import React from "react";
import {useState} from "react";

import FriendButton from "../../components/friend/FriendButton";
import FriendTab from "../../components/friend/FriendTab";
import AddFriendButton from "../../components/friend/AddFriendButton";

export default function FriendTabs(){
    const [state, setState] = useState("Tous");

    const handleClick = (text) => {
        setState(text);
    }
    return (
        <div className="friend-tabs">
            <FriendButton state={1}/>
            <div className="vertical-separator"></div>
            <FriendTab handleClick={handleClick} text="Tous" state={state}></FriendTab>
            <FriendTab handleClick={handleClick} text="En attente" state={state}></FriendTab>
            <FriendTab handleClick={handleClick} text="Bloqué" state={state}></FriendTab>
            <AddFriendButton handleClick={handleClick} text="Ajouter" state={state}></AddFriendButton>
        </div>
    );
}