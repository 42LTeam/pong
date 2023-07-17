import "../css/user.css"
import ChatButton from "./ChatButton";

const  UserBubble= function({user}){

    return (
        <div className="user bubble">
            <div className="user-title">{user?.username}</div>
            <ChatButton></ChatButton>
            <img alt="user avatar" src={user?.avatar} className="user-picture"/>
        </div>
    )
}

export default UserBubble;