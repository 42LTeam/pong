import "../../../css/chat.css"
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import {useContext, useState} from "react";
import {AuthContext} from "../../Auth";
import {getChannels} from "../../../api";
import NewMessagePopup from "./NewMessagePopup";
import SidePanel from "../../../components/utils/SidePanel";

type Props = {
    state: any,
    setState: any,
}

export default function Conversations({ state, setState }: Props){
    const [conversations, setConversations] = useState(null);
    const [popUpPosition, setPopUpPosition] = useState(null);

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

    if (!conversations && user) fetchConversations();


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
                    {conversations?.map((conversation) => (
                        <Conversation
                            handleClick={() => setState(conversation.id)}
                            key={'conversation_id ' + conversation.id}
                            username={conversation.name}
                            message={conversation.password}
                            state={state === conversation.id}
                        />
                    ))}
                </>
            }
            />

        </>



)
}