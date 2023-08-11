
interface Props {
    username: string,
    message : string,
    handleClick: any,
    state?: boolean,
}

export default function Conversation(props: Props){

    return (
        <div onClick={props.handleClick} className={"conversation " + (props.state ? 'conversation-focus ' : '')}
        >
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.username}</div>
                <div className="conversation-preview">{props.message}</div>
            </div>
        </div>
    )
}