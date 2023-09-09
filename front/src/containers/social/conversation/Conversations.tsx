import "../../../css/chat.css";
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import React, { useContext, useEffect, useState } from "react";
import { getChannels } from "../../../api";
import NewMessagePopup from "./NewMessagePopup";
import SidePanel from "../../../components/utils/SidePanel";
import { ApplicationContext } from "../../Application";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth";

type Props = {
  state: any;
};

export default function Conversations({ state }: Props) {
  const [conversations, setConversations] = useState([]);
  const [popUpPosition, setPopUpPosition] = useState<{
    left: number;
    top: number;
  }>(null);
  const application = useContext(ApplicationContext);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePopUp = (event) => {
    setPopUpPosition({
      left: event.clientX,
      top: event.clientY,
      width: "420px",
    });
  };

  const fetchConversations = () => {
    getChannels().then((response) => {
      setConversations(response.data);
    });
  };

  const clear = async (refresh) => {
    if (refresh) fetchConversations();
    setPopUpPosition(null);
  };

  useEffect(() => {
    fetchConversations();
  }, [application]);

  const setState = (state) => {
    navigate("/social/" + (state || ""));
  };

  return (
    <>
      <SidePanel
        header={
          <FriendButton
            style={{ cursor: "pointer" }}
            handleClick={() => setState(null)}
            state={state}
          ></FriendButton>
        }
        subheader="Messages privés"
        subheaderIcon={
          <img
            onClick={(event) => handlePopUp(event)}
            alt="plus logo"
            className="conversations-separator-icon"
            src="/svg/add.svg"
          />
        }
        body={
          <>
            {popUpPosition && (
              <NewMessagePopup
                key={"newMessagePopup"}
                position={popUpPosition}
                clear={clear}
              ></NewMessagePopup>
            )}
            {conversations
              .filter(
                (c) => !c.conv || !user.blockList.includes(c.users[0]?.user.id)
              )
              .sort((a, b) => {
                const a_value = a.lastMessage
                  ? a.lastMessage.created_at
                  : a.created_at;
                const b_value = b.lastMessage
                  ? b.lastMessage.created_at
                  : b.created_at;
                return a_value < b_value ? 1 : -1;
              })
              .map((conversation) => {
                // console.log(conversation);
                return (
                  <Conversation
                    handleClick={() => setState(conversation.id)}
                    key={"conversation_id " + conversation.id}
                    avatar={conversation.users[0]?.user.avatar}
                    username={
                      conversation.conv
                        ? conversation.users[0]?.user.username
                        : conversation.name
                    }
                    lastMessage={conversation.lastMessage?.content}
                    state={state === conversation.id}
                    lastRead={conversation.lastRead}
                    id={conversation.id}
                  />
                );
              })}
          </>
        }
      />
    </>
  );
}
