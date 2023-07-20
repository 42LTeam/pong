import "../../../css/chat.css"
import FriendButton from "../../../components/chat/friend/FriendButton";
import Conversation from "../../../components/chat/conversation/Conversation";
import {useState} from "react";
import axios from "axios";

export default function Conversations({ state, user }){
    const [conversations, setConversations] = useState(null);


    if (!conversations && user) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/users/friend/' + user?.id,
            withCredentials: true,
        };
        axios.request(config)
            .then((response) => {
                setConversations(response.data);
            })
    }
    return (
        <div className="conversations">
            <FriendButton state={state}></FriendButton>
            <div className="conversations-separator">
                <div className="conversations-separator-text">Messages privés</div>
                <img alt="plus logo" src="/svg/add.svg"/></div>
            <div className="conversations-separator">
                <div className="conversations-separator-text">Channels</div>
                <img alt="plus logo" src="/svg/add.svg"/>
            </div>
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