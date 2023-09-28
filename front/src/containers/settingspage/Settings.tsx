import React, { useContext, useRef, useState, useEffect } from "react";
import "../../css/settings.css";
import { AuthContext, useRerender } from "../Auth";
import {
  get2fa,
  uploadUserAvatar,
  updateUserUsername,
  remove2fa,

} from "../../api";
import Button from "../../components/utils/Button";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Settings(props: Props) {
  const user = useContext(AuthContext);
  const inputRef = useRef(null);
  const forceRerender = useRerender();
  const navigate = useNavigate();

  const [qr, setQr] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [errorMsg, setErrorMsg] = useState("");

  const activate2fa = () => {
    get2fa().then((response) => {
      setQr(response.data);
    });
  };

  const deactivate2fa = () => {
    remove2fa().then((response) => {
      setQr(null);
    });
  };



  useEffect(() => { }, [username]);
  useEffect(() => {
    if (user.secretO2FA) activate2fa();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadUserAvatar(user.id, file);
        if (response.status === 201) {
          setAvatarUrl(response.data.path);
        } else {
          console.error(
            "Failed to update user avatar. Response status:",
            response.status,
          );
          console.error("Response data:", response.data);
          setErrorMsg("Failed to update user avatar.");
        }
      } catch (error) {
        console.error("An error occurred during avatar upload:", error);
        setErrorMsg("An unexpected error occurred.");
      }
    }
    forceRerender();
  };

  const handleEditClick = () => {
    inputRef.current.click();
  };

  const handleChangeUsername = async (newUsername) => {
    try {
      const response = await updateUserUsername(user.id, newUsername);
      if (response.status === 200) {

        setUsername(newUsername);
      } else {
        console.error("Failed to update user username.");
        setErrorMsg("Error updating username.");
      }
    } catch (error) {
      console.error("Error updating user username:", error);
      setUsername("Username already taken");
    }
    forceRerender();

  };

  const handleEditUsername = () => {
    const newUsername = prompt("Please enter the new username:");
    if (newUsername && newUsername !== user.username) {
      handleChangeUsername(newUsername);
    }
  };

  return (
    <div className="main-frame">
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
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
      {Boolean(qr) ? (
        <div>
          <img src={qr} />
          <Button handleClick={deactivate2fa} text={"deactivate 2fa"} clickable></Button>
        </div>
      ) : (
        <Button handleClick={activate2fa} text={"activer la 2fa"} clickable></Button>
      )}
    </div>
  );
}