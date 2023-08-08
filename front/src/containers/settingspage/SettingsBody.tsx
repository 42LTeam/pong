import "../../css/chat.css";
import "../../css/settings.css";
import { useState } from "react";
import React from "react";
import UserSettings from "./UserSettings";

export default function SettingsBody() {

    const [state] = useState(null);

    return (
        <div className="settingsbody bubble">
            <UserSettings state={state} ></UserSettings>
        </div>
    )
}