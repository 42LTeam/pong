import "../css/chat.css"
import ConversationFriendButton from "../components/ConversationFriendButton";
import Conversation from "../components/Conversation";

export default function Conversations(){
    return (
        <div className="conversations">
            <ConversationFriendButton></ConversationFriendButton>
            <div className="conversations-separator">
                <div className="conversations-separator-text">Messages privés</div>
                <img alt="plus logo" src="/svg/add.svg"/>
            </div>
            <Conversation></Conversation>
        </div>
    );
}