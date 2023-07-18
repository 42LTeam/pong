
type Props = {
    username: string,
    victoires : number,
    defaites : number
}

export default function Friend(props: Props){
    return (
        <div className="friend">
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.username}</div>
                <div className="conversation-preview"> {props.victoires} victoires / {props.defaites} défaites </div>
            </div>
        </div>
    )
}