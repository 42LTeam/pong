import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";

import "../../css/utils/user.css";
import "../../css/header.css";

const UserBubble = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOptionClick = (option: string) => {
    if (option === "my_profile") {
      setMenuOpen(false);
      navigate("profile/" + user?.id);
    } else if (option === "settings") {
      setMenuOpen(false);
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
      {menuOpen && (
        <div className="bubble menu">
          <ul className="list">
            <li
              className="user user-title element"
              onClick={() => handleOptionClick("my_profile")}
            >
              My profile
            </li>

            <li
              className="user user-title"
              onClick={() => handleOptionClick("settings")}
            >
              Settings
            </li>

            <li
              className="user user-title"
              onClick={() => handleOptionClick("disconnect")}
            >
              Disconnect
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserBubble;
