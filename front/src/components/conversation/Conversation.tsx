import Avatar from "../utils/Avatar";

interface Props {
  username: string;
  handleClick: any;
  state?: boolean;
  lastMessage?: string;
  id?: number;
  lastRead: null;
  avatar: string;
  hasPassword?: boolean; // add this
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
        {props.hasPassword && <span>🔒</span>}{" "}
        {/* Render lock icon if hasPassword is true */}
      </div>
    </div>
  );
}
