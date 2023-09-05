import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";

import "../../css/utils/user.css";
import "../../css/header.css";

const UserBubble = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

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
    } else if (option === "disconnect") {
      setMenuOpen(false);
      alert("TODO");
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="menu-column">
      <div className="user bubble" onClick={toggleMenu}>
        <div className="user-title">{user?.username}</div>
        {user?.avatar && (
          <div
            className="user-picture"
            style={{ backgroundImage: `url(${user.avatar})` }}
          />
        )}
        {menuOpen && (
          <div ref={menuRef} className="menu">
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
    </div>
  );
};

export default UserBubble;
