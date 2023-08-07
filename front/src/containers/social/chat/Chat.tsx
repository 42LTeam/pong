import TextInput from "../../../components/utils/TextInput";
import {useContext, useEffect, useState} from "react";
import Message from "../../../components/chat/Message";
import {ApplicationContext} from "../../Auth";
import "../../../css/chatBody.css"
import Send from "../../../components/svg/Send";
import {getChannelMessages, sendMessageToChannel} from "../../../api";

interface ChatProps {
    channel: any,
}

export default function Chat (props:ChatProps){
    const [messages, setMessages] = useState([]);
    const user = useContext(ApplicationContext);

    const addMessage = (message) => {
        setMessages([...messages, message])
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getChannelMessages(props.channel.id);
            const data = response.data;

            setMessages([...messages, ...data]);
        }
        fetchData().catch(console.error);
    }, []);


    const handleSendMessage = async () => {
        const response = await sendMessageToChannel(props.channel.id, 'rien');
        addMessage(response.data);
    }

    return (
        <div className="chat-root">
            <div className="chat-messages">
                {messages.map((current) => {
                    return (
                        <Message
                            key={current.id}
                            sender={current.user.avatar}
                            content={current.content}
                            date={new Date(current.created_at).toTimeString().slice(0,5)}
                            sent={current.userId == user.id}></Message>
                    )
                })}
            </div>
            <TextInput color="#7F8C8D" text="Votre message..." bgColor="#ECF0F1" button={<Send handleClick={handleSendMessage}></Send>}></TextInput>
        </div>
    )
}