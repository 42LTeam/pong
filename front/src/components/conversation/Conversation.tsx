import {useEffect, useState} from "react";
import {getChannelLastMessage} from "../../api";

interface Props {
    username: string,
    handleClick: any,
    state?: boolean,
    lastRead?: number,
    id?: number,
}

export default function Conversation(props: Props){

    const [message, setMessage] = useState(null);


    useEffect( () => {
        getChannelLastMessage(props.id).then(response => {
            const data = response.data;
            setMessage(data);
        });
    }, []);

    return (
        <div onClick={props.handleClick} className={"conversation " + (props.state ? 'conversation-focus ' : '')}
        >
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.username}</div>
                <div className="conversation-preview">{message?.content}</div>
            </div>
        </div>
    )
}