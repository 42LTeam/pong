
import Friend from "../../../components/friend/Friend";
import {useContext} from "react";
import {ApplicationContext} from "../../Auth";
import Approve from "../../../components/svg/Approve";
import Decline from "../../../components/svg/Decline";
import axios from "axios";

type Props = {
    friends: any,
    pending: boolean,
    reset: any
}
export default function FriendList({friends, pending, reset} : Props){
    const user = useContext(ApplicationContext)
    const handleAccept = function (current){
        const config = {
            method: 'put',
            url: 'http://localhost:3000/friend/friend-request/accept/' + current.friendShipId,
            withCredentials: true,
        };
        axios(config)

        reset();
    }



    const handleDecline = function (current){
        const config = {
            method: 'put',
            url: 'http://localhost:3000/friend/friend-request/decline/' + current.friendShipId,
            withCredentials: true,
        };
        axios(config)
        reset();
    }


    return (<>
        {friends?.map((current) => {
            return (
              <Friend userId={user.id} key={current.username +'friendlist'} friend={current}>
                  {pending ?
                      <div className="approve-friend-buttons">
                          <Approve handleClick={() => handleAccept(current)}></Approve>
                          <Decline handleClick={() => handleDecline(current)}></Decline>
                      </div> : null}
              </Friend>
            );
        })}
    </>);
}