import TextInput from "../../../components/utils/TextInput";
import {useState} from "react";
import Friend from "../../../components/friend/Friend";
import {searchUser, sendFriendRequest} from "../../../api";
import Button from "../../../components/utils/Button";

export default function AddFriend(){
    const [suggestions, setSuggestions] = useState([]);
    const [friend, setFriend] = useState(null);
    const handleInputChange = (event) => {
        if(event.target.value) {
            setFriend(null);
            searchUser(event.target.value).then((response) => {
                setSuggestions(response.data);
                if (response.data.length == 1 && event.target.value == response.data[0].username) {
                    setFriend(response.data[0]);
                }
            });
        }else
            setSuggestions(null);

    }

    const handleSuggestionClick = (friend) => {
        setFriend(friend)
    }

    const onButtonClick = () => {
        if (!friend) return ;
        sendFriendRequest(friend.id).then(null);
        setFriend(null);
    }

    return (
        <>
            <h1> Ajouter</h1>
            <h3> Tu peux ajouter des amis grâce à leurs noms d utilisateur. </h3>
            <TextInput
                text={"Trouve ami.e, tape nom..."}
                onChange={(event) => handleInputChange(event)}
                button={
                    <Button handleClick={onButtonClick} text={"Envoyer une demande d’ami"} clickable={friend?.username || null}>

                    </Button>
                }
            />
            {suggestions?.map((current) => {return (<Friend onClick={handleSuggestionClick} key={current.username + "suggestion-key"} friend={current}></Friend>)})}
        </>
    )
}