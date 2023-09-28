import Avatar from "../utils/Avatar";
import { useContext } from "react";
import { AuthContext } from "../../containers/Auth";
import React from "react";

export type MessageProps = {
  senderId: any;
  senderAvatar: any;
  content: string;
  date: string;
  sent: boolean;
};



export default function Message(props: MessageProps) {
  const user = useContext(AuthContext);

  const rootClassName =
    "chat-message" + (props.sent ? " chat-message-sent" : "");
  const bubbleClassName =
    "chat-message-bubble" + (props.sent ? " chat-message-bubble-sent" : "");

  // console.log("user blocklist = "+ user.blockList);
  // console.log("message=["+props.content+"] sent by = "+ JSON.stringify(props.sender));
  
    return (
    <div
      className={rootClassName}
      style={{
        filter: user.blockList.includes(props.senderId) ? "blur(5px)" : "",
      }}
    >
      <Avatar height="30px" width="30px" url={props.senderAvatar}></Avatar>
      <div className={bubbleClassName}>
        {user.blockList.includes(props.senderId)
          ? "NE ME LIS PAS SALE *****"
          : props.content}
      </div>
      <div className="chat-message-time">{props.date}</div>
    </div>
  );
}
