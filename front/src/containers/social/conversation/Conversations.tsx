import "../../../css/chat.css"
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Auth";
import {getChannels} from "../../../api";
import NewMessagePopup from "./NewMessagePopup";
import SidePanel from "../../../components/utils/SidePanel";
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


    useEffect(() => {
        fetchConversations();
    }, [application])


    return (
        <>
            <SidePanel
                header={<FriendButton style={{cursor: 'pointer'}} handleClick={() => setState(null)}
                                      state={state}></FriendButton>}
                subheader="Messages privés"
                subheaderIcon={<img onClick={(event) => handlePopUp(event)} alt="plus logo"
                                    className="conversations-separator-icon" src="/svg/add.svg"/>}
                body={
                    <>
                        {popUpPosition &&
                            <NewMessagePopup
                                key={"newMessagePopup"}
                                position={popUpPosition}
                                clear={clear}>
                            </NewMessagePopup>}
                        {
                            conversations.sort((a, b) => {
                                const a_value = a.lastMessage ? a.lastMessage.created_at : a.created_at;
                                const b_value = b.lastMessage ? b.lastMessage.created_at : b.created_at;
                                return a_value < b_value ? 1 : -1;
                            }).map((conversation) => {
                                return (
                                    <Conversation
                                        handleClick={() => setState(conversation.id)}
                                        key={'conversation_id '+ conversation.id}
                                        username={conversation.name}
                                        lastMessage={conversation.lastMessage?.content}
                                        state={state === conversation.id}
                                        lastRead={conversation.lastRead}
                                        id={conversation.id}
                                    />
                                )
                            })
                        }
                    </>
                }
            />
        </>
    )
}