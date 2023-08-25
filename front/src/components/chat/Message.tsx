import Avatar from "../utils/Avatar";

export type MessageProps = {
  sender: any;
  content: string;
  date: string;
  sent: boolean;
};

export default function Message(props: MessageProps) {
  const rootClassName =
    "chat-message" + (props.sent ? " chat-message-sent" : "");
  const bubbleClassName =
    "chat-message-bubble" + (props.sent ? " chat-message-bubble-sent" : "");

  return (
    <div className={rootClassName}>
      <Avatar height="30px" width="30px" url={props.sender}></Avatar>
      <div className={bubbleClassName}>{props.content}</div>
      <div className="chat-message-time">{props.date}</div>
    </div>
  );
}
