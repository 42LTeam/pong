import TextInput from "../../../components/chat/TextInput";
import {useState} from "react";
import axios from "axios";
import Friend from "../../../components/chat/friend/Friend";

export default function AddFriend(){
    const [suggestions, setSuggestions] = useState(null);
    const [friend, setFriend] = useState(null);
    const handleInputChange = (event) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/users/search/'+event.target.value,
            withCredentials: true,
        };
        if(event.target.value && !friend) {
            axios(config).then((response) => {
                setSuggestions(response.data);
                if (suggestions.length == 1 && event.target.value == response.data[0].username)
                    setFriend(response.data[0]);
                else
                    setFriend(null);
            });
        }else {
            setSuggestions(null);
            setFriend(null);
        }
    }

    const handleSuggestionClick = (friend) => {
        setFriend(friend)
    }

    return (
        <>
            <div className="ajouter-text"> Ajouter</div>
            <div className="ajouter-description"> Tu peux ajouter des amis grâce à leurs noms d utilisateur. </div>
            <TextInput
                text={"Trouve ami.e, tape nom..."}
                onChange={event => handleInputChange(event)}
                buttonProps={null}
                buttonContent="Envoyer une demande d’ami"
                friend={friend}
            />
            {suggestions?.map((current) => {return (<Friend onClick={handleSuggestionClick} key={current.username + "suggestion-key"} friend={current}/>)})}
        </>
    )
}