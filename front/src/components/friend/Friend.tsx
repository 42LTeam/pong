import { Children, useContext, useState } from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import { useNavigate } from "react-router-dom";
import {
  getConversation,
  removeFriendship,
  getUserByID,
  removeUserFromChannel,
  muteUserFromChannel,
  banUserFromChannel,
  removeUserAdminFromChannel,
} from "../../api";
import React from "react";
import { AuthContext } from "../../containers/Auth";

type Props = {
  channelId: number;
  friend: any;
  onClick?: any;
  children?: any;
  unremovable?: boolean;
};

export default function Friend(props: Props) {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [display, setDisplay] = useState(null);
  const buttons = [
    {
      text: "Profile",
      handleClick: () => navigate("/profile/" + props.friend.id),
    },
    { separator: true },
  ];

  if (props.friend.id != user.id) {
    buttons.push({
      text: "Envoyer un message",
      handleClick: () =>
        getConversation(props.friend.id).then((response) =>
          navigate("/social/" + response.data.id),
        ),
    });
  }

  if (props.unremovable) {
    buttons.push({
      text: "Leave",
      handleClick: () =>
        removeUserFromChannel(props.channelId, props.friend.id).then(
          (response) => console.log("Click out"),
        ),
    });
    buttons.push({
      text: "Mute",
      handleClick: () =>
        muteUserFromChannel(props.channelId, props.friend.id).then((response) =>
          console.log("Mute"),
        ),
    });
    buttons.push({
      text: "Kick",
      handleClick: () =>
        removeUserAdminFromChannel(props.channelId, props.friend.id).then(
          (response) => console.log("Kick"),
        ),
    });
    buttons.push({
      text: "Ban",
      handleClick: () =>
        banUserFromChannel(props.channelId, props.friend.id).then((response) =>
          console.log("Ban"),
        ),
    });
  }
  if (!props.unremovable)
    buttons.push({
      text: "Retirer l'ami",
      handleClick: () => {
        removeFriendship(props.friend.id).then(() => setDisplay("none"));
      },
    });
  buttons.push({
    text: "Bloquer",
    handleClick: () => alert("TODO"),
  });

  const buttonProps = {
    buttonProps: {
      style: {
        background: "none",
        cursor: "pointer",
        textAlign: "left",
      },
    },
    fill: true,
    hoverProps: {
      background: "#2C3E50",
    },
  };

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
    <ContextMenu buttons={buttons} buttonProps={buttonProps}>
      <div
        onClick={props.onClick}
        className="friend"
        style={display ? { display: "none" } : null}
      >
        <Avatar width="48px" height="48px" url={props.friend?.avatar}></Avatar>

        <div className="conversation-content">
          <div className="conversation-username">{props.friend?.username}</div>
          <div className="conversation-preview">{props.friend?.status}</div>
        </div>
        {Children.map(props.children, (child) => (
          <>{child}</>
        ))}
      </div>
    </ContextMenu>
  );
}
