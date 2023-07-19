import { useState } from "react";
import "../css/chat.css";
import TextInput from "./TextInput";
import React from "react";

export default function AddFriendBubble(){
    const [inviteText, setInviteText] = useState('');
    
    const sendInvite = () => {
        console.log(inviteText);

    };

    const handleInputChange = (event) => {
        setInviteText(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          sendInvite();
        }
    };
    
    return (
        
        <>
        <div className="ajouter-text"> Ajouter</div>
        <div className="ajouter-description"> Tu peux ajouter des amis grâce à leurs noms d'utilisateur. </div>
        <div className="add-friend-bubble">
            <TextInput
                text={"Trouve ami.e, tape nom..."}
                onChange={event => handleInputChange(event)}
                onKeyPress={(event) => handleKeyPress(event)}/>
            <button 
            onClick={() => sendInvite()}
            className="add-friend-button">
                Envoyer une demande d'ami.e
            </button>
        </div>
        </>

    )
}
