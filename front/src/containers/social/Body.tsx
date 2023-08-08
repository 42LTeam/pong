import "../../css/chat.css";
import Conversations from "./conversation/Conversations";
import {useState} from "react";
import Friends from "./friend/Friends";
import Chat from "./chat/Chat";

export default function Body(){

    const [state, setState]=useState(null);



    return (
            <div className="chatbody bubble">
                <Conversations state={state} setState={setState} ></Conversations>
                <div className="vertical-separator"></div>
                {state ? (<Chat channel={state}></Chat>): (<Friends></Friends>)}
            </div>
    )
}