import Avatar from "../utils/Avatar";

interface Props {
  username: string;
  handleClick: any;
  state?: boolean;
  lastMessage?: string;
  id?: number;
  lastRead: null;
  avatar: string;
}

export default function Conversation(props: Props) {
  return (
    <div
      onClick={props.handleClick}
      className={"conversation " + (props.state ? "conversation-focus " : "")}
    >
      <Avatar url={props.avatar} height={"48px"}></Avatar>
      <div className="conversation-content">
        <div className="conversation-username">{props.username}</div>
        <h3>{props.lastMessage || "Nouvelle conversation"}</h3>
      </div>
    </div>
  );
}
