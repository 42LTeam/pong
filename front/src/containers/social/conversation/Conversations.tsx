import "../../../css/chat.css"
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import {useContext, useState} from "react";
import {ApplicationContext} from "../../Auth";
import {getFriendOfUser} from "../../../api";
import NewMessagePopup from "./NewMessagePopup";

export default function Conversations({ state }){
    const [conversations, setConversations] = useState(null);
    const user = useContext(ApplicationContext)
    const [popUpPosition, setPopUpPosition] = useState(null);

    if (!conversations && user) {
        getFriendOfUser(user.id)
            .then((response) => {
                setConversations(response.data);
            })
    }

    const handlePopUp = (event) => {
        setPopUpPosition({left: event.clientX, top: event.clientY});
    }

    return (
        <div className="conversations">
            <FriendButton state={state}></FriendButton>
            <div className="conversations-separator">
                <div className="conversations-separator-text">Messages privés</div>
                <img onClick={(event) => handlePopUp(event)} alt="plus logo" className="conversations-separator-icon" src="/svg/add.svg"/>
            </div>
                {popUpPosition ?
                    <NewMessagePopup position={popUpPosition} clear={() => setPopUpPosition(null)}></NewMessagePopup>
                : null}
                { conversations ?
                    conversations.map((conversation) => {
                        return (
                            <Conversation key={'conversation_id '+ conversation.id}
                                          username={conversation.username} message={conversation.message} />
                        )
                    }) : null
                }
        </div>
    )
}