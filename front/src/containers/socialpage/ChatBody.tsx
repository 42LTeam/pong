import React from "react";
import {useState} from "react";

import Conversations from "./conversation/Conversations";
import FriendList from "./friend/FriendList";

import "../../css/social/chat.css";

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
