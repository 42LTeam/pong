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
    

    const handleChangeUsername = async () => {
        try {
            const response = await updateUserUsername(user.id, username);
            console.log(response.status)
            if (response.status === 200) {
                console.log("Username updated successfully.");
                setErrorMsg('')
                user.username = username;
            }
        } catch (error) {
            console.error("Failed to update username.");
            setErrorMsg('Failed to update username.');
            console.error(error.response.data);
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
                    <div className="input-container">
                        {errorMsg && <div className="error-message">{errorMsg}</div>}
                        <TextInput button={<ButtonSetting
                            handleClick={handleChangeUsername}
                            text='Change' state={undefined} clickable="true" />}
                            type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    {/* <ButtonSetting
                        handleClick={handleChangeUsername}
                        text='Change' state={undefined} clickable="true"/> */}
                </div>
            </div>
        </div>
    );
}


