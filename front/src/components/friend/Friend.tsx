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
  getUserByID,
} from "../../api";
import { AuthContext, User } from "../../containers/Auth";

type Props = {
  channelId: number;
  children?: any;
  friend: User;
  isAdmin: boolean;
  onClick?: any;
  unremovable: boolean;
  isBanned: boolean;
};

export default function Friend(props: Props) {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [display, setDisplay] = useState(null);
  const buttons = [
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
  ];

  if (props.isAdmin) {
    buttons.push({
      text: "Kick",
      handleClick: () =>
        removeUserAdminFromChannel(props.channelId, props.friend.id),
    });
    buttons.push({
      text: "Mute",
      handleClick: () => muteUserFromChannel(props.channelId, props.friend.id),
    });
    buttons.push({
      text: "Ban/Unban",
      handleClick: () =>
        !props.isBanned
          ? banUserFromChannel(props.channelId, props.friend.id)
          : unbanUserFromChannel(props.channelId, props.friend.id),
    });
    buttons.push({ separator: true });
  }

  if (props.friend.id === user.id) {
    buttons.push({
      text: "Leave",
      handleClick: () =>
        removeUserFromChannel(props.channelId, props.friend.id),
    });
    buttons.push({ separator: true });
  }

  if (!props.unremovable) {
    buttons.push({
      text: "Retirer l'ami",
      handleClick: () => {
        removeFriendship(props.friend.id).then(() => setDisplay("none"));
      },
    });
  }

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
