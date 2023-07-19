import "../css/chat.css";
import Conversations from "./Conversations";
import {useState} from "react";
import FriendList from "./FriendList";
import { AddFriendInvite } from "../components/AddFriendInvite";
import React from "react";

export default function ChatBody(){

    const [state, setState]=useState(null);



    return (
        <div className="chatbody bubble">
            <Conversations stats={state}></Conversations>
            <div className="vertical-separator"></div>

            {state ? 'Pas dans friend' : (<FriendList></FriendList>)}

        </div>
    )
}