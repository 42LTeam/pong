import Avatar from "../utils/Avatar";
import React from "react";

interface Props {
  username: string,
  handleClick: any,
  state?: boolean,
  lastMessage?: string,
  id?: any,
  lastRead: null,
  avatar: string,
  hasPassword?: boolean,
  isPrivateMessage?: boolean
}

export default function Conversation(props: Props) {
  return (
    <div
      onClick={props.handleClick}
      className={"conversation " + (props.state ? "conversation-focus " : "")}
    >
      <Avatar url={props.avatar} salon={props.isPrivateMessage} id={props.id} height={"48px"}></Avatar>
      <div className="conversation-content">
        <div className="conversation-username">{props.isPrivateMessage && <span>💬</span>} {!props.isPrivateMessage && <span>👥 </span>}{props.username}</div>
        <h3>{props.lastMessage || "Nouvelle conversation"}</h3>
        {props.hasPassword && <span>🔒</span>}{" "}
        {/* Render lock icon if hasPassword is true */}
      </div>
    </div>
  );
}
