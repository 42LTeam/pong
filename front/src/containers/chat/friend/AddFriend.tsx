import TextInput from "../../../components/chat/TextInput";
import React, {useState} from "react";
import axios from "axios";
import Friend from "../../../components/chat/friend/Friend";

export default function AddFriend(){
    const [suggestions, setSuggestions] = useState(null);
    const handleInputChange = (event) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/users/search/'+event.target.value,
            withCredentials: true,
        };
        if(event.target.value)
            axios(config).then((response) => {setSuggestions(response.data)});
        else setSuggestions(null);
    }

    return (
        <>
            <div className="ajouter-text"> Ajouter</div>
            <div className="ajouter-description"> Tu peux ajouter des amis grâce à leurs noms d'utilisateur. </div>
            <div className="add-friend-bubble">
                <TextInput
                    text={"Trouve ami.e, tape nom..."}
                    onChange={event => handleInputChange(event)}  onKeyPress={}/>
            </div>
            {suggestions?.map((current) => {return (<Friend username={current.username} status="on est la"/>)})}
        </>
    )
}