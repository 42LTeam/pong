import "../../css/chat.css";
import Conversations from "./conversation/Conversations";
import {useState} from "react";
import Friends from "./friend/Friends";
import Chat from "./chat/Chat";
import {useParams} from "react-router-dom";
import ChannelMembersList from "./channel/ChannelMembersList";

function isDef(obj: any): boolean {
    return obj !== null && obj !== undefined;
}

export default function SocialBody(){

    const {channelId} = useParams();
    const [state, setState]=useState(isDef(channelId) ? Number.parseInt(channelId) : null);
    return (
        <div className="chatbody bubble">
            <Conversations
                state={state}
                setState={setState}
            >
            </Conversations>
            <div className="vertical-separator"></div>
            {state ? (<Chat channel={state}></Chat>) : (<Friends></Friends>)}
            {
                isDef(state) &&
                <ChannelMembersList
                    channelId={state}
                    setChannelId={setState}
                />
            }
        </div>

    );
}