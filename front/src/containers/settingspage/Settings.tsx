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
import PopUp from "../../components/utils/PopUp";
import PopOver from "../../components/utils/PopOver";

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
  const [showErrorPopUp, setShowErrorPopUp] = useState(false);

  const activate2fa = () => {
    get2fa().then((response) => {
      setQr(response.data);
    });
    forceRerender();
  };

  const deactivate2fa = () => {
    remove2fa().then((response) => {
      setQr(null);
    });
    forceRerender();
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
          setErrorMsg("");
        } else {
          setErrorMsg("Your image file is not valid");
          setShowErrorPopUp(true);
          setTimeout(() => {
            setShowErrorPopUp(false);
          }, 5000);
        }
      } catch (error) {
        setErrorMsg("Your image file is not valid");
        setShowErrorPopUp(true);
        setTimeout(() => {
          setShowErrorPopUp(false);
        }, 5000);
      }
    }
    forceRerender();
  };


  const handleEditClick = () => {
    inputRef.current.click();
  };

  const handleChangeUsername = async (newUsername) => {
    try {
      console.log("Attempting to update username...");

      const response = await updateUserUsername(user.id, newUsername);


      if (response && response.status === 200) {
        console.log("Successfully updated username.");
        setUsername(newUsername);
      }
    } catch (error) {
      setErrorMsg("Error updating username.");
      setUsername(error.response.data.message);
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
          {showErrorPopUp &&
            <PopUp
              clear={() => setShowErrorPopUp(false)}
              height="20px"
              position={{ left: 50, top: 100 }} >
              <p style={{ color: 'red' }}>{errorMsg}</p>
            </PopUp>

          }
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