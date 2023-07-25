
type Props = {
    friend: any,
    onClick: any,
}

export default function Friend(props: Props){
    const {username, status} = props.friend;
    return (
        <div onClick={() => {props.onClick(props.friend)}} className="friend">
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{username}</div>
                <div className="conversation-preview">{status}</div>
            </div>
        </div>
    )
}