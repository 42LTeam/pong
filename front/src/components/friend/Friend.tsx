import React, { Children, useContext, useState } from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import { useNavigate } from "react-router-dom";
import {
  getConversation,
  removeFriendship,
  removeUserFromChannel,
  muteUserFromChannel,
  banUserFromChannel,
  removeUserAdminFromChannel,
  unbanUserFromChannel,
  getUserByID, unblockUser,
} from "../../api";
import { AuthContext, User } from "../../containers/Auth";

type Props = {
  channelId: number;
  children?: any;
  friend: User;
  isAdmin: boolean;
  onClick?: any;
  isBanned: boolean;
  contextMenu?: any[],
};

export default function Friend(props: Props) {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [display, setDisplay] = useState(null);
  const blocked = user.blockList.includes(props.friend.id);
  const isFriend = user.friendList.includes(props.friend.id);
  const buttons = props.friend.id == user.id ? [ {
    text: "Profile",
    handleClick: () => navigate("/profile/" + props.friend.id),
  }] : [
    // ---------- Basic options
    {
      text: "Profile",
      handleClick: () => navigate("/profile/" + props.friend.id),
    },
    {
      text: "Envoyer un message",
      handleClick: () =>
        getConversation(props.friend.id).then((response) =>
          navigate("/social/" + response.data.id)
        ),
    },
    { separator: true },
    {
      text: "Match standard",
      handleClick: () =>
        getUserByID(props.friend.id).then((response) =>
          navigate(
            "/game?id=" +
              props.friend.id +
              "&username=" +
              response.data.username +
              "&session=" +
              response.data.session +
              "&custom=false"
          )
        ),
    },
    {
      text: "Match custom",
      handleClick: () =>
        getUserByID(props.friend.id).then((response) =>
          navigate(
            "/game?id=" +
              props.friend.id +
              "&username=" +
              response.data.username +
              "&session=" +
              response.data.session +
              "&custom=true"
          )
        ),
    },
    { separator: true },
  ...(props.contextMenu || [])
  ];



  if (blocked) {
    buttons.push({
      text: 'Debloquer',
      handleClick: () => {
        unblockUser(props.friend?.id);
        user.blockList.splice(user.blockList.indexOf(props.friend?.id), 1);
        setDisplay('none');
      }
    });
  }else if (props.friend.id != user.id){
    buttons.push({
      text: "Bloquer",
      handleClick: () => alert("TODO"),
    });
  }
  if (isFriend) {
    buttons.push({
      text: 'Retirer l\'ami',
      handleClick: () => {
        removeFriendship(props.friend.id).then(() => setDisplay('none'));
      },
    })

  }




  const navigateToConversation = async (friend) => {
    try {
      const response = await getConversation(friend.id);
      navigate("/social/" + response.data.id);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error(`Error: ${error.response.data.message}`);
      } else {
        console.error("Error while fetching conversation.");
      }
    }
  };

  return (
    <ContextMenu buttons={buttons}>
      <div
        onClick={props.onClick}
        className="friend"
        style={display ? { display: "none" } : null}
      >
        <Avatar width="48px" height="48px" url={props.friend?.avatar}></Avatar>

        <div className="conversation-content">
          {!props.isBanned ? (
            <div className="conversation-username">
              {props.friend?.username}
            </div>
          ) : (
            <div className="conversation-username-ban">
              {props.friend?.username}
            </div>
          )}

          <div className="conversation-preview">{props.friend?.status}</div>
        </div>
        {Children.map(props.children, (child) => (
          <>{child}</>
        ))}
      </div>
    </ContextMenu>
  );
}
