import "../../css/user.css"
import ChatButton from "../../components/chat/ChatButton";
import {useContext} from "react";
import {ApplicationContext} from "../Auth";


const UserBubble = () => {
    const user = useContext(ApplicationContext)
    return (
        <div className="user bubble">
            <div className="user-title">{user?.username}</div>
            <ChatButton />
            {user?.avatar && (
                <div
                    className="user-picture"
                    style={{ backgroundImage: `url(${user.avatar})` }}
                />
            )}
        </div>
    );
};

export default UserBubble;