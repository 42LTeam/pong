import TextInput from "../../../components/utils/TextInput";
import {useContext, useState} from "react";
import Message, {MessageProps} from "../../../components/chat/Message";
import {ApplicationContext} from "../../Auth";
import "../../../css/chatBody.css"
import Send from "../../../components/svg/Send";
export default function Chat ({}){
    const [messages, setMessages] = useState([]);
    const user = useContext(ApplicationContext);
    const addMessage = (message) => {
        setMessages([...messages, message])
    }

    return (
        <div className="chat-root">
            <div className="chat-messages">
                {messages.map(current => (<Message
                    key={current.id+'message'}
                    content={current.content}
                    date={current.created_at}
                    sender={current.user.avatar}
                    sent={current.user.id == user.id}
                ></Message>))}
            </div>
            <TextInput text="Votre message..." bgColor="#ECF0F1" button={<Send></Send>}></TextInput>
        </div>
    )
}