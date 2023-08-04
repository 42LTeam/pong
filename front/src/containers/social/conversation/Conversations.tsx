import "../../../css/chat.css"
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import {useContext, useState} from "react";
import {ApplicationContext} from "../../Auth";
import {getChannels} from "../../../api";
import NewMessagePopup from "./NewMessagePopup";

export default function Conversations({ state }){
    const [conversations, setConversations] = useState(null);
    const [popUpPosition, setPopUpPosition] = useState(null);

    const user = useContext(ApplicationContext)

    if (!conversations && user) {
        getChannels()
            .then((response) => {
                setConversations(response.data);
            })
    }

    const handlePopUp = (event) => {
        setPopUpPosition({left: event.clientX, top: event.clientY, width: '420px'});
    }

    return (
        <div className="conversations">
            <FriendButton state={state}></FriendButton>
            <div className="conversations-separator">
                <div className="conversations-separator-text">Messages privés</div>
                <img onClick={(event) => handlePopUp(event)} alt="plus logo" className="conversations-separator-icon" src="/svg/add.svg"/>
            </div>
                {popUpPosition ?
                    <NewMessagePopup key={"newMessagePopup"} position={popUpPosition} clear={() => setPopUpPosition(null)}></NewMessagePopup>
                : null}

                { conversations ?
                    conversations.map((conversation) => {
                        return (
                            <Conversation key={'conversation_id '+ conversation.id}
                                          username={conversation.name} message={conversation.password} />
                        )
                    }) : null
                }
        </div>
    )
}