
import Friend from "../../../components/friend/Friend";
import Approve from "../../../components/svg/Approve";
import Decline from "../../../components/svg/Decline";
import {acceptFriendship, declineFriendship} from "../../../api";

type Props = {
    friends: any,
    pending: boolean,
    reset: any,
    blocked: boolean
}
export default function FriendList({friends, pending, reset, blocked} : Props){
    const handleAccept = async (current) => {
        await acceptFriendship(current.friendShipId);
        reset();
    }



    const handleDecline = async (current) => {
        await declineFriendship(current.friendShipId);
        reset();
    }


    return (<>
        {friends?.map((current) => {
            return (
              <Friend key={current.username +'friendlist'} friend={current} blocked={blocked} onClick={pending ? () => {} : null}>
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