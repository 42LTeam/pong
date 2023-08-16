import {useContext, useEffect, useState} from "react";
import {getChannelLastMessage} from "../../api";
import {ApplicationContext} from "../../containers/Application";

interface Props {
    username: string,
    handleClick: any,
    state?: boolean,
    lastRead?: number,
    id?: number,
}

export default function Conversation(props: Props){

    const [message, setMessage] = useState(null);
    const application = useContext(ApplicationContext);




    useEffect( () => {
        getChannelLastMessage(props.id).then(response => {
            const data = response.data;
            setMessage(data);
        });
    }, [application]);

    return (
        <div onClick={props.handleClick} className={"conversation " + (props.state ? 'conversation-focus ' : '')}
        >
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.username}</div>
                <h3>{message?.content || 'Nouvelle conversation'}</h3>
            </div>
        </div>
    )
}