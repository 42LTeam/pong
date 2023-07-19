import "../css/friend.css"
import FriendTabs from "./FriendTabs";
import Friend from "../components/Friend";
import AddFriendInvite from "../components/AddFriendInvite"
import {useState} from "react";
import axios from "axios";
export default function FriendList({user}){
    const [friends, setFriends] = useState(null);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/users/friends/' + user?.id,
        withCredentials: true,
    };
    if (!friends)
    axios.request(config)
        .then((response) => {
            setFriends(response.data);
        })
        .catch((error) => {
            // console.log(error);
        });

    return (

        <div className="friends">
            <FriendTabs></FriendTabs>
            <div className="horizontal-separator"></div>
            <AddFriendInvite user={user}></AddFriendInvite>
            {friends ?
                friends.map((friend) => {return (<Friend key={'friend_id '+ friend.id} username={friend.username} status={0} />)}) :
                null
            }

        </div>
    );
}

//a checker : voir comment linker le state avec ce qu'on affiche