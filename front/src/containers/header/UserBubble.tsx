import React, {useState, useEffect, useRef, useContext} from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../Auth";

import "../../css/utils/user.css";

const UserBubble = () => {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const user = useContext(AuthContext);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    const navigate = useNavigate();

    const handleOptionClick = (option: string) => {
        if (option == "my_profile"){
          setMenuOpen(!menuOpen);
          navigate("profile/" + user?.id);
        }
        else if (option == "settings"){
          setMenuOpen(!menuOpen);
          navigate("/settings");
        }
    
      };

      const handleBubbleClick = (event) => {
        event.stopPropagation();
        toggleMenu();
      };

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
            setMenuOpen(false);
          }
        };
      
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);


    return (
        <div className="column">
            <div className="user bubble" onClick={handleBubbleClick}>
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
            <div ref={menuRef} className="bubble menu">
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