import React from "react";
import "../css/header.css"
import { Link } from "react-router-dom";

export default function HeaderNavigationIcon({handleClick,text, children, state}){
    return (
        <div onClick={() => {handleClick(text)}} className={'header-navigation-icon ' + (state == text ? 'header-navigation-icon-current' : '')}>
            {children}
            </div>
    );
}