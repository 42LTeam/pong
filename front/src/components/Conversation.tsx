
type Props = {
    username: string,
    message : string,
}

export default function Conversation(props: Props){
    return (
        <div className="conversation">
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.username}</div>
                <div className="conversation-preview">{props.message}</div>
            </div>
        </div>
    )
}