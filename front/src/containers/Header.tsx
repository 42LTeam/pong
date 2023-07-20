import "../css/header.css"
import UserBubble from "../components/UserBubble";
import NavigationBubble from "./NavigationBubble";
import { Outlet } from 'react-router-dom';
import React from "react";
// @ts-ignore

const Header = function({user}) {
    return (
        <div className="header">
            <div className="header-title">Transendance</div>
            <NavigationBubble></NavigationBubble>
            <UserBubble user={user}></UserBubble>
        </div>
    )
}



export default Header;