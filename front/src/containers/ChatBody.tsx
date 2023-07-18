import "../css/chat.css";
import Conversations from "./Conversations";

export default function ChatBody(){
    return (
        <div className="chatbody bubble">
            <Conversations></Conversations>
            <div className="vertical-separator"></div>
            <div className='chatbody-right'></div>
        </div>
    )
}