import React, { useContext } from "react";
import "../../css/settings.css";
import { ApplicationContext } from "../../containers/Auth";
import { updateUserAvatar } from "../../api";
import ButtonSetting from "../../components/utils/Button";

type Props = {

}

export default function Setting(props: Props) {
    const user = useContext(ApplicationContext);

    const handleChangeImage = async () => {
        const newImageUrl = window.prompt('Enter the URL of your new avatar');
        if (newImageUrl) {
            const response = await updateUserAvatar(user.id, newImageUrl);
            if (response.status === 200) {
                console.log("User avatar updated successfully.");
                user.avatar = newImageUrl;
            } else {
                console.error("Failed to update user avatar.");
            }
        }
    };

    return (
        <div className="container">
            <div className="user-avatar">
                <div className="avatar" style={{ backgroundImage: `url(${user?.avatar})` }}></div>
                <ButtonSetting
                    handleClick={handleChangeImage}
                    text='Change' state={undefined} />
            </div>
        </div>
    );
}
