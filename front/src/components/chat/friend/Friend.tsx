import Approve from "../../svg/Approve";
import Decline from "../../svg/Decline";

type Props = {
    friend: any,
    onClick?: any,
    pending?: any,
}

export default function Friend(props: Props){
    const {id, username, status} = props.friend;


    return (
        <div onClick={() => {props.onClick ? props.onClick(props.friend) : null}} className="friend">
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{username}</div>
                <div className="conversation-preview">{status}</div>
            </div>
            {props.pending ? <div className="approve-friend-buttons">
                <Approve></Approve>
                <Decline></Decline>
            </div> :
                null}
        </div>
    )
}