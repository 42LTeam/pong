import React from "react";
import {useContext, useState} from "react";

import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import NewMessagePopup from "./NewMessagePopup";
import {ApplicationContext} from "../../root/Auth";
import {getChannels} from "../../../api";

import "../../../css/social/chat.css";

export default function Conversations({ state, setState }){
    const [conversations, setConversations] = useState(null);
    const [popUpPosition, setPopUpPosition] = useState(null);

    const user = useContext(ApplicationContext)


    const handlePopUp = (event) => {
        setPopUpPosition({left: event.clientX, top: event.clientY, width: '420px'});
    }

    const fetchConversations = () => {
        getChannels()
            .then((response) => {
                setConversations(response.data);
            })
    };

    const clear = async (refresh) => {
        if (refresh)
            fetchConversations()
        setPopUpPosition(null);

    }

    if (!conversations && user) fetchConversations();


    return (
        <div className="conversations">
            <FriendButton style={{cursor: 'pointer'}} handleClick={() => setState(null)} state={state}></FriendButton>
            <div className="conversations-separator">
                <div className="conversations-separator-text">Messages privés</div>
                <img onClick={(event) => handlePopUp(event)} alt="plus logo" className="conversations-separator-icon" src="/svg/add.svg"/>
            </div>
                {popUpPosition ?
                    <NewMessagePopup key={"newMessagePopup"} position={popUpPosition} clear={clear}></NewMessagePopup>
                : null}

                { conversations ?
                    conversations.map((conversation) => {
                        return (
                            <Conversation
                                handleClick={() => setState(conversation)}
                                key={'conversation_id '+ conversation.id}
                                username={conversation.name}
                                message={conversation.password}
                                state={state === conversation}
                            />
                        )
                    }) : null
                }
        </div>
    )
}