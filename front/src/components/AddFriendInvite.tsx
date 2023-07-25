import { useState } from "react";
import "../css/chat.css";
import TextInput from "./TextInput";
import React from "react";
import axios from "axios";

export default function AddFriendBubble(){

    const [inviteText, setInviteText] = useState('');
    const [allusers, setAllUsers] = useState('');

    const getAllUsers = () => {
        console.log(inviteText);
        let allusers = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/users/',
            withCredentials: true,
        };
        if (!allusers)
            axios.request(allusers)
                .then((response) => {
                    setAllUsers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        return allusers;
    };

    const findUserIdByUsername = async (username) => {
        const allusers = getAllUsers()
        if (!allusers || !Array.isArray(allusers)) {
            return null;
        }
        const user = allusers.find((user) => user.username === username);
        return user ? user.id : null;
    }

    const sendFriendRequest = (initiatorId, acceptorId) => {
        const requestData = {
            initiatorId: initiatorId,
            acceptorId: acceptorId,
        };
        axios
            .post('http://localhost:3000/friend/friend-requests', requestData, {
                withCredentials: true,
            })
            .then((response) => {
                console.log('Friend request sent!');
            })
            .catch((error) => {
                // Handle errors, if any
                console.error('Error sending friend request:', error);
            });

    };


    const handleSendFriendRequest = () => {
        // Replace myUser with the ID of the current user (the one sending the request)
        const myUser = user.id;

        // Replace userId with the ID of the user you want to send the request to
        const userId = findUserIdByUsername(inviteText);

        if (userId) {
            sendFriendRequest(myUser, userId);
        } else {
            console.log('User not found or invalid input.');
        }
    };

    const handleInputChange = (event) => {
        setInviteText(event.target.value);
    };

    return (
        
        <>
        <div className="ajouter-text"> Ajouter</div>
        <div className="ajouter-description"> Tu peux ajouter des amis grâce à leurs noms d'utilisateur. </div>
        <div className="add-friend-bubble">
            <TextInput
                text={"Trouve ami.e, tape nom..."}
                cssClass={'text-input'}
                onChange={event => handleInputChange(event)} />
            <button onClick={() => handleSendFriendRequest()} className="add-friend-button">
                Envoyer une demande d'ami.e</button>
        </div>
        </>

    )
}
