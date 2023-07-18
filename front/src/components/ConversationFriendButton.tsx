import "../css/chat.css"

export default function ConversationFriendButton(focused){
    return (
        <div className={"conversations-friend-button " + focused}>
            <img style={{ minWidth: '35px'}} alt="friend  logo" src="/svg/friend.svg"/>
            <div  className="conversations-friend-button-text">Amis</div>
        </div>
    )
}