import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";

import "../../css/utils/user.css";
import { deco } from "../../api";
import Avatar from "../../components/utils/Avatar";

const UserBubble = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userBubbleRef = useRef(null);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [width, setWidth] = useState();

  const getPosition = () => {
  const x = userBubbleRef.current?.offsetLeft;
  setX(x);
  const y = userBubbleRef.current?.offsetTop + 50;
  setY(y);
  const width = userBubbleRef.current?.getBoundingClientRect().width;
  setWidth(width);
  }

  const user = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    getPosition();
  };

  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    if (option == "my_profile") {
      setMenuOpen(!menuOpen);
      navigate("profile/" + user?.id);
    } else if (option == "settings") {
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
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", getPosition);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", getPosition);
    };
  }, []);

  return (
    <div className="column">
      <div className="user bubble user-bubble" onClick={handleBubbleClick} ref={userBubbleRef}>
        <div className="user-title">{user?.username}</div>
        <Avatar url={user?.avatar}/>
      </div>
      <div>
        {menuOpen && (
          <div ref={menuRef}
          className="bubble menu"
          style={
            {left: x,
            top: y,
            width: width}
          }>
            <ul className="list">
              <li
                className="user user-title element"
                onClick={() => handleOptionClick("my_profile")}
              >
                Mon profile
              </li>

              <li
                className="user user-title"
                onClick={() => handleOptionClick("settings")}
              >
                Réglages
              </li>

              <li
                className="user user-title"
                onClick={() => {
                  deco().then(() => {
                    window.location.reload();
                  });
                }}
              >
                Déconnexion
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBubble;
