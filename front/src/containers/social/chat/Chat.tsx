import TextInput from "../../../components/utils/TextInput";
import {useContext, useEffect,  useRef, useState} from "react";
import Message from "../../../components/chat/Message";
import {AuthContext} from "../../Auth";
import "../../../css/chatBody.css"
import Send from "../../../components/svg/Send";
import {getChannelMessages, readMessage, sendMessageToChannel} from "../../../api";
import {ApplicationContext} from "../../Application";

interface ChatProps {
    channel: any,
}

export default function Chat (props:ChatProps){
    const [messages, setMessages] = useState([]);
    const [channel, setChannel] = useState<number | null>(props.channel);
    const [lastRead, setLastRead] = useState(0);
    const user = useContext(AuthContext);
    const application = useContext(ApplicationContext);
    const ref = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getChannelMessages(props.channel);
            const data = response.data;
            setLastRead(data.lastRead);
            setMessages([...data.messages].reverse());
        }
        fetchData().catch(console.error);
    }, [channel]);
    const toAdd = application.social.newMessages.filter(current => current.channelId == channel && messages.map(c => c.id).includes(current.id) == false);
    if (toAdd.length) {
        setMessages([...toAdd, ...messages]);
        readMessage(props.channel, toAdd[toAdd.length - 1].id)
    }

    if (props.channel != channel)
        setChannel(props.channel);
    const handleSendMessage = async (event) => {
        if (!ref || !ref.current.value) return;
        if (event.key != null && event.key != 'Enter') return;
        await sendMessageToChannel(channel, ref.current.value);
        ref.current.value = null;
    }

    return (
        <div className="chat-root">
            {(JSON.stringify(lastRead || ''))}
            <div className="chat-messages">
                {messages.filter((value, index, array) => array.indexOf(value) === index).map((current) => {
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