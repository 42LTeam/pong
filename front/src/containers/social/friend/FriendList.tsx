
import Friend from "../../../components/friend/Friend";
import {useContext} from "react";
import {ApplicationContext} from "../../Auth";
import Approve from "../../../components/svg/Approve";
import Decline from "../../../components/svg/Decline";
import {acceptFriendship, declineFriendship} from "../../../api";

type Props = {
    friends: any,
    pending: boolean,
    reset: any
}
export default function FriendList({friends, pending, reset} : Props){
    const user = useContext(ApplicationContext)
    const handleAccept = function (current){
        acceptFriendship(current.friendShipId);
        reset();
    }



    const handleDecline = function (current){
        declineFriendship(current.friendShipId);
        reset();
    }


    return (<>
        {friends?.map((current) => {
            return (
              <Friend userId={user.id} key={current.username +'friendlist'} friend={current}>
                  {pending ?
                      <div className="align-left">
                          <Approve handleClick={() => handleAccept(current)}></Approve>
                          <Decline handleClick={() => handleDecline(current)}></Decline>
                      </div> : null}
              </Friend>
            );
        })}
    </>);
}