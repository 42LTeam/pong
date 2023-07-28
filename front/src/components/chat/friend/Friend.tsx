import Approve from "../../svg/Approve";
import Decline from "../../svg/Decline";
import axios from "axios";

type Props = {
    friend: any,
    onClick?: any,
    pending?: any,
    reset?: any,
    userId?: number,
}

export default function Friend(props: Props){
    const handleAccept = function (){
        const config = {
            method: 'put',
            url: 'http://localhost:3000/friend/friend-request/accept/' + props.friend.friendShipId,
            withCredentials: true,
        };
        axios(config)

        props.reset();
    }



    const handleDecline = function (){
        const config = {
            method: 'put',
            url: 'http://localhost:3000/friend/friend-request/decline/' + props.friend.friendShipId,
            withCredentials: true,
        };
        axios(config)

        props.reset();
    }


    return (
        <div onClick={() => {props.onClick ? props.onClick(props.friend) : null}} className="friend">
            <div className="conversation-avatar"></div>
            <div className="conversation-content">
                <div className="conversation-username">{props.friend?.username}</div>
                <div className="conversation-preview">{props.friend?.status}</div>
            </div>
            {props.pending ? <div className="approve-friend-buttons">
                <Approve handleClick={handleAccept}></Approve>
                <Decline handleClick={handleDecline}></Decline>
            </div> :
                null}
        </div>
    )
}