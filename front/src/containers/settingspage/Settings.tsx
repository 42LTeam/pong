import React, { useContext, useState, useEffect } from "react";
import "../../css/settings.css";
import { AuthContext } from "../Auth";
import { updateUserAvatar, updateUserUsername } from "../../api";
import ButtonSetting from "../../components/utils/Button";
import TextInput from "../../components/utils/TextInput";

type Props = {

}

export default function Settings(props: Props) {
    const user = useContext(AuthContext);

    const [username, setUsername] = useState(user.username);
    const [avatarUrl, setAvatarUrl] = useState(user.avatar);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
    }, [username]);

    const handleChangeImage = async (newAvatarUrl) => {
        const response = await updateUserAvatar(user.id, newAvatarUrl);
        if (response.status === 200) {
            console.log("User avatar updated successfully.");
            user.avatar = newAvatarUrl;
        } else {
            console.error("Failed to update user avatar.");
            setErrorMsg('Failed to update user avatar.');
        }
    };

    const handleEditClick = () => {
        const newAvatarUrl = prompt("Please enter the new avatar URL:");
        if (newAvatarUrl) {
            setAvatarUrl(newAvatarUrl);
            handleChangeImage(newAvatarUrl);
        }
    };


    const handleChangeUsername = async (newUsername) => {
        const response = await updateUserAvatar(user.id, newUsername);
        if (response.status === 200) {
            console.log("User avatar updated successfully.");
            user.username = newUsername;
        } else {
            console.error("Failed to update user avatar.");
            setErrorMsg('Failed to update user avatar.');
        }
    };


    const handleEditUsername = () => {
        console.log("handleEditUsername called");
        const newUsername = prompt("Please enter the new username:");
        if (newUsername) {
            setUsername(newUsername);
            handleChangeUsername(newUsername);
        }
    };

    return (
        <div className='main-frame'>
            <div className="avatar-section">
                <div className="user-avatar">
                    <div className="avatar-container">
                        <div className="avatar" style={{ backgroundImage: `url(${avatarUrl})` }}></div>
                        <div className="avatar-overlay" onClick={handleEditClick}>Edit</div>
                    </div>
                </div>
            </div>
            <div className="username-section">
                <div className="username-button">
                    <div className="username-container">
                        <div className="username-overlay" onClick={handleEditUsername}>Edit</div>
                        <div className="user-username">{username}</div>
                    </div>
                    {errorMsg && <div className="error-message">{errorMsg}</div>}
                </div>
            </div>
        </div>
    );
}


