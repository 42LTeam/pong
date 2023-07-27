
import Friend from "../../../components/chat/friend/Friend";

type Props = {
    user: any,
    friends: any,
    pending: boolean,
    reset: any
}
export default function FriendList({user, friends, pending, reset} : Props){


    return (<>
        {friends?.map((current) => {
            return (
              <Friend userId={user.id} reset={reset} pending={pending} key={current.username +'friendlist'} friend={current}></Friend>
            );
        })}
    </>);
}