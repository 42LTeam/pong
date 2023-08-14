import "../../../css/chat.css"
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import {useContext, useState} from "react";
import {AuthContext} from "../../Auth";
import {getChannels} from "../../../api";
import NewMessagePopup from "./NewMessagePopup";
import {ApplicationContext} from "../../Application";

type Props = {
    state: any,
    setState: any,
}

export default function Conversations({ state, setState }: Props){
    const [conversations, setConversations] = useState([]);
    const [popUpPosition, setPopUpPosition] = useState(null);
    const application = useContext(ApplicationContext);
    const user = useContext(AuthContext)


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

    if (conversations.length == 0 && user) fetchConversations();

    const toAdd = application.social.newConversations.filter(current => {
        return !conversations.map(c => c.id).includes(current)
    })
    if (toAdd.length){
        fetchConversations();
    }

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

                {
                    conversations.map((conversation) => {
                        return (
                            <Conversation
                                handleClick={() => setState(conversation.id)}
                                key={'conversation_id '+ conversation.id}
                                username={conversation.name}
                                state={state === conversation.id}
                                lastRead={conversation.lastRead}
                                id={conversation.id}
                            />
                        )
                    })
                }
        </div>
    )
}