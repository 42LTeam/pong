
import Friend from "../../../components/chat/friend/Friend";

export default function Friendlist({friends}){

    return (<>
        {friends?.map((current) => {
            return (
              <Friend key={current.username +'friendlist'} username={current.username} status={current.status}></Friend>
            );
        })}
    </>);
}