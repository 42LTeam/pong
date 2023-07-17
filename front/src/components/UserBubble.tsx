import "../css/user.css"
import ChatButton from "./ChatButton";
export default function UserBubble(props){
    return (
        <div className="user bubble">
            <div className="user-title">{props.username || "NOM"}</div>
            <ChatButton></ChatButton>
            <img alt="user's avatar" className="user-picture"/>
        </div>
    )
}