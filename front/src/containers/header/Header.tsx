import "../../css/header.css"
import UserBubble from "./UserBubble";
import {useLocation} from "react-router-dom";
import Chat from "../../components/svg/Chat";
import Play from "../../components/svg/Play";
import Settings from "../../components/svg/Settings";
import React from "react";

// @ts-ignore

const Header = function() {
    return (
        <div className="header">
            <div className="header-title">Transendance</div>
            <div className="bubble header-tabs">
                <Chat url="/social" color="#7F8C8D"></Chat>
                <Play url="/" color="#7F8C8D"></Play>
                <Settings url="/settings" color="#7F8C8D"></Settings>
            </div>
            <UserBubble></UserBubble>

        </div>
    )
}



export default Header;