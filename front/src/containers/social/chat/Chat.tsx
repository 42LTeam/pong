import TextInput from "../../../components/utils/TextInput";
import {useContext, useState} from "react";
import Message from "../../../components/chat/Message";
import {ApplicationContext} from "../../Auth";
import "../../../css/chatBody.css"
import Send from "../../../components/svg/Send";
export default function Chat ({}){
    const [messages, setMessages] = useState([]);
    const user = useContext(ApplicationContext);
    const addMessage = (message) => {
        setMessages([...messages, message])
    }

    if (!messages.length)
        setMessages([{
            id: 0,
            content: 'test',
            created_at: '12:12',
            user: {
                avatar: 'url("https://cdn.intra.42.fr/users/d059badf1d05f4365aa5a664419b6dc1/shalimi.jpg")',
                id: 117217
            }
        },
            {
                id: 0,
                content: 'ok alors ceci est un test je dois ecrire enormement de texte pour que le truc doivent se replier sur lui meme je me demande si ca va marcher du premier coup ou si le message sera super long. c est marrant d avoir a ce demander ca quand meme',
                created_at: '12:12',
                user: {
                    avatar: 'url("https://cdn.intra.42.fr/users/d059badf1d05f4365aa5a664419b6dc1/shalimi.jpg")',
                    id: 2
                }
            }

        ])

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
            <TextInput color="#7F8C8D" text="Votre message..." bgColor="#ECF0F1" button={<Send handleClick={() => addMessage({
                id: 0,
                content: 'test',
                created_at: '12:12',
                user: {
                    avatar: 'url("https://cdn.intra.42.fr/users/d059badf1d05f4365aa5a664419b6dc1/shalimi.jpg")',
                    id: 117217
                }
            })}></Send>}></TextInput>
        </div>
    )
}