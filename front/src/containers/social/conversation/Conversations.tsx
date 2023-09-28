import "../../../css/chat.css";
import FriendButton from "../../../components/friend/FriendButton";
import Conversation from "../../../components/conversation/Conversation";
import React, { useContext, useEffect, useState } from "react";
import { getChannels, removeUserFromChannel } from "../../../api";
import NewMessagePopup from "./NewMessagePopup";
import SidePanel from "../../../components/utils/SidePanel";
import { ApplicationContext } from "../../Application";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Auth";
import ContextMenu from "../../../components/utils/ContextMenu";
import EditChannelPopOver from "./EditChannelPopOver";

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
  const params = useParams();

  const [editChannel, setEditChannel] = useState(null);
  const [rerenderFlag, setRerenderFlag] = useState(false);

  const handlePopUp = (event) => {
    setPopUpPosition({
      left: event.clientX,
      top: event.clientY,
      // width: "420px",
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
    setRerenderFlag(true);
  }, [application, rerenderFlag]);

  const setState = (state) => {
    navigate("/social/" + (state || ""));
  };

  const handleLeave = (conversationId) => {
    removeUserFromChannel(conversationId, user.id);
    setRerenderFlag(false);
    if (conversationId == params.channelId) {
      navigate("/social");
      console.log("params = "+JSON.stringify(params));
    }
  }

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
        subheader="Créer un Salon"
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
              .map((conversation, i) => {
                return (
                  <ContextMenu
                      key={i}
                    buttons={[...(conversation.isAdmin ? [{
                      text: "Modifier le channel",
                      handleClick: () => setEditChannel(conversation),
                    },
                      {separator: true}] : []),
                      {
                        text: "Quitter",
                        handleClick: () =>
                        handleLeave(conversation.id),
                      },
                    ]}
                  >
                    <Conversation
                      handleClick={() => setState(conversation.id)}
                      key={"conversation_id " + conversation.id}
                      avatar={conversation.users[0]?.user.avatar}
                      isPrivateMessage={conversation.conv}
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
                  </ContextMenu>
                );
              })}
          </>
        }
      />
      {editChannel ? <EditChannelPopOver channel={editChannel} checked={null} clear={(bool) => {
        setEditChannel(null);
        clear(bool);
      }}></EditChannelPopOver> : null}
    </>
  );
}
