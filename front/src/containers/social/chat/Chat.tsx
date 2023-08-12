import TextInput from "../../../components/utils/TextInput";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import Message from "../../../components/chat/Message";
import {AuthContext} from "../../Auth";
import "../../../css/chatBody.css"
import Send from "../../../components/svg/Send";
import {getChannelMessages, sendMessageToChannel, socket} from "../../../api";
import {ApplicationContext} from "../../Application";

interface ChatProps {
    channel: any,
}

export default function Chat (props:ChatProps){
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState(props.channel);
    const user = useContext(AuthContext);
    const application = useContext(ApplicationContext);
    const ref = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getChannelMessages(props.channel.id);
            const data = response.data;

            setMessages([...data].reverse());
        }
        fetchData().catch(console.error);
    }, [channel]);

    const onNewMessage = (args) => {
        if (args.id != channel.id) return;
        setMessages([JSON.parse(args.message), ...messages])
    }
    const toAdd = application.social.newMessages.filter(current => current.channelId == channel.id && messages.includes(current) == false);
    if (toAdd.length){
        setMessages([...toAdd, ...messages]);
    }

    if (props.channel != channel)
        setChannel(props.channel);
    const handleSendMessage = async (event) => {
        if (!ref || !ref.current.value) return;
        if (event.key != null && event.key != 'Enter') return;
        await sendMessageToChannel(props.channel.id, ref.current.value);
        ref.current.value = null;
    }

    return (
        <div className="chat-root">
            <div className="chat-messages">
                {messages.map((current) => {
                    return (
                        <Message
                            key={current.id}
                            sender={current.user?.avatar}
                            content={current.content}
                            date={new Date(current.created_at).toTimeString().slice(0,5)}
                            sent={current.userId == user.id}></Message>
                    )
                })}
            </div>
            <TextInput ref={ref} color="#7F8C8D" text="Votre message..." bgColor="#ECF0F1" onKeyDown={handleSendMessage} button={<Send handleClick={handleSendMessage}></Send>}></TextInput>
        </div>
    )
}