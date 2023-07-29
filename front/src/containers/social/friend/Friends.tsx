import "../../../css/friend.css"
import FriendTabs from "./FriendTabs";
import {useContext, useState} from "react";
import AddFriend from "./AddFriend";
import Friendlist from "./FriendList";
import {ApplicationContext} from "../../Auth";
import {getPath} from "../../../api";


const states = ["En ligne","Tous","En attente","Bloqué","Ajouter"];
const paths = ["/users/friend/online/","/users/friend/","/friend/friend-request/pending/","/block/blocked/"]

export default function Friends(){
    const [state, setState] = useState("En ligne");

    const handleClick = (text) => {
        setState(text);
        setFriends(null);
    }
    const user = useContext(ApplicationContext)

    const [friends, setFriends] = useState(null);

    if(!friends)
        getPath(paths[states.indexOf(state)] +user.id)
            .then(function (response) {
                setFriends(response.data);
            })


    const resetFriend = function (){
        setFriends(null);
    }

    return (

        <div className="friends">
            <FriendTabs key="friendtabs" states={states} handleClick={handleClick} state={state}></FriendTabs>
            <div className="horizontal-separator"></div>
            {state == states[states.length - 1] ? (<AddFriend ></AddFriend>) : (<Friendlist reset={resetFriend} friends={friends} pending={state == states[2]}></Friendlist>)}
        </div>
    );
}

//a checker : voir comment linker le state avec ce qu'on affiche