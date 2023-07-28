import React from "react";
import { useNavigate} from "react-router-dom";

import "../css/user.css"
//import ChatButton from "./ChatButton";


const UserBubble = ({ user }) => {
    
    const navigate = useNavigate();

    function handleClick() {
        navigate("/profile");
    };
    
    return (
        <div className="user bubble" onClick={handleClick}>
            <div className="user-title">{user?.username}</div>
            {/* <ChatButton /> */}
            {user?.avatar && (
                <div
                    className="user-picture"
                    style={{ backgroundImage: `url(${user.avatar})` }}
                />
            )}
        </div>
    );
};

export default UserBubble;

//From Reno to Shai:
//J'ai fait des modifs sur les svg pour qu'on puisse modifier leur couleurs
//depuis le css mais du coup faudrait que chaque instance soit utilisée de la meme maniere.
//pour l'instant j'ai viré le chat-logo de la user bubble mais au pire on peut doubler le svg
//pour l'utiliser de plusieurs facons differentes.