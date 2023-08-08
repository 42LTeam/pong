import React from "react";
import {useContext} from "react";

import Friend from "../../../components/friend/Friend";
import {ApplicationContext} from "../../root/Auth";
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
    const handleAccept = async function (current){
        await acceptFriendship(current.friendShipId);
        reset();
    }



    const handleDecline = async function (current){
        await declineFriendship(current.friendShipId);
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