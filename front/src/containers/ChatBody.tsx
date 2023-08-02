import "../css/chat.css";
import Conversations from "./social/conversation/Conversations";
import {useState} from "react";
import FriendList from "./social/friend/FriendList";
import React from "react";

export default function ChatBody({user}){

    const [state]=useState(null);



    return (
        <div className="chatbody bubble">
            <Conversations state={state} user={user}></Conversations>
            <div className="vertical-separator"></div>

            {state ? 'Pas dans friend' : (<FriendList user={user}></FriendList>)}

        </div>
    )
}
