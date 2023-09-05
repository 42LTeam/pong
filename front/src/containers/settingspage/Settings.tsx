import  { useContext, useState, useEffect } from "react";
import "../../css/settings.css";
import { AuthContext } from "../Auth";
import {get2fa, updateUserAvatar, updateUserUsername} from "../../api";
import Button from "../../components/utils/Button";

export default function Settings() {
    const user = useContext(AuthContext);

    const [qr, setQr] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [avatarUrl, setAvatarUrl] = useState(user.avatar);
    const [errorMsg, setErrorMsg] = useState('');

    const activate2fa = () => {
        get2fa().then((response) => {
            setQr(response.data);
        })
    }

    useEffect(() => {
        if (user.secretO2FA)
            activate2fa()
    }, []);

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
        try {
            const response = await updateUserUsername(user.id, newUsername);
            if (response.status === 200) {
                console.log("User username updated successfully.");
                user.username = newUsername;
                setErrorMsg('');
            } else {
                console.error("Failed to update user username.");
                setErrorMsg('Error');
            }
        } catch (error) {
            console.error("Errorrrr updating user username:", error);
            setUsername("Username already taken");
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
                    <div className="user-username" style={{ fontSize: username === 'Error' ? 'smaller' : 'inherit' }}>
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


