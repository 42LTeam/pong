
import Friend from "../../../components/chat/friend/Friend";
import {useContext} from "react";
import {ApplicationContext} from "../../Auth";

type Props = {
    friends: any,
    pending: boolean,
    reset: any
}
export default function FriendList({friends, pending, reset} : Props){
    const user = useContext(ApplicationContext)


    return (<>
        {friends?.map((current) => {
            return (
              <Friend userId={user.id} reset={reset} pending={pending} key={current.username +'friendlist'} friend={current}></Friend>
            );
        })}
    </>);
}