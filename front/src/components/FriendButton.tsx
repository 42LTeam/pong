import "../css/friend.css"

export default function FriendButton({state}){
    return (
        <div className={"friend-button " + (state ? '' : 'friend-button-focused ')}>
            <img style={{ minWidth: '35px'}} alt="friend  logo" src="/svg/friend.svg"/>
            <div  className="friend-button-text">Amis</div>
        </div>
    )
}