import "../../../css/friend.css"
import FriendTabs from "./FriendTabs";
import {useState} from "react";
import AddFriend from "./AddFriend";
import FriendList from "./FriendList";


export const states = ["En ligne","Tous","En attente","Bloqué","Ajouter"];

export default function Friends({user}){
    const [state, setState] = useState("En ligne");

    const handleClick = (text) => {
        setState(text);
    }

    return (

        <div className="friends">
            <FriendTabs key="friendtabs" states={states} handleClick={handleClick} state={state}></FriendTabs>
            <div className="horizontal-separator"></div>
            {state == states[states.length - 1] ? (<AddFriend></AddFriend>) : (<FriendList user={user} state={state}></FriendList>)}
        </div>
    );
}

//a checker : voir comment linker le state avec ce qu'on affiche