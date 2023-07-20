import "../../../css/friend.css"
import FriendTabs from "./FriendTabs";
import Friend from "../../../components/chat/friend/Friend";
import {useState} from "react";
import axios from "axios";
import AddFriend from "./AddFriend";
import Friendlist from "./Friendlist";


const states = ["En ligne","Tous","En attente","Bloqué","Ajouter"];

export default function Friends({user}){
    const [friends, setFriends] = useState(null);
    const [state, setState] = useState("En ligne");

    const handleClick = (text) => {
        setState(text);
    }



    if (!friends && user) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/users/friend/' + user.id,
            withCredentials: true,
        };
        axios.request(config)
            .then((response) => {
                setFriends(response.data);
            })
    }
    return (

        <div className="friends">
            <FriendTabs key="friendtabs" states={states} handleClick={handleClick} state={state}></FriendTabs>
            <div className="horizontal-separator"></div>
            {friends ?
                friends.map((friend) => {return (<Friend key={'friend_id '+ friend.id} username={friend.username} status={0} />)}) :
                null
            }
            {state === states[states.length - 1] ? <AddFriend></AddFriend> : <Friendlist state={state}></Friendlist>}
        </div>
    );
}

//a checker : voir comment linker le state avec ce qu'on affiche