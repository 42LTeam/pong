import "../css/chat.css"
import FriendButton from "../components/FriendButton";
import Conversation from "../components/Conversation";

export default function Conversations({state}){
    return (
        <div className="conversations">
            <FriendButton state={state}></FriendButton>
            <div className="conversations-separator">
                <div className="conversations-separator-text">Messages privés</div>
                <img alt="plus logo" src="/svg/add.svg"/>
            </div>
            <Conversation></Conversation>
        </div>
    );
}