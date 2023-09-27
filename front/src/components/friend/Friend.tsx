import React, { Children, useContext, useEffect, useState } from "react";
import Avatar from "../utils/Avatar";
import ContextMenu from "../utils/ContextMenu";
import { useNavigate } from "react-router-dom";
import {
  getConversation,
  removeFriendship,
  getUserByID,
  unblockUser, blockUser,
} from "../../api";
import { AuthContext, User } from "../../containers/Auth";

type Props = {
  children?: any;
  friend: User;
  isAdmin: boolean;
  onClick?: any;
  isBanned: boolean;
  contextMenu?: any[];
};

export default function Friend(props: Props) {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [display, setDisplay] = useState(null);
  const [blocked, setBlocked] = useState(user.blockList.includes(props.friend.id));
  const isFriend = user.friendList.includes(props.friend.id);
  const [rerenderFlag, setRerenderFlag] = useState(false);

  useEffect(() => {
    setBlocked(user.blockList.includes(props.friend.id));
    setRerenderFlag(true);
  }, [rerenderFlag]);

  const handleUnblockUser = (userId) => {
    unblockUser(userId)
      .then(() => {
        setRerenderFlag(false);
      })
      .catch((err) => console.log(err));
      user.blockList.splice(user.blockList.indexOf(props.friend?.id), 1);
  };

  const handleBlockUser = (userId) => {
    blockUser(props.friend.id)
    .then(() => {
      user.blockList.push(props.friend.id);
      setRerenderFlag(false);
    });
  }

  const buttons =
    props.friend.id == user.id
      ? [
          {
            text: "Profile",
            handleClick: () => navigate("/profile/" + props.friend.id),
          },
        ]
      : [
          // ---------- Basic options
          {
            text: "Profile",
            handleClick: () => navigate("/profile/" + props.friend.id),
          },
        ...(blocked ? [] : [{
            text: "Envoyer un message",
            handleClick: () =>
              getConversation(props.friend.id).then((response) =>
                navigate("/social/" + response.data.id)
              ),
          }]),
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
          ...(props.contextMenu || []),
        ];

  if (blocked) {
    buttons.push({
      text: "Debloquer",
      handleClick: () => {
        // unblockUser(props.friend?.id);
        // user.blockList.splice(user.blockList.indexOf(props.friend?.id), 1);
        // setDisplay("none");
        handleUnblockUser(props.friend?.id);
      },
    });
  } else if (props.friend.id != user.id) {
    buttons.push({
      text: "Bloquer",
      handleClick: () => {
        handleBlockUser(props.friend?.id);
        // blockUser(props.friend.id).then(() => user.blockList.push(props.friend.id));
      },
    });
  }
  if (isFriend) {
    buttons.push({
      text: "Retirer l'ami",
      handleClick: () => {
        removeFriendship(props.friend.id).then(() => setDisplay("none"));
      },
    });
  }

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

  return (
    <ContextMenu buttons={buttons} buttonProps={buttonProps}>
      <div
        onClick={props.onClick}
        className="friend"
        style={display ? { display: "none" } : null}
      >
        <Avatar width="48px" height="48px" url={!blocked ? props.friend?.avatar: null}></Avatar>

        <div className="conversation-content">
          {!props.isBanned ? (
            <div className="conversation-username">
              {!blocked ? props.friend?.username: "💔 Blocked"}
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
