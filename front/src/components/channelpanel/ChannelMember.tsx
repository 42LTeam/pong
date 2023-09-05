type Props = {
  username: string;
  status: string;
  avatar: string;
  onClick?: () => void;
};

export default function ChannelMember(props: Props) {
  return (
    <div onClick={props.onClick} className={"conversation "}>
      <div className="conversation-avatar">{props.avatar}</div>
      <div className="conversation-content">
        <div className="conversation-username">{props.username}</div>
        <div className="conversation-preview">{props.status}</div>
      </div>
    </div>
  );
}
