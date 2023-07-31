import React, {useState} from "react";
import { useNavigate} from "react-router-dom";

import "../css/user.css"


const UserBubble = ({ user }) => {
    
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    const navigate = useNavigate();

    function handleClick() {
        navigate("/profile");
    };

    const handleOptionClick = (option: string) => {
        if (option == "my_profile"){
          setMenuOpen(!menuOpen);
          navigate("profile");
        }
        else if (option == "settings"){
          setMenuOpen(!menuOpen);
          navigate("/settings");
        }
    
      };
    
    return (
        <div className="column">
            <div className="user bubble" onClick={toggleMenu}>
                <div className="user-title">{user?.username}</div>
                {user?.avatar && (
                    <div
                        className="user-picture"
                        style={{ backgroundImage: `url(${user.avatar})` }}
                    />
                )}
            </div>
            <div>
            {menuOpen && (
            <div className="bubble menu">
            <ul className="list">
                <li className="user user-title element" onClick={() => handleOptionClick("my_profile")}>
                    My profile
                </li>

                <li className="user user-title" onClick={() => handleOptionClick("settings")}>
                    Settings
                </li>
            </ul>
            </div>
            )}

            </div>
        </div>
    );
};

export default UserBubble;

//From Reno to Shai:
//J'ai fait des modifs sur les svg pour qu'on puisse modifier leur couleurs
//depuis le css mais du coup faudrait que chaque instance soit utilisée de la meme maniere.
//pour l'instant j'ai viré le chat-logo de la user bubble mais au pire on peut doubler le svg
//pour l'utiliser de plusieurs facons differentes.