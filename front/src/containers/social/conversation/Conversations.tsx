import "../../../css/chat.css"
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import {useContext, useState} from "react";
import axios from "axios";
import {ApplicationContext} from "../../Auth";
import PopUp from "../../../components/utils/PopUp";
import TextInput from "../../../components/utils/TextInput";
import Button from "../../../components/utils/Button";

export default function Conversations({ state }){
    const [conversations, setConversations] = useState(null);
    const user = useContext(ApplicationContext)
    const [popUpPosition, setPopUpPosition] = useState(null);

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
                <PopUp position={popUpPosition} clear={() => setPopUpPosition(null)}>
                    <h1>Sélectionne des amis</h1>
                    <h2>Tu peux ajouter des amis.</h2>
                    <TextInput
                        text="Trouve taon ami.e tape sa on nom..."
                        bgColor="#2C3E50"
                    ></TextInput>
                    <Button handleClick={null} text="Creer un MP ou un channel" state={null}></Button>
                </PopUp> : null}
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