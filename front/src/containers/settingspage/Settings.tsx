import React, { useContext, useRef, useState, useEffect } from "react";
import "../../css/settings.css";
import { AuthContext, useRerender } from "../Auth";
import {
  get2fa,
  updateUserAvatar,
  updateUserUsername,

} from "../../api";
import Button from "../../components/utils/Button";

type Props = {};

export default function Settings() {
  const user = useContext(AuthContext);
  const inputRef = useRef(null);
  const forceRerender = useRerender();

  const [qr, setQr] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [errorMsg, setErrorMsg] = useState("");
  const activate2fa = () => {
    get2fa().then((response) => {
      setQr(response.data);
    });
  };

  useEffect(() => {}, [username]);
  useEffect(() => {
    if (user.secretO2FA) activate2fa();
  }, []);

  const handleChangeImage = async (newAvatarUrl) => {
    const response = await updateUserAvatar(user.id, newAvatarUrl);
    if (response.status === 200) {
      console.log("User avatar updated successfully.");
      user.avatar = newAvatarUrl;
    } else {
      console.error("Failed to update user avatar.");
      setErrorMsg("Failed to update user avatar.");
    }
    forceRerender();
  };

  const handleEditClick = () => {
    const newAvatarUrl = prompt("Entrez l'URL de votre nouvel avatar:");
    if (newAvatarUrl) {
      setAvatarUrl(newAvatarUrl);
      handleChangeImage(newAvatarUrl);
    }
  };

  const handleChangeUsername = async (newUsername) => {
    try {
      const response = await updateUserUsername(user.id, newUsername);
      user.username = newUsername;
      setUsername(newUsername);
      setErrorMsg("");
    } catch (error) {
      const responseData = error.response ? error.response.data : null;
      if (responseData && responseData.message) {
        setUsername(responseData.message);
      } else {
        setErrorMsg("An unexpected error occurred.");
        console.error("Error updating user username:", error);
      }
    }
    forceRerender();
  };

  const handleEditUsername = () => {
    const newUsername = prompt("Entrez votre nouveau pseudo:");
    if (newUsername) {
      handleChangeUsername(newUsername);
    }
  };

  const test = () => {
    forceRerender();
  }

  return (
      <div className="main-frame">
        <div className="avatar-section">
          <div className="user-avatar">
            <div className="avatar-container">
              <div
                  className="avatar"
                  style={{ backgroundImage: `url(${avatarUrl})` }}
              ></div>
              <div className="avatar-overlay" onClick={handleEditClick}>
                Edit
              </div>
            </div>
          </div>
        </div>
        <div className="username-section">
          <div className="username-button">
            <div className="username-container">
              <div className="username-overlay" onClick={handleEditUsername}>
                Edit
              </div>
              <div
                  className="user-username"
                  style={{ fontSize: username === "Error" ? "smaller" : "inherit" }}
              >
                {username}
              </div>
            </div>
          </div>
        </div>
        {Boolean(qr) ?
            <img src={qr}/> :
            <Button handleClick={activate2fa} text={"activer la 2fa"} clickable></Button>
        }
      </div>
      
  );
}