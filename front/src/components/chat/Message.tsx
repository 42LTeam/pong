import Avatar from "../utils/Avatar";
import {useContext} from "react";
import {AuthContext} from "../../containers/Auth";

export type MessageProps = {
    sender: any,
    content: string,
    date: string,
    sent: boolean,
}

export default function Message (props: MessageProps){

    const user = useContext(AuthContext);

    const rootClassName = "chat-message" + (props.sent ? " chat-message-sent" : "");
    const bubbleClassName = "chat-message-bubble" + (props.sent ? " chat-message-bubble-sent" : "");

    return (
        <div className={rootClassName} style={{filter: (user.blockList.includes(props.sender.id) ? 'blur(5px)' : '')}}>
            <Avatar height="30px" width="30px" url={props.sender.username}></Avatar>
            <div className={bubbleClassName}>{props.content}</div>
            <div className="chat-message-time">{props.date}</div>
        </div>
    )
}