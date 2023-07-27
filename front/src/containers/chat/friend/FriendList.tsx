
import Friend from "../../../components/chat/friend/Friend";
import axios from "axios/index";

type Props = {
    friends: any,
    pending: boolean,

}
export default function FriendList({friends, pending} : Props){


    return (<>
        {friends?.map((current) => {
            return (
              <Friend pending={pending} key={current.username +'friendlist'} friend={current}></Friend>
            );
        })}
    </>);
}