
interface Props {
    username: string,
    handleClick: any,
    state?: boolean,
    lastMessage?: string,
    id?: number,
    lastRead: null
}

export default function Conversation(props: Props){

    return (
        <div onClick={props.handleClick} className={"conversation " + (props.state ? 'conversation-focus ' : '')}
        >
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.username}</div>
                <h3>{props.lastMessage || 'Nouvelle conversation'}</h3>
            </div>
        </div>
    )
}