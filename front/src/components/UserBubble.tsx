import "../css/user.css"
import ChatButton from "./ChatButton";


const UserBubble = ({ user }) => {
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