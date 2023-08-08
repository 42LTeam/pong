// import "../../css/chat.css"
import Setting from "../../components/setting/Setting";
import {useContext, useState} from "react";
import {ApplicationContext} from "../Auth";
import {getFriendOfUser} from "../../api";
import React from "react";

export default function UserSettings({ state }){
    const [settings, setSettings] = useState(null);
    const user = useContext(ApplicationContext)

    if (!settings && user) {
        getFriendOfUser(user.id)
            .then((response) => {
                setSettings(response.data);
            })
    }


    return (
        // <div className="">
                <Setting/>

        // </div>
    )
}